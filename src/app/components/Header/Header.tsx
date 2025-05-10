'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import {fonts} from "@/app/lib/fonts/font"

import { useSession } from 'next-auth/react'
import { signOut} from "next-auth/react"
import Humberger from './Humberger'
import Nav from './Nav'

const Header = () => {
    const [navOpen,setNavOpen] = useState<boolean>(false);
    const {data:session,status} = useSession();
    if(!session)return null;
    const logout = async()=>{
       await signOut({callbackUrl:'/actions'})
    }
    const handleNav = (bool:boolean) => {
        setNavOpen(bool);
    }
    return (
        <div >
            <header className="z-[50] fixed px-6 w-full h-[100px] bg-white drop-shadow-xl flex justify-between items-center">
                <h1 className={`${fonts.className} text-xl`}>
                    <Link href={`/table`} className="drop-shadow">Full Stack Blog</Link>
                </h1>
                <div className='flex items-center'>
                    <div>
                     <button onClick={logout} className="w-[100px] h-[40px] rounded-md bg-blue-400 hover:scale-105 transition-all">Sign Out</button>
                    </div>
                    <div className='ml-3'>
                        <Humberger hadnleNav={handleNav} navOpen={navOpen}/>
                        <Nav hadnleNav={handleNav} navOpen={navOpen}/>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header