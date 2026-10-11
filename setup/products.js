// setup/products.js: the store's products. They go in the products collection when the server starts.
// _id is the product's key, like id was in IndexedDB.

export const PRODUCTS = [
  { _id: "hoodie", name: "West-MEC Hoodie", price: 38.0, emoji: "🧥", tag: "Best seller" },
  { _id: "tee", name: "Code Crew Tee", price: 18.0, emoji: "👕" },
  { _id: "cap", name: "Snapback Cap", price: 22.5, emoji: "🧢" },
  { _id: "bottle", name: "Water Bottle", price: 15.0, emoji: "🥤" },
  { _id: "stickers", name: "Sticker Pack", price: 4.99, emoji: "🏷️", tag: "New" },
  { _id: "lanyard", name: "Lanyard", price: 6.0, emoji: "🪪" },
];
