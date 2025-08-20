import { NextResponse } from "next/server";

async function GET(){
    return NextResponse.json("hello from get")
}
async function POST({params,searchParams}){
    return NextResponse.json({params,searchParams})
}