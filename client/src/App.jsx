import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import AuthForm from "./pages/AuthForm";
=======
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
// import Blogs from "./components/Blogs";
// import CreateBlogs from "./components/CreateBlogs";
>>>>>>> 9e99a62ee751462a13aae26d38069f6298f359e6

function App() {
  return (
    <div className="bg-slate-200 w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<div>hello</div>} />
<<<<<<< HEAD
        <Route path="/signup" element={<AuthForm type={"signup"} />} />
        <Route path="/signin" element={<AuthForm type={"signin"} />} />
=======
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
>>>>>>> 9e99a62ee751462a13aae26d38069f6298f359e6
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
