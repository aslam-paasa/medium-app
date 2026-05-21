import { Routes, Route } from "react-router-dom";
import AuthForm from "./pages/AuthForm";

function App() {
  return (
    <div className="bg-slate-200 w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<div>hello</div>} />
        <Route path="/signup" element={<AuthForm type={"signup"} />} />
        <Route path="/signin" element={<AuthForm type={"signin"} />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
