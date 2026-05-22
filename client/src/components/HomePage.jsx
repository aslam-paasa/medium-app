import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);

    async function fetchBlogs() {
    try {
        const res = await axios.get(
            "http://localhost:3000/api/v1/blogs"
        );

        setBlogs(res.data.blogs);

    } catch (error) {
        console.log(error);
    }
}

    useEffect(() => {
        fetchBlogs();
    }, []);

return (
    <div className="w-[60%]">
        {
            blogs.map((blog) => (
                <div key={blog._id} className="w-full my-5 flex justify-between border-b border-gray-700 pb-5">
                    <div className="w-[60%] flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <img
                                src="https://i.pravatar.cc/150?img=12"
                                alt=""
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <p>{blog?.creator?.name}</p>
                        </div>
                        <h2 className="font-bold text-3xl"> {blog.title}</h2>
                        <h4 className="line-clamp-2 text-gray-400">{blog.description}</h4>
                        <div className="flex gap-5 text-gray-500">
                            <p>{new Date(blog.createdAt).toDateString()}</p>
                            <p>500</p>
                            <p>200</p>
                        </div>
                    </div>
                    <div className="w-[25%] h-[180px]">
                        <img
                            src={blog.image}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            ))
        }
    </div>
)
}

export default HomePage