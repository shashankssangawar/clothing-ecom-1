import ProductPageClient from "./components/page-client"

export default async function ProductDetailPage(props) {
  const params = await props.params;
  return (
    <ProductPageClient params={params} />
  )
}
