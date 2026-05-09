import { openDB } from "idb";

const DB_NAME = "lumen_ecommerce";
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("products")) {
        const productStore = db.createObjectStore("products", { keyPath: "id" });
        productStore.createIndex("category", "category");
      }
      if (!db.objectStoreNames.contains("categories")) {
        db.createObjectStore("categories", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("orders")) {
        db.createObjectStore("orders", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("coupons")) {
        db.createObjectStore("coupons", { keyPath: "code" });
      }
      if (!db.objectStoreNames.contains("banners")) {
        db.createObjectStore("banners", { keyPath: "id" });
      }
    },
  });
}

export async function getDbInstance() {
  return await initDB();
}
