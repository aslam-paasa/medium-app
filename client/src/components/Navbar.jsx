import { Outlet } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="flex-none w-full bg-gray-700 h-[70px] text-white">Blog App</div>
        <Outlet />
    </div>
  )
}

export default Navbar