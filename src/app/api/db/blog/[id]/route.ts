import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"

export const GET =async(req:Request,{ params }: { params: Promise<{ id: string }> })=>{
    const {id} = await params;
    const res = await prisma.post.findUnique({
        where:{
            id:Number(id),
        }
    })||[];
    if(!res) return NextResponse.json({error:"value is Missing"}, { status: 400 });
    return NextResponse.json(res);
}

export const PUT = async(req:Request,{ params }: { params: Promise<{ id: string }> })=>{
    const {id} = await params;
    const {content} = await req.json();
    const updatePost = await prisma.post.update({
        where:{
            id:Number(id),
        },
        data:{
            content:content,
        }
    })
    return NextResponse.json(updatePost);
}