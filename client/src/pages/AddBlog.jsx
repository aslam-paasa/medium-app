import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddBlog = () => {
    const token = localStorage.getItem("token");
    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        image: null
    })

    const navigate = useNavigate();

    async function handlePostBlog() {
        try {
            const res = await axios.post(
                `http://localhost:3000/api/v1/blog`,
                blogData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success(res.data.message);
            navigate("/")
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    return !token ? (
        <Navigate to="/signin" />
    ) : (
        <div className="w-[500px]">
            <label htmlFor="">Title</label>
            <input
                type="text"
                placeholder="title"
                onChange={(e) =>
                    setBlogData((blogData) => ({
                        ...blogData,
                        title: e.target.value
                    }))}
            />
            <br />
            <label htmlFor="">Description</label>
            <input
                type="text"
                placeholder="description"
                onChange={(e) =>
                    setBlogData((blogData) => ({
                        ...blogData,
                        description: e.target.value
                    }))}
            />
            <br />
            <div>
                <label htmlFor="image" className="">
                    {blogData.image ? (
                        <img src={URL.createObjectURL(blogData.image)} alt="" className="aspect-video object-cover" />
                    ) : (
                        <div className="bg-slate-500 aspect-video flex justify-center items-center text-4xl">
                            Select Image
                        </div>
                    )
                    }
                </label>
                <input
                    className="hidden"
                    id="image"
                    type="file"
                    accept=".jpeg, .png, .jpg"
                    onChange={(e) =>
                        setBlogData((blogData) => ({
                            ...blogData,
                            image: e.target.files[0]
                        }))}
                />
            </div>
            <br />
            <button onClick={handlePostBlog}>Post Blog</button>
        </div>
    );
};

export default AddBlog;