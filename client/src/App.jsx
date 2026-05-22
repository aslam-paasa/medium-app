import { Routes, Route } from "react-router-dom";

import AuthForm from "./pages/AuthForm";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="bg-slate-200 w-screen h-screen">
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<AuthForm type={"signup"} />} />
          <Route path="/signin" element={<AuthForm type={"signin"} />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
