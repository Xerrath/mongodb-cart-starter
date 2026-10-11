// setup/shop.js: ALREADY DONE. You don't need to change this file.
// Connects with YOUR connectDB(), puts the products in the products collection,
// and adds GET /api/status (the green line on the page).
import { PRODUCTS } from "./products.js";
import { where } from "./practice-server.js";

export async function setUpShop(app, connectDB) {
  let db = null;
  let problem = null;

  try {
    db = await connectDB();
    // The store's products. Fresh every time the server starts, so prices are always right.
    await db.collection("products").deleteMany({});
    await db.collection("products").insertMany(PRODUCTS);
    console.log(`Connected to ${db.databaseName} on ${where()}`);
  } catch (error) {
    problem = error;
    db = null;
    console.log(`Database not connected: ${error.message}`);
  }

  app.get("/api/status", async (req, res) => {
    if (!db) {
      return res.status(500).json({ error: problem.message });
    }
    const collections = await db.listCollections().toArray();
    res.json({
      database: db.databaseName,
      where: where(),
      collections: collections.map((c) => c.name).sort(),
    });
  });

  return db;
}
