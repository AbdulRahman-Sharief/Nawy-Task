"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ApartmentCard from "../components/ApartmentCard";
import { Apartment } from "../types/apartment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Extracted component using search params
function ApartmentsWithSearch() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = search
          ? `${API_URL}/api/v1/apartments?search=${encodeURIComponent(search)}`
          : `${API_URL}/api/v1/apartments`;

        const response = await fetch(url);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Server responded with ${response.status}: ${errorText}`
          );
        }

        const data = await response.json();
        setApartments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch apartments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [search]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams();
    if (value) params.set("search", value);
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by unit name, number, or project..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black"
          defaultValue={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              <p>No apartments found</p>
              <p className="text-sm mt-2">API URL: {API_URL}</p>
            </div>
          ) : (
            apartments.map((apartment) => (
              <ApartmentCard key={apartment._id} apartment={apartment} />
            ))
          )}
        </div>
      )}
    </>
  );
}

// This is your actual page component
export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<p>Loading apartments...</p>}>
        <ApartmentsWithSearch />
      </Suspense>
    </div>
  );
}
