import ProductsPageClient from "./components/page-client";

export default async function ProductsPage(props) {
  const searchParams = await props.searchParams;
  return (
    <ProductsPageClient searchParams={searchParams} />
  );
}
