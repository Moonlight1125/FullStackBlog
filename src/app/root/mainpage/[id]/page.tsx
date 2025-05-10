
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Comment from '@/app/components/read/Comment';
import PastComment from '@/app/components/read/PastComment';


interface response {
    id: number
    title: string
    content: string
    img: string
}

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const req = await fetch(`http://localhost:3000/api/db/blog/${id}`);
    const res: response = await req.json();
    const { img, content, title } = res;
    return (
        <div className=" w-full min-h-[100vh] bg-[#ECF2F6] pt-32 pb-10">
            <div className="text-center mb-10">
                <div className="w-[100px] h-[100px] mx-auto mb-5">
                    <img src={img} alt="img" className="w-[100px] h-[100px] rounded-[20%]" />
                </div>
                <div className="text-xl md:text-[30px] font-bold ">
                    {title}
                </div>
            </div>
            <div className="w-[85%] mx-auto lg:w-3/5 min-h-[100vh] bg-white pt-10 px-8 mb-7">
                <h1 className="font-bold text-2xl mb-7"></h1>
                <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>{content}</ReactMarkdown>
                </div>
            </div>
            <div className="text-center">
                <Button variant={'default'} size={'lg'}>
                    <Link href={`/root/edit/blog?blogid=${id}`}>記事を編集する</Link>
                </Button>
            </div>
            <PastComment postId={id}/>
        </div>
    )
}