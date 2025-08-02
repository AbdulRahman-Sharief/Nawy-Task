// app/apartments/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Apartment } from "@/types/apartment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function ApartmentDetail() {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchApartment = async () => {
      if (!id) return;

      try {
        const response = await fetch(`${API_URL}/api/v1/apartments/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApartment(data);
      } catch (error) {
        console.error("Error fetching apartment:", error);
        setApartment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold">Apartment not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-black">
              {apartment.unitName}
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => router.push("/")}
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Back to Listings
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={apartment.images?.[0] || "/placeholder.jpg"}
              alt={apartment.unitName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className=" text-black text-2xl font-bold mb-4">
                  {apartment.unitName}
                </h2>
                <p className="text-gray-600 mb-4">{apartment.description}</p>
                <p className="text-3xl font-bold text-blue-600 mb-4">
                  ${apartment.price.toLocaleString()}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Info label="Unit Number" value={apartment.unitNumber} />
                  <Info label="Project" value={apartment.project} />
                  <Info label="Bedrooms" value={apartment.bedrooms} />
                  <Info label="Bathrooms" value={apartment.bathrooms} />
                  <Info label="Area" value={`${apartment.area} sqft`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold text-black">{value}</p>
    </div>
  );
}
