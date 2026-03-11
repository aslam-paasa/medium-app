import { useState, useEffect } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  /* 1. Fetch Blogs from the Server */
  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await fetch("http://localhost:3000/api/v1/blogs");
      const response = await data.json();
      setBlogs(response.blogs);
    };
    fetchBlogs();
  }, []);

  console.log(blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <ul>
            <li>{blog.title}</li>
            <p>{blog.description}</p>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
