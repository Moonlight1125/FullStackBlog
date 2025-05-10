'use client'

import { commentType } from '@/app/lib/types/type'
import React, { useEffect, useState } from 'react'

interface postId {
  postId:string
  existingComment?:commentType[]
}
interface table{
  id:number,
  content:string,
  cretedAt:Date,
  postId:number,
}

const Comment:React.FC<postId> = ({postId,existingComment}) => {
  const [comment,setComment] = useState<string>();
  const [table,setTable] = useState<table[]>(existingComment || []);

  const postComment = async ()=>{
    const copy = [...table];
    try{
      const res = await fetch('http://localhost:3000/api/db/blog/comment',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          content:comment,
          postId:Number(postId),
        })
      })
      const data= await res.json();
      const copy = [...table,data];
      setTable(copy);
    }catch(e){
      console.error("error",e)
    }
  }
  const deleteComment = async(id:number)=>{
    const recreateTable = table.filter((table)=> id!==table.id);
    setTable(recreateTable);
    console.log(recreateTable)
    try{
      const res = await fetch('http://localhost:3000/api/db/blog/comment',{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          id:id,
        })
      })
      const data = await res.json();
    }catch(e){
      console.error("error",e)
    }
  }
  return (
    <div className='w-full mb-7'>
      <aside className='mx-auto w-2/5 min-h-[100px] mb-6'>
      {table.map(elm=>{
        return(
          <div key={elm.id} className='bg-white mb-4 w-[80%] min-h-[50px] mx-auto rounded-md py-2 px-2 relative'>
            {elm.content}
            <div className='absolute right-1 bottom-1'>
              <button onClick={()=>deleteComment(elm.id)} className='bg-red-400 w-[60px] rounded-sm'>削除</button>
            </div>
          </div>
        )
      })}
      </aside>
      <footer className=" w-[70%] md:w-[40%] borde border-green-600 h-[100px] mx-auto bg-white" >
        <textarea placeholder='コメントを投稿する' value={comment} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)} className=" block mb-3 w-full h-full resize-none" />
        <div className='w-[100px] h-[40px] mx-auto'>
          <button onClick={postComment} className='w-full h-full bg-black text-white hover:scale-105 duration-200'>投稿</button>
        </div>
      </footer>
    </div>
  )
}

export default Comment