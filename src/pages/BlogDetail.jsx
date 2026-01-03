import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const selectedBlog = blogs.find((b) => b.id === Number(id));
    setBlog(selectedBlog);
  }, [id]);

  if (!blog) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Blog not found
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

      {/* HEADER: Author | Title | Date */}
      <div className="mb-6 border-b pb-4">

        <div className="grid grid-cols-3 items-center">

          {/* Author - LEFT */}
          <div className="text-sm text-gray-500 text-left">
            ✍️ {blog.author}
          </div>

          {/* Title - CENTER */}
          <h1 className="text-4xl font-bold text-gray-800 text-center capitalize">
            {blog.title}
          </h1>

          {/* Date - RIGHT */}
          <div className="text-sm text-gray-500 text-right">
            <div>📅 {blog.createdAt}</div>
            {blog.updatedAt && (
              <div>✏️ Updated: {blog.updatedAt}</div>
            )}
          </div>

        </div>
      </div>

      {/* IMAGE */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-xl mb-8"
        />
      )}

      {/* CONTENT */}
      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
        {blog.content}
      </p>

      {/* BACK BUTTON */}
      <div className="mt-10 text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
        >
          ← Back to Blogs
        </button>
      </div>

    </div>
  );
}
