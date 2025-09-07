import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    let url = `/products?`;
    if (category) url += `category=${category}&`;
    if (maxPrice) url += `maxPrice=${maxPrice}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [category, maxPrice]);

  const addToCart = (productId) => {
    const email = localStorage.getItem("userEmail");
    if (!email) return alert("Please login first");
    fetch("/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, productId }),
    }).then(() => alert("Added to cart"));
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ marginBottom: "15px" }}>
        <label>Category: </label>
        <select onChange={e => setCategory(e.target.value)} value={category}>
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>

        <label style={{ marginLeft: "15px" }}>Max Price: </label>
        <input
          type="number"
          placeholder="Enter max price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
