import React, { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) return;
    fetch(`http://localhost:5000/cart/${email}`)
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error(err));
  }, [email]);

  return (
    <div className="container">
      <h2 className="title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((id, index) => (
            <li key={index} className="cart-item">
              Product ID: {id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
