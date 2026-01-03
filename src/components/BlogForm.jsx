import { useState, useEffect } from "react";

export default function BlogForm({ addBlog, editBlog, updateBlog }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    image: "", 
  });

  useEffect(() => {
    if (editBlog) {
      setForm(editBlog);
    }
  }, [editBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.author) return;

    if (editBlog) {
      updateBlog({ ...form, updatedAt: new Date().toLocaleString() });
    } else {
      addBlog({
        ...form,
        createdAt: new Date().toLocaleString(),
      });
    }

    setForm({ title: "", content: "", author: "" });
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-white rounded-xl shadow-lg p-6 mb-8"
>
  <h2 className="text-2xl font-semibold mb-4 text-gray-700">
    {editBlog ? "Edit Blog" : "Create Blog"}
  </h2>

  <div className="space-y-4">
    <input
      type="text"
      placeholder="Blog Title"
      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
    />

    <textarea
      placeholder="Write your content..."
      className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={form.content}
      onChange={(e) => setForm({ ...form, content: e.target.value })}
    />

    <input
      type="text"
      placeholder="Author Name"
      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={form.author}
      onChange={(e) => setForm({ ...form, author: e.target.value })}
    />

    <input
  type="text"
  placeholder="Image URL (optional)"
  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
  value={form.image}
  onChange={(e) => setForm({ ...form, image: e.target.value })}
/>

  </div>

  <button
    className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
  >
    {editBlog ? "Update Blog" : "Publish Blog"}
  </button>
</form>

  );
}
