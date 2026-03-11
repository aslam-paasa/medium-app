import { useState } from "react";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* 1. Post User Data to the Server */
  /* Send signup request to backend */
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const res = await response.json();

      if (response.ok && res.success) {
        localStorage.setItem("user", JSON.stringify(res.user));
        alert(res.message);
      } else {
        alert(res.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
    }
  };

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
    </div>
  );
};

export default Signup;
