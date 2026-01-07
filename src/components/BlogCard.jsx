import { Link } from "react-router-dom";

export default function BlogCard({ blog, deleteBlog, setEditBlog }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      {/* Blog Title */}
      <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>

      {/* Rich text preview */}
      <div
        className="text-gray-600 mt-2 line-clamp-2"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Author & Date */}
      <div className="text-sm text-gray-500 mt-4 space-y-1">
        <p>✍️ {blog.author}</p>
        <p>📅 {blog.createdAt}</p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => setEditBlog(blog)}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => deleteBlog(blog.id)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>

        <Link
          to={`/blog/${blog.id}`}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

