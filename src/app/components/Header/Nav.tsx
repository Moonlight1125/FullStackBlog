'use client'

import { handleNavFuncType } from '@/app/lib/types/type';
import clsx from 'clsx';
import Link from 'next/link'
import React from 'react'

interface NavProps {
    hadnleNav: handleNavFuncType,
    navOpen: boolean,
}
const Nav = ({ hadnleNav,navOpen }: NavProps) => {
    return (
        <div className={clsx(
            `-translate-x-[100%] transition-all duration-500 w-[100%] grid grid-cols-12 pt-3 fixed min-h-screen z-[100] top-0 left-0`,{
             'translate-x-[0%]': navOpen
            }
        )}>
            <div className='bg-white col-span-3'>
                <h1 className='mb-3 text-2xl'>Full Stack Blog</h1>
                <nav>
                    <ul>
                        <li className='transition-all'>
                            <Link href={'/root/user/postblog'}>
                                <button onClick={() => hadnleNav(false)} className='relative h-[55px] w-full text-left text-xl hover:bg-menuListBgColor transition-all'>
                                    <div className='absolute top-0 left-0 z-20 w-full h-full hover:text-blue-400'>Post Blog</div>
                                    <div className='text-sm absolute bottom-1 left-0 z-10'>記事を書く</div>
                                </button>
                            </Link>
                        </li>
                        <li className='transition-all'>
                            <Link href={'/root/user/liked'}>
                                <button onClick={() => hadnleNav(false)} className='relative h-[55px] w-full text-left text-xl hover:bg-menuListBgColor transition-all'>
                                    <div className='absolute top-0 left-0 z-20 w-full h-full hover:text-blue-400'>Liked Videos</div>
                                    <div className='text-sm absolute bottom-1 left-0 z-10'>いいねした記事</div>
                                </button>
                            </Link>
                        </li>
                        <li className='transition-all'>
                            <Link href={'/root/user/bookmark'}>
                                <button onClick={() => hadnleNav(false)} className='relative h-[55px] w-full text-left text-xl hover:bg-menuListBgColor transition-all'>
                                    <div className='absolute top-0 left-0 z-20 w-full h-full hover:text-blue-400'>Bookmarks</div>
                                    <div className='text-sm absolute bottom-1 left-0 z-10'>あとで読む</div>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='bg-black/50 col-span-9'></div>
        </div>
    )
}

export default Nav