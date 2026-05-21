const Signin = () => {
  return (
    <div className="w-[20%] flex flex-col items-center gap-5">
      <h1 className="text-3xl">Sign In</h1>
      <input
        type="email"
        className="w-full h-[50px] p-2 bg-gray-500 text-white text-xl rounded-md focus:outline-none placeholder:text-gray-400"
        placeholder="enter your email"
      />
      <input
        type="password"
        className="w-full h-[50px] p-2 bg-gray-500 text-white text-xl rounded-md focus:outline-none placeholder:text-gray-400"
        placeholder="enter your password"
      />
      <button
        type="text"
        className="w-[100px] h-[50px] p-2 bg-gray-500 text-white text-xl rounded-md focus:outline-none"
      >
        Login
      </button>
    </div>
  );
};

export default Signin;
