import { useEffect, useState } from "react";
import footerLogo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { GET_COMMON_API } from "../api/shopApi";

interface Category {
  id: number;
  title: string;
  slug: string;
  in_footer_child: Category[];
}

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
       const res = await fetch(GET_COMMON_API());
        const result = await res.json();

        // categories is coming data.categories in between
        if (result.data && result.data.categories) {
          setCategories(result.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="py-5 pt-10 bg-white">
      <div className="max-w-[1140px] mx-auto container sm:px-[100px] md:px-16">
         {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-10 sm:ml-10 text-gray-700 gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="hover:underline transition text-[16.8px] text-[#444444] sm:py-[8px] lg:py-[10px] font-bold"
            >
              {cat.title}
            </a>
          ))}
        </div>

         {/* Logo below (same container) */}
        <div className="flex justify-center items-center mt-8 border-t pt-4 pb-0">
          <Link to="/">
            <img
              src={footerLogo}
              alt="Logo"
              className="w-[108.05px] h-[49.98px]"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
