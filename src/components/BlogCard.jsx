import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog, deleteBlog, setEditBlog }) {
  const navigate = useNavigate();

  const previewText =
    blog.content.length > 120
      ? blog.content.slice(0, 120) + "..."
      : blog.content;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 capitalize">
        {blog.title}
      </h3>

      {/* Content Preview */}
      <p className="text-gray-600 mt-2">
        {previewText}
      </p>

      {/* Meta Info */}
      <div className="text-sm text-gray-500 mt-4 flex flex-col gap-1">
        <span>✍️ {blog.author}</span>
        <span>📅 {blog.createdAt}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => setEditBlog(blog)}
          className="px-4 py-2 bg-yellow-400 text-white rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => deleteBlog(blog.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>

        <button
          onClick={() => navigate(`/blog/${blog.id}`)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
