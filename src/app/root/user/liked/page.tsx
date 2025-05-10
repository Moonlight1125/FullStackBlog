
import React from 'react'
import Liked from '@/app/components/like/Liked';

const page = async() => {
    const res = await fetch('http://localhost:3000/api/db/blog/liked');
    const likedContent = await res.json();
    console.log(likedContent);
  return (
    <div>
        <Liked/>
    </div>
  )
}

export default page