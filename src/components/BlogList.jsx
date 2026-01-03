import BlogCard from "./BlogCard";

export default function BlogList({ blogs, deleteBlog, setEditBlog }) {
  if (blogs.length === 0)
    return <p className="text-gray-500 text-center">No blogs found.</p>;

  return (
    <div className="grid gap-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          deleteBlog={deleteBlog}
          setEditBlog={setEditBlog}
        />
      ))}
    </div>
  );
}
