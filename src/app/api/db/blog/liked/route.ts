import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async()=>{
    const liked = await prisma.post.findMany({
        where:{
            likes:{
                some:{}
            }
        }
    });
    return NextResponse.json(liked);
}

export const POST = async (req: Request) => {
    const { id } = await req.json();
    const liked = await prisma.like.create({
        data:{
            postId:id,
        }
    })
    return NextResponse.json(liked);
}
export const DELETE = async(req:Request)=>{
    const {id} = await req.json();
    const liked = await prisma.like.delete({
        where:{
            postId:id,
        }
    })
    return NextResponse.json(liked);
}