'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

interface data{
  username:String,
  password:String,
}
const page = () => {
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<data>();

  const login = async (data:data)=>{
    const username = data.username;
    const password = data.password;
    try{
      const res = await signIn('credentials',{
        username,
        password,
      })
      console.log(res)
    }catch(e){
      console.error(e,"ログインエラー")
    }
  }
  return (
    <div className='pt-40 flex justify-center '>
      <form onSubmit={handleSubmit(login)} className='w-[300px] h-[240px] bg-blue-400 rounded-md'>
        <h1 className='text-center mb-3 pt-2'>Login</h1>
        <div className='w-4/5 mx-auto mb-4'>
          <label className='' htmlFor="username">
            username
          </label>
          <div>
            <input className='rounded-md w-full' id='username' type="text" placeholder='username' {...register('username',{required:'必須です'})} required/>
          </div>
        </div>
        <div className='w-4/5 mx-auto mb-4'>
          <label htmlFor="password">
            password
          </label>
          <div>
            <input className=' rounded-md w-full' id='password' type="text" placeholder='password' {...register('password',{required:'必須です'})} required/>
          </div>
        </div>
        <div className='text-center'>
          <button type='submit' className='bg-black w-[100px] h-[40px] rounded-md text-white'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default page