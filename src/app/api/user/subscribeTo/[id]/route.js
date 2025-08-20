import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request, { params }) {
    try {
        const { id } = params
        const body = await request.json()
        
        // Validate that we have a subscriber ID in the request body
        if (!body.subscriberId) {
            return NextResponse.json(
                { error: "Subscriber ID is required 132" },
                { status: 400 }
            )
        }

        // Check if both users exist
        const [subscriber, subscribedTo] = await Promise.all([
            prisma.user.findUnique({
                where: { id: parseInt(body.subscriberId) }
            }),
            prisma.user.findUnique({
                where: { id: parseInt(id) }
            })
        ])

        if (!subscriber || !subscribedTo) {
            return NextResponse.json(
                { error: "One or both users not found" },
                { status: 404 }
            )
        }

        // Check if subscription already exists
        const existingSubscription = await prisma.subscriber.findUnique({
            where: {
                subscriberId_subscribedToId: {
                    subscriberId: parseInt(body.subscriberId),
                    subscribedToId: parseInt(id)
                }
            }
        })

        if (existingSubscription) {
            return NextResponse.json(
                { error: "Subscription already exists" },
                { status: 409 }
            )
        }

        // Create the subscription
        const subscription = await prisma.subscriber.create({
            data: {
                subscriberId: parseInt(body.subscriberId),
                subscribedToId: parseInt(id)
            }
        })

        return NextResponse.json({
            message: "Subscription created successfully",
            subscription
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating subscription:', error)
        return NextResponse.json(
            { error: "Failed to create subscription" },
            { status: 500 }
        )
    }
} 