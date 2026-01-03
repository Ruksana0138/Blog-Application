import { useState, useEffect } from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(stored);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (blog) => {
    setBlogs([{ id: Date.now(), ...blog }, ...blogs]);
  };

  const updateBlog = (updated) => {
    setBlogs(blogs.map((b) => (b.id === updated.id ? updated : b)));
    setEditBlog(null);
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Blog Application</h1>

      <BlogForm
        addBlog={addBlog}
        editBlog={editBlog}
        updateBlog={updateBlog}
      />

      <BlogList blogs={blogs} deleteBlog={deleteBlog} setEditBlog={setEditBlog} />
    </div>
  );
}
