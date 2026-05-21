import { useState } from "react";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[20%] flex flex-col items-center gap-5">
      <h1 className="text-3xl">Sign Up</h1>

      <form
        onSubmit={handleRegister}
        className="w-[100%] flex flex-col items-center gap-5"
      >
        <input
          type="text"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full h-[50px] p-2 bg-gray-500 text-white text-xl rounded-md focus:outline-none placeholder:text-gray-400"
          placeholder="enter your name"
        />
        <input
          type="email"
          autoComplete="email"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full h-[50px] p-2 bg-gray-500 text-white text-xl rounded-md focus:outline-none placeholder:text-gray-400"
          placeholder="enter your email"
        />
        <input
          type="password"
          autoComplete="password"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
          className="w-full h-[50px] p-2 bg-gray-500 text-white text-xl rounded-md focus:outline-none placeholder:text-gray-400"
          placeholder="enter your password"
        />
        <button className="w-[100px] h-[50px] p-2 bg-gray-500 text-white text-xl rounded-md focus:outline-none">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
