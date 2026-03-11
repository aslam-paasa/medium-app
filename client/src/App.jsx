import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./components/Blogs";
import CreateBlogs from "./components/CreateBlogs";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/create-blog" element={<CreateBlogs />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
