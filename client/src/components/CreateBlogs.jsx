import { useState } from "react";
import { Navigate } from "react-router-dom";

const CreateBlogs = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
  });

  /**
   * 1. Check if the user is logged in using the token:
   *    a. If yes, then send the blog data + token (in headers) to the server
   *    b. If no, then redirect to the signup page
   */
  let token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleCreateBlog = async () => {
    try {
      const data = await fetch("http://localhost:3000/api/v1/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      const res = await data.json();

      if (data.status === 201 && res.status === true) {
        alert(res.message);
      } else {
        alert(res.message || "Failed to create blog");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (!token) {
    return <Navigate to="/signup" />;
  }

  return (
    <div>
      <h1>Create Blogs</h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setBlogData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <br /> <br />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) =>
            setBlogData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>

      <br />

      <button onClick={handleCreateBlog}>Create Blog</button>
    </div>
  );
};

export default CreateBlogs;
