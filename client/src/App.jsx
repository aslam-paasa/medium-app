import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
// import Blogs from "./components/Blogs";
// import CreateBlogs from "./components/CreateBlogs";

function App() {
  return (
    <div className="bg-slate-200 w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<div>hello</div>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
