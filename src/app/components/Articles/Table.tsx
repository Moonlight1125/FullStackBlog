'use client'

import { blogType } from "../../lib/types/type";
import ArticleItem from "./Articles";

interface blogData{
  blog:blogType[]
}

const Table =({blog}:blogData) => {

  return (
    <div className="mx-auto w-[90%] pt-32 overflow-y-auto overflow-x-hidden flex justify-center">
      {blog?.map(elm=>{
        const {id,title,img}=elm;
        return(
          <ArticleItem key={id} id={id} title={title} img={img}/>
        )
      })}
    </div>
  )
}

export default Table