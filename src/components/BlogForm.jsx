import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";

export default function BlogForm({ addBlog, editBlog, updateBlog }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write your blog content...",
      }),
    ],
    content: form.content,
    onUpdate: ({ editor }) => {
      setForm((prev) => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });

  // Populate form when editing a blog
  useEffect(() => {
    if (editBlog && editor) {
      setForm({
        title: editBlog.title || "",
        content: editBlog.content || "",
        author: editBlog.author || "",
        image: editBlog.image || "",
        id: editBlog.id,
      });

      editor.commands.setContent(editBlog.content || "");
    }
  }, [editBlog, editor]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.author) return;

    if (editBlog) {
      updateBlog({
        ...form,
        updatedAt: new Date().toLocaleString(),
      });
    } else {
      addBlog({
        title: form.title,
        content: form.content,
        author: form.author,
        image: form.image,
        createdAt: new Date().toLocaleString(),
      });
    }

    // Reset form
    setForm({
      title: "",
      content: "",
      author: "",
      image: "",
    });

    editor?.commands.clearContent();
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
        {/* Blog Title */}
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        {/* Toolbar */}
        {editor && (
          <div className="flex flex-wrap gap-2 border-b pb-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-3 py-1 border rounded ${
                editor.isActive("bold")
                  ? "bg-indigo-600 text-white"
                  : ""
              }`}
            >
              Bold
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-3 py-1 border rounded ${
                editor.isActive("italic")
                  ? "bg-indigo-600 text-white"
                  : ""
              }`}
            >
              Italic
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-3 py-1 border rounded ${
                editor.isActive("underline")
                  ? "bg-indigo-600 text-white"
                  : ""
              }`}
            >
              Underline
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-3 py-1 border rounded ${
                editor.isActive("bulletList")
                  ? "bg-indigo-600 text-white"
                  : ""
              }`}
            >
              • List
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-3 py-1 border rounded ${
                editor.isActive("orderedList")
                  ? "bg-indigo-600 text-white"
                  : ""
              }`}
            >
              1. List
            </button>
          </div>
        )}

        {/* Rich Text Editor */}
        <div className="border rounded-lg min-h-[160px] focus-within:ring-2 focus-within:ring-indigo-400">
          <EditorContent editor={editor} />
        </div>

        {/* Author */}
        <input
          type="text"
          placeholder="Author Name"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
        />

        {/* Image URL */}
        <input
          type="text"
          placeholder="Image URL (optional)"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
      >
        {editBlog ? "Update Blog" : "Publish Blog"}
      </button>
    </form>
  );
}
