import OrderSuccessPageClient from "./components/page-client";

export default async function OrderSuccessPage(props) {
  const searchParams = await props.searchParams;
  return (
    <OrderSuccessPageClient searchParams={searchParams} />
  );
}
