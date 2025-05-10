import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server";

export const GET = async()=>{
    const req = await prisma.comment.findMany();
    return NextResponse.json(req);
}

export const POST = async(req:Request)=>{
    const {content,postId} = await req.json();
    const res = await prisma.comment.create({
        data:{
            content:content,
            postId:postId,
        }
    })  
    return NextResponse.json(res);  
}

export const DELETE = async(req:Request)=>{
    const {id} = await req.json();
    const res = await prisma.comment.delete({
        where:{
            id:id,
        }
    })
    return NextResponse.json(res);
}
