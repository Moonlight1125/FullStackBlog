import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"

export const POST = async (req:Request)=>{
    const {title,img,content} = await req.json();
    if(!req)return NextResponse.json({error:"value is Missing"}, { status: 400 });
    const article = await prisma.post.create({
        data:{
            title:title,
            img:img,
            content:content,
        }
    })
    return NextResponse.json({article});
}

export const GET =async()=>{
    const res = await prisma.post.findMany()||[];
    if(!res) return NextResponse.json({error:"value is Missing"}, { status: 400 });
    return NextResponse.json(res);
}
