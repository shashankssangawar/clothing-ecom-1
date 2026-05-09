import TrackingPageClient from "./components/page-client";

export default async function TrackOrderPage(props) {
  const searchParams = await props.searchParams;
  return (
    <TrackingPageClient searchParams={searchParams} />
  );
}
