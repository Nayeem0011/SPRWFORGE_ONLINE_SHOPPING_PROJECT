import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { Category, Product } from "../types";
import Sidebar from "../components/Sidebar";
import HomeBackButton from "../button/HomeBackButton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProductGrid from "../components/ProductGrid";

export default function ShopPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination + Top Bar
  const [page] = useState(1);
  const itemsPerPage = 8;

  // Sort Dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fetch Categories (Sidebar)
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://shop.sprwforge.com/api/v1/category");
        const data = await res.json();
        setCategories(data.data?.result || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  // Fetch Products by Category Slug
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://shop.sprwforge.com/api/v1/all?category=${slug}&sortby=&shipping=&brand=&collection=&rating=0&max=0&min=0&page=&sidebar_data=false`
        );
        const data = await res.json();
        setProducts(data.data?.result?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProducts();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div>
       {/* Top Bar - Full Width */}
      <div className="w-full bg-[#f1f2f3] mt-10">
        <div className="max-w-[1470px] mx-auto flex items-center justify-between px-6 py-2">
         
           {/* Left side: Showing results + Category */}
          <p className="text-[15px]">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, products.length)} of {products.length} results
            slug && <span className="ml-2 font-bold text-[16px] text-black">"{slug}"</span>
          </p>

           {/* Sort by dropdown */}
          <div>
            <span className="pr-3 text-[13.5px]">Sort by</span>
            <div ref={dropdownRef} className="relative inline-block">
              <div
                onClick={toggleDropdown}
                className={`flex items-center gap-2 bg-[#e9e9e8] hover:bg-[#F6F4F4] cursor-pointer px-4 py-[9px] rounded-xl transition border ${
                 isOpen ? "border-[#470096]" : "border-gray-300"
                }`}
              >
                <span>{sortBy}</span>
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>

              {isOpen && (
                <ul className="absolute right-0 w-40 bg-white border border-gray-200 rounded-md shadow-md mt-1 z-10">
                  {["Featured", "Price low to high", "Price high to low", "Avg. customer review"].map((option, idx) => (
                    <li
                      key={idx}
                      className={`p-2 hover:bg-gray-200 cursor-pointer ${
                        idx === 0 ? "rounded-t-md" : idx === 3 ? "rounded-b-md" : ""
                      }`}

                      onClick={() => {
                        setSortBy(option);
                        setIsOpen(false);
                        // Optionally: reorder products here
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1470px] mx-auto flex gap-6 p-6">
         {/* Sidebar */}
        <Sidebar categories={categories} activeSlug={slug} onCategorySelect={function (): void {
          throw new Error("Function not implemented.");
        } } 
        />

         {/* Products Section */}
        <div className="flex-1">
          <h1 className="flex items-center gap-2 text-[16px] mb-4 capitalize text-[#888888]">
            <HomeBackButton />
            {slug}
          </h1>

          {products.length === 0 ? (
            <p>No products found.</p>
            ) : (
              <ProductGrid products={products} />
            )}
        </div>
      </div>
    </div>
  );
}

