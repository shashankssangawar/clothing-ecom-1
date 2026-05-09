import ProductsPageClient from "./components/page-client";

export default async function ProductsPage({ searchParams }) {
  return (
    <ProductsPageClient searchParams={searchParams} />
  );
}
