// api.js: everything the PAGE says to the SERVER lives in this file.
// cart.js calls these functions. YOU write them, one day at a time.
// Each one throws "not built yet" until you replace that line with your code.
// Same names as your IndexedDB db.js: only the inside changes.

// ALREADY DONE: fetch does NOT throw on a 404 or a 500. readJSON() reads the server's answer.
// If the status is OK, it gives back the data. If not, it throws the server's error message.
async function readJSON(response) {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error);
    error.name = `Error ${response.status}`;
    throw error;
  }
  return data;
}

// ALREADY DONE (your example): GET /api/status
// Gives back { database, where, collections } for the green status line.
async function getStatus() {
  const response = await fetch("/api/status");
  return readJSON(response);
}

// ---------- Day 2: READ ----------
// Gives back an array of every product (from GET /api/products).
async function getProducts() {
  throw new Error("getProducts() is not built yet (Day 2)");
}

// Gives back an array of every item in the cart (from GET /api/cart).
async function getCart() {
  throw new Error("getCart() is not built yet (Day 2)");
}

// ---------- Day 3: CREATE ----------
// product: one product from getProducts().
// Asks the server to put it in the cart (POST /api/cart).
async function addToCart(product) {
  throw new Error("addToCart() is not built yet (Day 3)");
}

// ---------- Day 3: UPDATE ----------
// id: which item. amount: 1 or -1.
// Asks the server to change that item's qty (PATCH /api/cart/:id).
async function changeQuantity(id, amount) {
  throw new Error("changeQuantity() is not built yet (Day 3)");
}

// ---------- Day 4: DELETE ----------
// id: which item. Asks the server to take it out of the cart (DELETE /api/cart/:id).
async function removeFromCart(id) {
  throw new Error("removeFromCart() is not built yet (Day 4)");
}

// Asks the server to empty the whole cart (DELETE /api/cart).
async function clearCart() {
  throw new Error("clearCart() is not built yet (Day 4)");
}
