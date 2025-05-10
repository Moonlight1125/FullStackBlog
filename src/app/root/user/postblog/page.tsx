'use client'

import React, { CSSProperties, useRef, useState } from 'react'
import PuffLoader from "react-spinners/PuffLoader";
import Preview from '@/app/components/Markdown/Preview';
import MarkdownEditor from '@/app/components/Markdown/MarkdownEditor';

const page = () => {
  const [title, setTilte] = useState<string>("");
  const [img, setImg] = useState<string>("/sample.jpg");
  const [active, setActive] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);
  const [openParet, setOpenParet] = useState<boolean>(false);
  const fileElement = useRef<HTMLInputElement>(null);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImg(url);
    }
    reader.readAsDataURL(file);
  }
  const handleInput = () => {
    fileElement.current?.click();
  }
  const activePreview = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);
    let timeout;
    timeout = setTimeout(() => {
      setActive(false);
      setPreview(true);
    }, 2000)
    return () => clearTimeout(timeout);
  }
  const reset = () => {
    setActive(false);
    setPreview(false);
    setOpenParet(false);
    setTilte("");
    setImg("/beautifulNight.jpg")
  }
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <div className='w-full min-h-screen bg-blue-100 pt-40 pb-9'>
      <div className='text-center mb-3'><h1>ブログのサムネイルを作成</h1></div>
      <form onSubmit={activePreview} className='w-full text-center mb-11'>
        <input disabled={preview} required value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTilte(e.target.value) }} type="text" placeholder='タイトルを入力' className='mb-4 outline-none w-[80%] h-[50px] rounded-md text-xl bg-amber-50' />
        <input ref={fileElement} hidden type="file" accept='/imgae/*' onChange={handleImg} />
        <button type='button' onClick={handleInput} className='outline-none w-[80%] h-[50px] rounded-md text-xl bg-blue-400 text-white hover:shadow-lg shadow-blue-800 duration-150 mb-6'>サムネイル画像</button>

        <div className='w-full flex justify-center'>
          <dl>
            <dt>アップロードした画像</dt>
            <dd> <img src={img} alt="image" className='mx-auto h-32 w-32 rounded-full' /></dd>
          </dl>
        </div>
        {!preview &&
          <input disabled={active} value="決定" type='submit' className='w-[150px] h-[50px] rounded-md bg-black text-white mt-5 hover:scale-105 duration-150' />
        }
      </form>
      <div className='w-full text-center'>
        <h1 className='mb-5'>
          {!active ? "サムネイルのプレビュー" : "ロード中です"}
        </h1>
        {active &&
          <PuffLoader
            color={"#3dc369"}
            loading={true}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
        {preview &&
          <div className='flex justify-center items-center flex-col'>
            <Preview title={title} img={img} />
            <div className='mt-5'>
              <div className='flex'>
                <button onClick={reset} className='mx-2 w-[150px] h-[50px] rounded-md bg-black text-white mt-5 hover:scale-105 duration-150'>やり直す</button>
                <button onClick={() => setOpenParet(true)} className='mx-2 w-[150px] h-[50px] rounded-md bg-green-400 text-white mt-5 hover:scale-105 duration-150'>
                  記事を書く
                </button>
              </div>
            </div>
          </div>
        }
      </div>
      {openParet && <MarkdownEditor title={title} img={img} />}
    </div>
  )
}

export default page