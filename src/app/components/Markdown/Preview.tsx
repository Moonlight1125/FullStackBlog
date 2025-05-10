import React from 'react'

interface props{
  title:string
  img:string
}

const Preview:React.FC<props> = ({title,img}) => {

  return (
    <div className="w-2/5 h-[150px] rounded-sm flex items-center bg-slate-300 shadow-articleShadow pl-5">
      <div className="h-full flex items-center">
        <img
          src={img}
          className='w-[100px] h-[100px] rounded-[20%]'
          alt="犬"
        />
      </div>
      <article className="ml-4 h-[70%]  ">
        <div className="font-bold">{title}</div>
        <p className="opacity-50"></p>
      </article>
    </div>
  )
}

export default Preview