import ProductPageClient from "./components/page-client"

export default async function ProductDetailPage({ params }) {
  return (
    <ProductPageClient params={params} />
  )
}
