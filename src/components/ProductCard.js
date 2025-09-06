import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <h2>{product.name}</h2>
      <p>₹{product.price}</p>
      <p>Category: {product.category}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
