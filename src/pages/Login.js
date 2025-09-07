import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("userEmail", email);
          alert("Login successful");
        } else alert(data.message);
      });
  };

  return (
    <div style={formStyle}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin} style={buttonStyle}>Login</button>
    </div>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "250px",
  gap: "10px",
};

const buttonStyle = {
  padding: "5px 10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
