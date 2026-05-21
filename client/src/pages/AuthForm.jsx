import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const AuthForm = ({ type }) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleAuthForm = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `http://localhost:3000/api/v1/${type}`,
                userData
            );

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));

            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log();
        }
    };

    return (
        <div className="w-[20%] flex flex-col items-center gap-5">
            <h1 className="text-3xl">{type === "signin" ? "Sign In" : "Sign Up"}</h1>

            <form
                onSubmit={handleAuthForm}
                className="w-[100%] flex flex-col items-center gap-5"
            >
                {
                    type === "signup" && (
                        <input
                            type="text"
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="w-full h-[50px] p-2 bg-gray-500 text-white text-xl rounded-md focus:outline-none placeholder:text-gray-400"
                            placeholder="enter your name"
                        />)
                }

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
                    {type === "signin" ? "Login" : "Register"}
                </button>
            </form>

            {
                type === "signin" ? (
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                ) : (
                    <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                )
            }
        </div>
    );

}

export default AuthForm