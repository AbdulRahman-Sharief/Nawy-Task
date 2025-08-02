// app/layout.tsx
import "./globals.css"; // optional, if you use global CSS
import { ReactNode } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Apartment Listings
                </Link>
                <SearchBar />
                <Link
                  href="/apartments/new"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Add New Apartment
                </Link>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
