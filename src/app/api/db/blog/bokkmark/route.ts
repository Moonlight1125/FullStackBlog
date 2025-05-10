import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { id } = await req.json();
    const bookmark = await prisma.bookmark.create({
        data:{
            postId:id,
        }
    })
    return NextResponse.json(bookmark);
}
export const DELETE = async(req:Request)=>{
    const {id} = await req.json();
    const bookmark = await prisma.bookmark.delete({
        where:{
            postId:id,
        }
    })
    return NextResponse.json(bookmark);
}