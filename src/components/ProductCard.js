import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div style={cardStyle}>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>{product.category}</p>
      <button onClick={() => addToCart(product.id)} style={buttonStyle}>
        Add to Cart
      </button>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "15px",
  width: "200px",
  textAlign: "center",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
};

const buttonStyle = {
  padding: "8px 15px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
