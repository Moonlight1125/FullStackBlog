//markdown 参考
//https://zenn.dev/milky/articles/markdown-content


import MarkdownEditorForEdit from "@/app/components/Markdown/MarkdownForEdit";
import { blogType } from "@/app/lib/types/type";

type Props = {
    params: Promise<{ [key: string]: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const MarkdownEditor = async (props:Props) => {
    const {blogid} = await props.searchParams
    const req = await fetch(`http://localhost:3000/api/db/blog/${blogid}`);
    const blog:blogType = await req.json();

  return (
    <div className="pt-16">
        <MarkdownEditorForEdit content={blog.content} id={blog.id}/>
    </div>
  );
};

export default MarkdownEditor