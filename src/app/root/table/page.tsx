// import Table from "../components/Articles/Table";
//参考記事
//https://zenn.dev/y_ta/books/eec3b78567aeeb
//https://zenn.dev/moozaru/articles/58bd654bbc402c
//tailwindcss
//https://zenn.dev/tacchan5424/books/22d87ed6bc8550/viewer/b4929f



//<supabase参考>
//https://zenn.dev/kiriyama/articles/89bac9034bbe7a

import Table from "@/app/components/Articles/Table";

export default async function Home() {
  const req = await fetch('http://localhost:3000/api/db/blog');
  const blog = await req.json();
  return (
    <div>
      <Table blog={blog}/>
    </div>
  );
}
