import React from "react";
import axios from "axios";

const API_BASE = "https://curd-backend-xjwj.onrender.com";

function PostCard({ post, refresh }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/api/posts/${post._id}`);
      refresh();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="border rounded p-4 bg-gray-50 shadow">
      <p className="mb-2">{post.description}</p>

      {post.image && (
        <img
          src={`${API_BASE}/uploads/${post.image}`}
          alt="uploaded"
          className="mb-2 max-h-60 object-contain"
        />
      )}

      {post.video && (
        <video controls className="mb-2 w-full max-h-60">
          <source src={`${API_BASE}/uploads/${post.video}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 transition"
      >
        Delete
      </button>
    </div>
  );
}

export default PostCard;
