/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoSearchOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import navberLogo from "../../assets/logo.png";
import { useEffect, useRef, useState } from 'react';
import type { Product } from '../../types';
import CartIcon from '../../features/cart/CartIcon';
import { IMAGE_BASE_URL, SEARCH_PRODUCTS_API } from '../../api/shopApi';

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // loading state
 
  const dropdownRef = useRef<HTMLDivElement>(null); // ref for dropdown

  useEffect(() => {
    if (query.trim().length > 0) {
      setLoading(true); // earch start
      fetch(SEARCH_PRODUCTS_API(query))
        .then((res) => res.json())
        .then((data) => {
          const productList = data.data?.result?.data || [];
          const relatedCategories = productList.map((p: any) => p.category).filter(Boolean);

          setResults({
            categories: Array.from(new Set(relatedCategories)),
            products: productList,
          });

          setOpen(true);
          setLoading(false); // 🔹 search finished
        })
        .catch(() => {
          setResults(null);
          setOpen(false);
          setLoading(false);
        });
    } else {
      setResults(null);
      setOpen(false);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div>
      <div ref={dropdownRef} className="flex flex-col md:flex-row items-start md:items-center justify-between mx-auto max-w-[1470px] px-4 py-3 gap-4">
        <div className="w-full md:w-auto flex justify-start">
          <Link to="/">
            <img
              src={navberLogo}
              alt="Navbar Logo"
              className="w-[54.02px] h-[25px] object-contain md:w-[75.63px] md:h-[34.98px]"
            />
          </Link>
        </div>

        <div className="relative w-full md:w-[90%] lg:w-[1190px]">
          <div className="flex items-center h-[44px] bg-[#f2f3f5] border rounded-xl focus-within:ring-1 focus-within:ring-[#470096]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Here"
              className="flex-1 h-full px-4 text-sm bg-[#f2f3f5] border border-transparent rounded-l-xl focus:outline-none"
            />
            <button className="bg-[#470096] w-[50px] h-[44px] flex items-center justify-center text-white rounded-r-xl">
              <IoSearchOutline className="text-lg" />
            </button>
          </div>

          {open && (
            <div className="absolute top-[48px] left-0 w-full bg-white border rounded-md shadow-lg p-6 z-20 max-h-[500px] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="w-16 h-16 border-4 border-t-[#470096] border-gray-300 rounded-full animate-spin">
                  </div>
                  </div>
                  ) : results && results.products?.length === 0 ? (
                    <div className="text-[19px] pb-10 text-gray-600 font-semibold">
                      Nothing found for "<span className="text-[21px] text-[#470096] font-bold">{query}</span>"
                    </div>
                    ) : (
                      <>
                       {/* Suggested Search (optional) */}
                      {results.products?.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-gray-700 font-bold text-[20px] mb-3">
                            Suggested Search Keywords
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {results.products.slice(0, 1).map((p: Product) => (
                              <Link 
                              to={`/product/${p.id}`}
                              onClick={() => {
                              setOpen(false);   // dropdown close
                              setQuery("");     // search input clear
                              }}
                              >
                              <span
                                key={p.id}
                                className="px-3 py-1 text-[14px] bg-blue-100 border rounded-md cursor-pointer hover:bg-white"
                              >
                                {p.title}
                              </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Categories */}
                      {results?.categories?.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-gray-700 font-bold text-[20px] mb-3">Categories</h2>
                          <div className="flex items-center gap-6 flex-wrap">
                            {results.categories.map((cat: any, i: number) => (
                              <div key={i} className="flex flex-col items-center cursor-pointer">
                                <span className="text-xs">{cat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Products */}
                      {results?.products?.length > 0 && (
                        <div>
                          <h2 className="text-gray-700 font-bold text-[20px] mb-3">Products</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {results.products.map((p: Product) => (
                              <Link
                              key={p.id}
                              to={`/product/${p.id}`} 
                              className="flex items-center gap-2 border h-[80px] rounded p-1 cursor-pointer bg-gray-50"
                              onClick={() => {
                              setOpen(false);   // dropdown close
                              setQuery("");     // search input clear
                              }}
                              >
                                <img
                                  src={p.image?.startsWith("http") ? p.image :`${IMAGE_BASE_URL}${p.image}`}
                                  alt={p.title}
                                  className="w-[70px] h-[80px] object-contain flex-shrink-0"
                                />
                                <div className="flex-1 overflow-hidden">
                                  <h3 className="font-medium pb-1 truncate">{p.title}</h3>
                                  <h3 className="font-bold">€{p.selling}</h3>
                                </div>
                              </Link>
                            ))}   
                          </div>
                        </div>
                      )}
                    </>
                )}
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <CartIcon />
        </div>
      </div>
    </div>
  );
}

export default Search;




