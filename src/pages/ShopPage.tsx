import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { Category, Product } from "../types";
import Sidebar from "../components/Sidebar";
import HomeBackButton from "../button/HomeBackButton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProductGrid from "../components/ProductGrid";
import ErrorPage from "../notfound/ErrorPage";
import SidebarModal from "../components/comon/SidebarModal";

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

  // Price Filter
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [filtered, setFiltered] = useState<Product[]>([]);

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

  // Mobile screen check
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 575);

  // SidebarModal open/close
  const [openSidebar, setOpenSidebar] = useState(isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 575;
      setIsMobile(mobile);
      setOpenSidebar(mobile); 
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  if (loading) return <p className="flex items-center justify-center pt-20">
    <div className="w-16 h-16 border-4 border-t-[#470096] border-gray-300 rounded-full animate-spin">
    </div>
  </p>;

  // Category filter
  const handleCategorySelect = (id: number) => {
    let filteredProducts = products.filter(p => p.category_id === id);
   
    // Apply current price filter too
    filteredProducts = filteredProducts.filter(p => p.selling >= minPrice && p.selling <= maxPrice);

    setFiltered(filteredProducts);
  };

  // Price filter
  const handlePriceFilter = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);

    const filteredProducts = products.filter(
      (p) => p.selling >= min && p.selling <= max
    );

    setFiltered(filteredProducts);
  };

  return (
    <div>
       {/* Top Bar - Full Width */}
      <div className="w-full bg-[#f1f2f3] mt-10">
        <div className="max-w-[1470px] mx-auto flex items-center justify-between px-6 py-2">
         
           {/* Left side: Showing results + Category */}
          <p className="hidden md:inline-block text-[15px]">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, products.length)} of {products.length} results
            slug && <span className="ml-2 font-bold text-[16px] text-black">"{slug}"</span>
          </p>

           {/* Sort by dropdown */}
          <div>
            <span className="hidden md:inline-block pr-3 text-[13.5px]">Sort by</span>
            <div ref={dropdownRef} className=" relative inline-block">
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

          {/* Filters only on mobile */}
          {isMobile && (
            <button
              onClick={() => setOpenSidebar(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-b from-[#f7f8fa] rounded-xl to-[#e7e9ec] border border-[#bbb] shadow-inner text-base h-[44px] leading-[42px] px-4 mb-1 
              transition-all duration-100 ease-in-out  no-underline hover:from-[#e7e9ec] hover:to-[#f7f8fa] hover:border-gray-400"
            >
              Filter
              {openSidebar ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-[1470px] mx-auto flex gap-6 p-6">
         {/* Sidebar only on desktop */}
        {!isMobile && (
          <aside className="lg:w-64 md:w-[220px] flex-shrink-0">
            <div className="sticky top-28">
              <Sidebar categories={categories} activeSlug={slug} onCategorySelect={function (): void {
                throw new Error("Function not implemented.");
              } } 
              />
            </div>
          </aside>
        )}

         {/* SidebarModal only on mobile */}
        {isMobile && openSidebar && (
          <SidebarModal
            categories={categories}
            onCategorySelect={handleCategorySelect}
            onPriceFilter={handlePriceFilter}
            onClose={() => setOpenSidebar(false)} 
          />
        )}

         {/* Products Section */}
        <div className="flex-1">
          <h1 className="flex items-center gap-2 text-[16px] mb-4 capitalize text-[#888888]">
            <HomeBackButton />
            {slug}
          </h1>

          {products.length === 0 ? (
            <p><ErrorPage/></p>
            ) : (
              <div className="pt-4">
                <ProductGrid products={filtered.length > 0 ? filtered : products}  />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}


