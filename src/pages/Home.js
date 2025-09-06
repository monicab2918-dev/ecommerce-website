import React, { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = async (productId) => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Login first!");
      return;
    }

    await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, productId }),
    });
    alert("Added to cart!");
  };

  return (
    <div className="container">
      <h2 className="title">Our Products</h2>
      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img
              src={`https://via.placeholder.com/200x150?text=${p.name}`}
              alt={p.name}
            />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <p className="category">{p.category}</p>
            <button onClick={() => addToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
