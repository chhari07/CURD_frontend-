import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../src/Postcard";

const API_BASE = "https://curd-backend-xjwj.onrender.com";

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ description: "", image: null, video: null });
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);
    if (form.video) data.append("video", form.video);

    try {
      await axios.post(`${API_BASE}/api/posts`, data);
      setForm({ description: "", image: null, video: null });
      // Clear input values visually
      document.getElementById("imageInput").value = "";
      document.getElementById("videoInput").value = "";
      fetchPosts();
    } catch (err) {
      console.error("Error uploading post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📥 Media Upload CRUD App</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="w-full p-2 border rounded"
          required
        />
        <input id="imageInput" type="file" name="image" accept="image/*" onChange={handleChange} />
        <input id="videoInput" type="file" name="video" accept="video/*" onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="mt-6 grid gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} refresh={fetchPosts} />
        ))}
      </div>
    </div>
  );
}

export default App;
