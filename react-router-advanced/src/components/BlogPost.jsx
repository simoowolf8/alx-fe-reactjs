// src/pages/BlogPost.jsx
import { useParams } from "react-router-dom";

function BlogPost() {
  const { postId } = useParams();

  return <div>Blog Post ID: {postId}</div>;
}

export default BlogPost;
