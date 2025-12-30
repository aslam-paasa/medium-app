import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [blogs, setBlogs] = useState([]);


  /* 1. Post User Data to the Server */ 
  const handleSubmit = async () => {
    const data = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const response = await data.json();
    alert(response.message);
  };

  /* 2. Fetch Blogs from the Server */
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
      <h1>Sign Up</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setUserData((userData) => ({
              ...userData,
              name: e.target.value,
            }))
          }
        />
        <br /> <br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setUserData((userData) => ({
              ...userData,
              email: e.target.value,
            }))
          }
        />
        <br /> <br />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) =>
            setUserData((userData) => ({
              ...userData,
              password: e.target.value,
            }))
          }
        />
      </div>
      <br />
      <button onClick={handleSubmit}>Submit</button>

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
}

export default App;
