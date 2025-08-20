import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function GET() {
    try {
        let users = await prisma.user.findMany({
            include: {
                videos: true,
                viewedVideos: true,
                subscribers: {
                    include: {
                        subscriber: true // This gets the User who is the subscriber
                    }
                },
                subscribedTo: {
                    include: {
                        subscribedTo: true // This gets the User who is being subscribed to
                    }
                }
            }
        });
        return Response.json({
            users
        }, { status: 200 })
    }
    catch (e) {
        return Response.json({
            error: e.message
        }, { status: 500 })
    }
}