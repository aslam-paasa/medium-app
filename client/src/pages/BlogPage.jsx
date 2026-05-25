import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const BlogPage = () => {
    const { id } = useParams();

    const [blogData, setBlogData] = useState(null)

    async function fetchBlogById() {
        try {
            let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/${id}`)
            setBlogData(res.data.blog)
        } catch (error) {
            toast.error(error)
        }

    }

    useEffect(() => {
        fetchBlogById();
    }, [id])

    return (
        <div className="max-w-[1000px]">
            { 
            blogData ? <div>
                <h1 className="mt-10 font-bold text-6xl">{blogData.title}</h1>
                <h2 className="my-5 text-3xl">{blogData.creator.name}</h2>
                <img src={blogData.image} alt="" />
            </div> : <h1>Loading...</h1> }
        </div>
    )
}

export default BlogPage