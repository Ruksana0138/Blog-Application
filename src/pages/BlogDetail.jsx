import { useParams, Link } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Blog not found.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
      {/* Meta info */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <div>✍️ {blog.author}</div>
        <div className="text-right">
          <p>📅 {blog.createdAt}</p>
          {blog.updatedAt && <p>✏️ Updated: {blog.updatedAt}</p>}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        {blog.title}
      </h1>

      {/* Image (optional) */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}

      {/* Rich text content */}
      <div
  className="prose max-w-none mt-6"
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>


      {/* Back button */}
      <Link
        to="/"
        className="inline-block mt-8 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
      >
        ← Back to Blogs
      </Link>
    </div>
  );
}

