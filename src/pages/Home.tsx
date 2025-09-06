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

    // Fetch categories
    fetch("https://shop.sprwforge.com/api/v1/common")
      .then(res => res.json())
      .then(json => {
        const cats: Category[] = json.data?.categories || [];
        setCategories(cats);
      })
      .catch(console.error);
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCategorySelect = (_id: number) => {
    // এখন API তে category_id নেই, তাই filtered = products
    // ভবিষ্যতে category_id এলে filter করতে পারবে
    setFiltered(products);
  };

  return (
    <div>
      <div className="min-h-screen bg-[#F2F5F3] ">
        <div className=" border-b">
          <div className="flex items-center justify-between mx-auto max-w-[1470px] px-4 py-2 gap-2 pt-11">
            <p className="text-[15px]">Showing 1 to {products.length} of 406 results</p>
            {/* <PaginationInfo/> */}
            <div>
              <span className="pr-3 text-[13.50px]">Sort by</span>
              <div ref={dropdownRef} className="relative inline-block">
                <div
                onClick={toggleDropdown}
                className={`flex items-center gap-2 bg-[#e9e9e8] hover:bg-[#F6F4F4] cursor-pointer px-4 py-[9px] rounded-xl transition border ${
                  isOpen ? "border-[#470096]" : "border-gray-300"
                  }`}>
                    <span>Featured</span>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>

                {isOpen && (
                  <ul className="absolute right-0 w-40 bg-white border border-gray-200 rounded-md shadow-md mt-1 z-10">
                    <li className="p-2 bg-[#f6f6f7] hover:bg-gray-200 cursor-pointer rounded-t-md">
                      Featured
                    </li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-b-md">
                      Price low to high
                    </li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-t-md">
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
         
         {/* Sidebar */}
        <div>
          <div>
            <aside className="flex items-center justify-between mx-auto max-w-[1470px] px-4 py-2 gap-2 pt-11">
              <div className="flex min-h-screen">
                <Sidebar categories={categories} onCategorySelect={handleCategorySelect} />
                <div className="flex-1 p-4">
                  <ProductGrid products={filtered} />
                </div>
              </div>
            </aside>
          </div>     
        </div>
      </div>
    </div>
  )
}

export default Home


