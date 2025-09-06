import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";
import type { Category, Product } from "../types";
// import PaginationInfo from "../components/comon/PaginationInfo";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    useEffect(() => {
    // Fetch products
    fetch("https://shop.sprwforge.com/api/v1/products?sortby=&shipping=&brand=&collection=&rating=0&max=0&min=0&q=&page=&all_categories=true&sidebar_data=true")
      .then(res => res.json())
      .then(json => {
        const prods: Product[] = json.data?.result?.data || [];
        setProducts(prods);
        setFiltered(prods);
      })
      .catch(console.error);

    fetch("https://shop.sprwforge.com/api/v1/products?sortby=&shipping=&brand=&collection=&rating=0&max=0&min=0&q=&page=&all_categories=true&sidebar_data=true")
      .then(res => {
         if (!res.ok) throw new Error("Network response was not ok");
         return res.json();
      })
      .then(json => {
        const cats: Category[] = json.data?.all_categories || [];
        setCategories(cats);
      })
      .catch(err => console.error("Failed to fetch categories:", err));

      }, []);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCategorySelect = (_id: number) => {
    // Now the API doesn't have category_id, so filtered = products
    // In the future, you can filter by category_id.
    setFiltered(products);
  };

  return (
    <div className="min-h-screen bg-[#F2F5F3]">
      {/* Top bar */}
      <div className="border-b">
        <div className="flex items-center justify-between mx-auto max-w-[1470px] px-4 py-2 gap-2 pt-11">
          <p className="text-[15px]">Showing 1 to {products.length} of 406 results</p>
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
    </div>
  )
}

export default Home

