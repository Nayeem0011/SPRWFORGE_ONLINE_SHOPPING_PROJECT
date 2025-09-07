import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";
import type { Category, Product } from "../types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home = () => {
  // Dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  
  // Save page whenever it changes
  useEffect(() => {
    localStorage.setItem("currentPage", page.toString());
  }, [page]);

  // Click outside dropdown
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

    if (loading) return <p className="text-center py-10">Loading...</p>;

  // Category filter
  const handleCategorySelect = (id: number) => {
    const filteredProducts = products.filter(p => p.category_id === id);
    setFiltered(filteredProducts);
  };

  return (
    <div className="min-h-screen bg-[#F2F5F3]">
      {/* Top bar */}
      <div className="border-b">
        <div className="flex items-center justify-between mx-auto max-w-[1470px] px-4 py-2 gap-2 pt-11">
          {/* <p className="text-[15px]">Showing 1 to {products.length} of 406 results</p> */}
          <p className="text-[15px]">
            Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, 406)} of 406 results
          </p>
          <div>
            <span className="pr-3 text-[13.5px]">Sort by</span>
            <div ref={dropdownRef} className="relative inline-block">
              <div
                onClick={toggleDropdown}
                className={`flex items-center gap-2 bg-[#e9e9e8] hover:bg-[#F6F4F4] cursor-pointer px-4 py-[9px] rounded-xl transition border ${
                  isOpen ? "border-[#470096]" : "border-gray-300"
                }`}
              >
                <span>Featured</span>
                  {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>

              {isOpen && (
                <ul className="absolute right-0 w-40 bg-white border border-gray-200 rounded-md shadow-md mt-1 z-10">
                  <li className="p-2 bg-[#f6f6f7] hover:bg-gray-200 cursor-pointer rounded-t-md">
                    Featured
                  </li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">
                    Price low to high
                  </li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">
                    Price high to low
                  </li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-b-md">
                    Avg. customer review
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

       {/* Main content */}
      <div className="flex max-w-[1470px] mx-auto px-4 gap-5 pt-4 pb-4">
         {/* Sidebar */}
        <aside className="lg:w-64 md:w-[220px] flex-shrink-0">
          <div className="sticky top-28">
            <Sidebar categories={categories} onCategorySelect={handleCategorySelect} />
          </div>
        </aside>

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
