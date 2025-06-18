import React from "react";
import axios from "axios";

function PostCard({ post, refresh }) {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/posts/${post._id}`);
    refresh();
  };

  return (
    <div className="border rounded p-4 bg-gray-50 shadow">
      <p className="mb-2">{post.description}</p>
      {post.image && <img src={`http://localhost:5000/${post.image}`} alt="uploaded" className="mb-2 max-h-60" />}
      {post.video && (
        <video controls className="mb-2 w-full max-h-60">
          <source src={`http://localhost:5000/${post.video}`} type="video/mp4" />
        </video>
      )}
      <button onClick={handleDelete} className="text-red-600">Delete</button>
    </div>
  );
}

export default PostCard;
