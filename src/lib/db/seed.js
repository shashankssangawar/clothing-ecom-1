import { getDbInstance } from "./index";

const initialCategories = [
  { id: "c1", name: "Men", slug: "men", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600" },
  { id: "c2", name: "Women", slug: "women", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600" },
  { id: "c3", name: "Formal", slug: "formal", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600" },
  { id: "c4", name: "Casual", slug: "casual", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600" },
];

const menImages = [
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=800",
];

const womenImages = [
  "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=800",
];

const formalImages = [
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800",
];

const casualImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800",
];

const adjectives = ["Midnight", "Classic", "Oversized", "Tailored", "Essential", "Minimalist", "Textured", "Heavyweight", "Vintage", "Structured", "Draped", "Asymmetric", "Urban", "Nomad", "Core"];
const nouns = ["Tee", "Jacket", "Coat", "Blazer", "Trousers", "Denim", "Knit", "Sweater", "Shirt", "Parka", "Bomber", "Hoodie", "Vest", "Cardigan", "Overcoat"];
const brands = ["LUMEN", "NOVA", "ESSENTIAL", "AURA", "ECHO"];
const colors = ["Black", "White", "Navy", "Camel", "Olive", "Charcoal", "Bone", "Slate"];

const generatedProducts = [];
let productId = 1;

function generateForCategory(categoryId, imagesPool, count) {
  for (let i = 0; i < count; i++) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const price = Math.floor(Math.random() * 80 + 20) * 100 - 1; // 1999 to 9999
    const originalPrice = Math.random() > 0.7 ? price + 1000 : null;
    
    // Pick two random images from the pool
    const img1 = imagesPool[Math.floor(Math.random() * imagesPool.length)];
    const img2 = imagesPool[Math.floor(Math.random() * imagesPool.length)];

    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];

    generatedProducts.push({
      id: `p${productId++}`,
      name: `${adj} ${noun}`,
      brand: brand,
      price: price,
      originalPrice: originalPrice,
      category: categoryId,
      images: [img1, img2],
      variants: [
        { id: `v${productId}_1`, size: "S", color: color1, stock: Math.floor(Math.random() * 20) },
        { id: `v${productId}_2`, size: "M", color: color1, stock: Math.floor(Math.random() * 25) },
        { id: `v${productId}_3`, size: "L", color: color1, stock: Math.floor(Math.random() * 15) },
        { id: `v${productId}_4`, size: "M", color: color2, stock: Math.floor(Math.random() * 10) }
      ],
      isFeatured: Math.random() > 0.85 // ~15% chance to be featured
    });
  }
}

// Generate 25 products for each category (Total: 100)
generateForCategory("c1", menImages, 25);
generateForCategory("c2", womenImages, 25);
generateForCategory("c3", formalImages, 25);
generateForCategory("c4", casualImages, 25);


const initialCoupons = [
  { code: "WELCOME25", type: "percentage", value: 25, minCartValue: 2000, maxDiscount: 1000, expiryDate: "2027-12-31", isActive: true },
  { code: "SAVE100", type: "flat", value: 100, minCartValue: 1000, maxDiscount: 100, expiryDate: "2027-12-31", isActive: true },
  { code: "FORMAL5", type: "percentage", value: 5, minCartValue: 0, maxDiscount: 500, expiryDate: "2027-12-31", isActive: true }
];

const initialBanners = [
  { id: "b1", title: "Summer Collection 2026", subtitle: "Light textures, bold silhouettes.", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600", isActive: true },
  { id: "b2", title: "Flat ₹100 OFF", subtitle: "Use code SAVE100 on your first order.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600", isActive: true }
];

export async function seedDb() {
  const db = await getDbInstance();
  
  const productCount = await db.count("products");
  
  // If we already have 100 or more products, don't re-seed
  if (productCount >= 100) {
    return;
  }
  
  // Clear existing if we are updating to the large dataset
  await db.clear("products");
  await db.clear("categories");
  await db.clear("coupons");
  await db.clear("banners");

  const tx = db.transaction(["categories", "products", "coupons", "banners"], "readwrite");
  
  for (const c of initialCategories) tx.objectStore("categories").put(c);
  for (const p of generatedProducts) tx.objectStore("products").put(p);
  for (const c of initialCoupons) tx.objectStore("coupons").put(c);
  for (const b of initialBanners) tx.objectStore("banners").put(b);

  await tx.done;
  console.log(`Database seeded successfully with ${generatedProducts.length} products.`);
}
