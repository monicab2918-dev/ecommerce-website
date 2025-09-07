import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;

    fetch(`/cart/${email}`)
      .then(res => res.json())
      .then(ids => {
        fetch("/products")
          .then(res => res.json())
          .then(products => {
            const items = products.filter(p => ids.includes(p.id));
            setCartItems(items);
          });
      });
  }, [email]);

  const removeFromCart = (id) => {
    const newCart = cartItems.filter(p => p.id !== id);
    setCartItems(newCart);

    fetch("/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, removeIds: [id] }),
    });
  };

  if (!email) return <p>Please login to view your cart.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {cartItems.map(item => (
            <div key={item.id} style={cartItemStyle}>
              <div>
                <h3>{item.name}</h3>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={removeBtnStyle}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const cartItemStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
};

const removeBtnStyle = {
  padding: "5px 12px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
