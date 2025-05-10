'use client'
import Link from "next/link";
import { Heart, Notebook } from "lucide-react";
import { blogTypeAtTable } from "@/app/lib/types/type";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface fetchProps {
    method:string,
    id:number,
    link:string,
}

const ArticleItem = ({ id, img, title }: blogTypeAtTable) => {
    const links = [
        `/api/articleOption/like/${id}`,
        `/api/articleOption/Bookmark/${id}`,
    ]
    const [later, setLater] = useState(false);
    const [like, setLike] = useState(false);

    useEffect(() => {
        const likeStatus = JSON.parse(localStorage.getItem(`like-${id}`) as string) ?? false;
        if(likeStatus!=false){setLike(true)}
        const bookMarkStatus = JSON.parse(localStorage.getItem(`bookmark-${id}`) as string) ?? false;
        if(bookMarkStatus!=false){setLater(true)}
    }, [])

    const toggleLikeOrBookMark = async ({method,id,link}:fetchProps)=>{
        const req =await fetch(link,{
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:id,
            }
            ),
        })
        const res = await req.json();
    }


    const handleLater = () => {
        setLater(!later);
        if(!later){
            toggleLikeOrBookMark({method:'POST',id:id,link:'/api/articleOption/Bookmark'});
            localStorage.setItem(`bookmark-${id}`,JSON.stringify('active'));
        }else{
            toggleLikeOrBookMark({method:'DELETE',id:id,link:'/api/articleOption/Bookmark'});
            localStorage.removeItem(`bookmark-${id}`);
        }
    }
    const handleLike = () => {
        setLike(!like);
        if(!like){
            toggleLikeOrBookMark({method:'POST',id:id,link:'/api/db/blog/liked'});
            localStorage.setItem(`like-${id}`,JSON.stringify('active'));
        }else{
            toggleLikeOrBookMark({method:'DELETE',id:id,link:'/api/db/blog/liked'});
            localStorage.removeItem(`like-${id}`);
        }
    }
    return (
        <div key={id} className="mb-6 w-[90%] grid grid-cols-6 md:w-[60%] lg:w-[50%] items-center rounded-xl bg-slate-300 shadow-articleShadow hover:scale-[1.02]  transition-all duration-500">
            <Link href={`/root/mainpage/${id}`} prefetch={true} className="col-span-2 ">
                <div className="w-[150px] h-[150px]  flex items-center pl-5">
                    <div className="h-full w-full flex items-center justify-center">
                        <img src={img} alt="img" className=' w-[100px] h-[100px] rounded-[20%]' />
                    </div>
                </div>
            </Link>
            <article className="ml-4 h-[60%] mr-2 col-span-4">
                <div className="font-bold mb-7">{title}</div>
                <div className="flex space-x-2 items-center ">
                    <p className="opacity-50">date:11/24</p>
                    <Notebook onClick={handleLater} className={clsx(
                        `size-4 hover:text-green-600`, {
                        'text-green-600': later,
                    }
                    )} />
                    <Heart onClick={handleLike} className={clsx(
                        'size-4 hover:text-red-500',{
                            'text-red-500':like
                        }
                    )} />
                </div>
            </article>
        </div>
    )
}

export default ArticleItem