import "./App.css";
import { useState } from "react";

function App() {
  /* 3. Accumulate User Data */
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* 4. Post User Data to Server */
  const handleSubmit = async () => {
    const data = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const response = await data.json();
    alert(response.message);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {/* 1. Writing User Data to the State */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <br /> <br />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <br /> <br />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
      </div>
      {/* 2. Submitting User Data to the Server */}
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
