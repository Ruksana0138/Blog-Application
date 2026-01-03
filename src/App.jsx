import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}
