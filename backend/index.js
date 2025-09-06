const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --------------------
// Temporary Data
// --------------------
let users = [];
let products = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 20000, category: "Electronics" },
  { id: 3, name: "Shoes", price: 2000, category: "Fashion" },
  { id: 4, name: "Watch", price: 1500, category: "Fashion" },
  { id: 5, name: "Headphones", price: 3000, category: "Electronics" },
];

let carts = {};
const SECRET_KEY = "secret123";

// --------------------
// API Routes
// --------------------

// User Signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  res.json({ message: "Signup successful" });
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Get all products with filters
app.get("/products", (req, res) => {
  let { category, maxPrice } = req.query;
  let filtered = products;

  if (category) filtered = filtered.filter(p => p.category === category);
  if (maxPrice) filtered = filtered.filter(p => p.price <= parseInt(maxPrice));

  res.json(filtered);
});

// Add product (Admin)
app.post("/products", (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category
  };
  products.push(newProduct);
  res.json({ message: "Product added", product: newProduct });
});

// Add to cart
app.post("/cart", (req, res) => {
  const { email, productId } = req.body;
  if (!carts[email]) carts[email] = [];
  carts[email].push(productId);
  res.json({ message: "Item added to cart" });
});

// Get user cart
app.get("/cart/:email", (req, res) => {
  const { email } = req.params;
  res.json(carts[email] || []);
});

// --------------------
// Serve React Frontend
// --------------------
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
