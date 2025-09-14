import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";
import type { Category, Product } from "../types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SidebarModal from "../components/comon/SidebarModal";

const Home = () => {

  // Sort Dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Products, categories, filtered products
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Pagination & loading
  const [loading, setLoading] = useState(true);

  // page state with localStorage
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 30; // How many products are viewed per page
  
  // Price Filter
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);

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

  // Save page to localStorage
  useEffect(() => {
    localStorage.setItem("currentPage", page.toString());
  }, [page]);

  // Click outside dropdown close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Products & categories fetch
  useEffect(() => {
    setLoading(true);

    // Products fetch
    fetch(`https://shop.sprwforge.com/api/v1/products?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data.result.data);
        setFiltered(data.data.result.data); // First will show all
        setTotalPages(data.data.result.last_page);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    // Categories fetch
    fetch("https://shop.sprwforge.com/api/v1/products?all_categories=true&sidebar_data=true")
      .then(res => res.json())
      .then(json => {
        const cats: Category[] = json.data?.all_categories || [];
        setCategories(cats);
      })
      .catch(err => console.error("Categories fetch failed:", err));
  }, [page]);

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

  const filteredProducts = products.filter(p => p.selling >= min && p.selling <= max);

    // Apply current category filter (if any)
    // If the category is already filtered, filter again with the filtered array.
    setFiltered(filteredProducts);
  };

  // Sort function
  const handleSort = (option: string) => {
    setSortBy(option);

    const sortedProducts = [...filtered];

    if (option === "Featured") {
      // Featured products first 
      sortedProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (option === "Price low to high") {
      sortedProducts.sort((a, b) => Number(a.selling) - Number(b.selling));
    } else if (option === "Price high to low") {
      sortedProducts.sort((a, b) => Number(b.selling) - Number(a.selling));
    } else if (option === "Avg. customer review") {
      sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFiltered(sortedProducts);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F2F5F3]">
      {/* Top bar */}
      <div className="border-b">
        <div className="flex items-center justify-between mx-auto max-w-[1470px] px-4 py-2 gap-2 pt-11">
          {/* <p className="text-[15px]">Showing 1 to {products.length} of 406 results</p> */}
          <p className="hidden md:inline-block text-[15px]">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, 406)} of 406 results
          </p>
          
          {/* Sort by dropdown */}
          <div>
            <span className="hidden md:inline-block pr-3 text-[13.5px]">Sort by</span>
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
                      onClick={() => handleSort(option)}
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
              Filters
              {openSidebar ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex max-w-[1470px] mx-auto px-4 gap-5 pt-4 pb-4">
        {/* Sidebar only on desktop */}
        {!isMobile && (
          <aside className="lg:w-64 md:w-[220px] flex-shrink-0">
            <div className="sticky top-28">
              <Sidebar
                categories={categories}
                onCategorySelect={handleCategorySelect}
                onPriceFilter={handlePriceFilter}
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

        {/* Products */}
        <main className="flex-1">
          <ProductGrid products={filtered} />
        </main>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mx-auto max-w-[1470px] p-6 mt-4">
        <div className="flex items-center border rounded-xl overflow-hidden">
           {/* Prev Button */}
          <button
            disabled={page === 1}
            onClick={() => setPage(prev => prev - 1)}
            className="w-9 h-9 border-r flex items-center hover:bg-blue-50 justify-center bg-white text-black disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>

           {/* Page Numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const startPage = Math.floor((page - 1) / 5) * 5 + 1;
            const pageNum = startPage + i;
            return pageNum <= totalPages ? (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`w-9 h-9 flex items-center justify-center ${
                  page === pageNum
                  ? "bg-[#470096] text-white font-bold"
                  : "bg-white border-r text-black hover:bg-blue-50"
                }`}
              >
                {pageNum}
              </button>
            ) : null;
          })}

           {/* Next Button */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(prev => prev + 1)}
            className="w-9 h-9 flex items-center justify-center hover:bg-blue-50 bg-white text-black disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home



