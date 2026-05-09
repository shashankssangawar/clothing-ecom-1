import { useState, useEffect } from "react";
import { getDbInstance } from "@/lib/db";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const db = await getDbInstance();
      const p = await db.getAll("products");
      const c = await db.getAll("categories");
      setProducts(p);
      setCategories(c);
      
      // Simulate API delay for polish
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
    fetchAll();
  }, []);

  return { products, categories, loading };
}
