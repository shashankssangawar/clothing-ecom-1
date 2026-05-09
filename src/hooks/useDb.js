import { useState, useEffect } from "react";
import { getDbInstance } from "@/lib/db";
import { seedDb } from "@/lib/db/seed";

export function useDb() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      await seedDb();
      setIsReady(true);
    }
    init();
  }, []);

  return { isReady };
}

