'use client'
import { handleNavFuncType } from '@/app/lib/types/type';
import clsx from 'clsx';

import React, { useEffect } from 'react'

interface humbergerProps {
  hadnleNav: handleNavFuncType,
  navOpen: boolean,
}

const Humberger = ({ hadnleNav, navOpen }: humbergerProps) => {
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

  }, [navOpen])
  return (
    <div className='relative w-[30px] h-[30px] z-[110]' onClick={() => hadnleNav(!navOpen)}>
      <div className='absolute left-0 top-0 w-full h-full z-30'>
        <div className='relative w-full h-full'>
          <span className={clsx(
            'absolute top-1 left-0  w-full border-t-2 border-black transition-all',
            { 'rotate-45 top-1/2 translate-y-[-50%] border-white': navOpen }
          )}></span>
          <span className={clsx(
            'absolute top-1/2 w-full border-t-2 border-black transition-all',
            { 'rotate-45 top-1/2 translate-y-[-50%] border-white': navOpen }
          )}></span>
          <span className={clsx(
            'absolute left-0 bottom-1 w-full border-t-2 border-black transition-all z-10', {
            '-rotate-45 top-1/2 bottom-1/2 translate-y-[-50%] border-white': navOpen
          }
          )}></span>
        </div>
      </div>
    </div>
  )
}

export default Humberger