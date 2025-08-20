import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
    try {
        console.log("entered post method")
        const body = await req.json()
        
        // Validate required fields
        if (!body.channelName || !body.profilePhoto) {
            return Response.json(
                { error: "Channel name and profile photo are required" },
                { status: 400 }
            )
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                channelName: body.channelName,
                profilePhoto:body.profilePhoto
                // Add other fields as needed
            }
        })

        return Response.json(
            { 
                message: "User created successfully", 
                user: newUser 
            },
            { status: 201 }
        )

    } catch (error) {
        console.error('Error creating user:', error)
        
        // Handle unique constraint violations
        if (error.code === 'P2002') {
            return Response.json(
                { error: "A user with this channel name already exists" },
                { status: 409 }
            )
        }

        return Response.json(
            { error: "Failed to create user" },
            { status: 500 }
        )
    }
}