// server.js: the shop's server. Express sends the shop page AND answers every /api request.
// YOU write the routes, one day at a time. Each one answers 501 "not built yet" until you build it.
import express from "express";
import { connectDB } from "./db.js";
import { setUpShop } from "./setup/shop.js";

const PORT = 3000;
const app = express();

// Sends the shop page (everything in the public folder) to the browser.
app.use(express.static("public"));

// ---------- Day 3: read JSON bodies ----------


// ALREADY DONE: connects with your connectDB(), fills the products collection, adds GET /api/status.
const db = await setUpShop(app, connectDB);

// ---------- Day 2: READ ----------
// GET /api/products: sends back an array of every product.
app.get("/api/products", async (req, res) => {
  res.status(501).json({ error: "GET /api/products is not built yet (Day 2)" });
});

// GET /api/cart: sends back an array of every item in the cart.
app.get("/api/cart", async (req, res) => {
  res.status(501).json({ error: "GET /api/cart is not built yet (Day 2)" });
});

// ---------- Day 3: CREATE ----------
// POST /api/cart   body: { "id": "hoodie" }
// Puts that product in the cart with qty 1, or adds 1 to qty if it's already there.
app.post("/api/cart", async (req, res) => {
  res.status(501).json({ error: "POST /api/cart is not built yet (Day 3)" });
});

// ---------- Day 3: UPDATE ----------
// PATCH /api/cart/:id   body: { "amount": 1 } or { "amount": -1 }
// Changes that item's qty by amount.
app.patch("/api/cart/:id", async (req, res) => {
  res.status(501).json({ error: "PATCH /api/cart/:id is not built yet (Day 3)" });
});

// ---------- Day 4: DELETE ----------
// DELETE /api/cart/:id: takes that item out of the cart.
app.delete("/api/cart/:id", async (req, res) => {
  res.status(501).json({ error: "DELETE /api/cart/:id is not built yet (Day 4)" });
});

// DELETE /api/cart: empties the whole cart.
app.delete("/api/cart", async (req, res) => {
  res.status(501).json({ error: "DELETE /api/cart is not built yet (Day 4)" });
});

app.listen(PORT, () => {
  console.log(`Shop running at http://localhost:${PORT}  (Ctrl+C to stop)`);
});
