'use client'
import dynamic from "next/dynamic";
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
import { useRouter } from "next/navigation";

interface props{
  title:String
  img:String
}

const MarkdownEditor:React.FC<props>=({title,img}) => {
  const [markdownValue, setMarkdownValue] = useState("");
  const router = useRouter();

  useEffect(()=>{
    const content = localStorage.getItem('smde_saved_content')??''
    console.log(content);
    setMarkdownValue(content);
  },[])

  const options = useMemo(()=>{
    return{
      autofocus:true,
      spellChecker:false,
      autosave:{
        enabled:true,
        uniqueId:'saved_content',
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
      const req = await fetch("/api/db/blog",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          title:title,
          img:img,
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
    <div className="pt-10">
      <ReactSimpleMdeEditor
        value={markdownValue}
        onChange={onChange}
        options={options}
      />
      <div>
        <div className="w-full flex space-x-5 h-8 items-center">
          <h1 className="font-bold">プレビュー</h1>
          <button onClick={saveToPrimsa} className="h-full w-[100px] bg-blue-300 rounded-sm hover:scale-110 transition-all">投稿</button>
          <button onClick={()=>setMarkdownValue("")} className="h-full w-[110px] bg-blue-300 rounded-sm hover:scale-110 transition-all">記事をクリア</button>
        </div>
        <div className="markdown-body mt-3 border border-green-400 w-full h-[200px] overflow-y-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>{markdownValue}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor