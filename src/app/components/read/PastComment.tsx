import Comment from "./Comment";

interface postId{
    postId:string
}

const PastComment = async({postId}:postId) => {
    const req = await fetch('http://localhost:3000/api/db/blog/comment');
    const res = await req.json() || [];
    console.log(res)
    return (
      <div>
        <Comment postId={postId} existingComment={res}/>
      </div>
    )
  }
  
  export default PastComment