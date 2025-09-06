import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Make sure styles are imported

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">MyShop</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/auth">Login / Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
