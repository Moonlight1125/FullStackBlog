'use client'
import dynamic from "next/dynamic";

//markdown 参考
//https://zenn.dev/milky/articles/markdown-content

const ReactSimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import Swal from 'sweetalert2'
import { useRouter} from "next/navigation";
import { blogType } from "@/app/lib/types/type";

interface reference {
    id:number
    content:string
}

const MarkdownEditorForEdit =({content,id}:reference) => {

  const [markdownValue, setMarkdownValue] = useState("");
  const router = useRouter();

  const getBlogData = async()=>{
    const savedContent = localStorage.getItem('smde_edit_content')??''
    if(savedContent.trim()!==''){
      setMarkdownValue(savedContent);
      return null;
    }
    setMarkdownValue(content);
  }

  useEffect(()=>{
    getBlogData();
  },[])

  const options = useMemo(()=>{
    return{
      autofocus:true,
      spellChecker:false,
      autosave:{
        enabled:true,
        uniqueId:'edit_content',
        delay:1000,
      },
    }
  },[])

  const onChange = (value: string) => {
    setMarkdownValue(value);
  };

  const saveToPrimsa = async()=>{
    if(!markdownValue){
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "記事を入力してください!",
      });
    }
    try{
      const req = await fetch(`http://localhost:3000/api/db/blog/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          content:markdownValue,
        })
      })
      const ret = await req.json();
      console.log(ret);
      router.push('/')
    }catch(e){
      console.error("error",e);
    }
  }
  return (
    <div className="pt-16">
      <ReactSimpleMdeEditor
        value={markdownValue}
        onChange={onChange}
        options={options}
      />
      <div>
        <div className="w-full flex space-x-5 h-8 items-center">
          <h1 className="font-bold">プレビュー</h1>
          <button onClick={saveToPrimsa} className="h-full w-[100px] bg-blue-300 rounded-sm hover:scale-110 transition-all">変更を確定</button>
          <button onClick={()=>setMarkdownValue("")} className="h-full w-[110px] bg-blue-300 rounded-sm hover:scale-110 transition-all">記事をクリア</button>
        </div>
        <div className="markdown-body mt-3 border border-green-400 w-full h-[200px] overflow-y-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>{markdownValue}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditorForEdit;