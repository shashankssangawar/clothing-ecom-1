import OrderSuccessPageClient from "./components/page-client";

export default async function OrderSuccessPage({ searchParams }) {
  return (
    <OrderSuccessPageClient searchParams={searchParams} />
  );
}
