import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Example response - replace this with your actual data fetching logic
        const data = {
            movies: [
                { id: 1, title: 'Movie 1' },
                { id: 2, title: 'Movie 2' }
            ]
        }
        
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch movies' },
            { status: 500 }
        )
    }
} 

export async function POST(req){
    const body =await req.json()
    console.log(req.url)
    let url=new URL(req.url)
    console.log(url.searchParams.get("name"))
    console.log(body)
    return NextResponse.json({value:"message"})
}