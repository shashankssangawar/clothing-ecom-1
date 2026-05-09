import TrackingPageClient from "./components/page-client";

export default async function TrackOrderPage({ searchParams }) {
  return (
    <TrackingPageClient searchParams={searchParams} />
  );
}
