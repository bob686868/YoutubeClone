import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
            // ,
            // include: {
            //     viewedVideos: true
            // }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// export async function POST(request,{params}){
//     let userId=await params.id
//     let body=await request.json()
//     let otherId=body.id
//     let previousUser=prisma.user.findFirst({id:userId})
//     let user=prisma.user.update({
//         id:userId
//     },
//       data:{

//       }    
// )

    
// }