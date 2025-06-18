// PostCard.jsx
import React from "react";

const PostCard = ({ post, refresh }) => {
  const API_BASE = "https://curd-backend-xjwj.onrender.com";

  const handleDelete = async () => {
    await fetch(`${API_BASE}/api/posts/${post._id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <p className="mb-2">{post.description}</p>
      {post.image && <img src={`${API_BASE}/uploads/${post.image}`} alt="uploaded" className="mb-2 max-w-xs" />}
      {post.video && (
        <video controls className="max-w-xs mb-2">
          <source src={`${API_BASE}/uploads/${post.video}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <button onClick={handleDelete} className="text-red-500 underline">
        Delete
      </button>
    </div>
  );
};

export default PostCard;
