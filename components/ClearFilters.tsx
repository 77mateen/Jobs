"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function ClearSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasFilters =
    searchParams.get("title") ||
    searchParams.get("type") ||
    searchParams.get("location");

  function handleClear() {
    router.push("/jobs");
  }

  if (!hasFilters) return null;

  return (
    <div
      className="flex items-center gap-2 hover:cursor-pointer"
      onClick={handleClear}
    >
      <RefreshCw size={20} />
      <p className="hidden sm:block">View all jobs</p>
    </div>
  );
}
