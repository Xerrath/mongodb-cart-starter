// db.js: connects the SERVER to MongoDB.
// YOU write connectDB on Day 1. Replace the throw line with your code.
import { MongoClient } from "mongodb";
import { getMongoURI } from "./setup/practice-server.js";

const DB_NAME = "shopDB";

// ---------- Day 1: Connect ----------
// Gets the connection string, connects a MongoClient to it,
// and gives back (a promise for) the shopDB database.
export async function connectDB() {
  throw new Error("connectDB() is not built yet (Day 1)");
}
