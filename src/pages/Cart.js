import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function Cart({ user }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios.get(`${API_URL}/cart/${user.email}`).then((res) => {
        setCartItems(res.data);
      });
    }
  }, [user]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <ul>
          {cartItems.map((id, i) => (
            <li key={i}>Product ID: {id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
