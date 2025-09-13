import { useState, useRef, useEffect } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
// import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import Search from "./comon/Search";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
 
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
  
  return (
    <div ref={dropdownRef} className="w-full">
      {/* Topbar */}
      <div className="border-b">
        <div className="flex flex-col sm:flex-row items-center justify-between mx-auto max-w-[1470px] px-4 py-1 gap-2 sm:gap-0">
          
          {/* Left: Language + Mail & Helpline */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Language Dropdown */}
            <div className="relative inline-block">
              <div
                onClick={toggleDropdown}
                className={`flex items-center gap-2 hover:bg-[#f6f4f4] cursor-pointer px-2 py-1.5 rounded-xl transition ${
                  isOpen ? "border border-[#470096]" : ""
                }`}
              >
                <span className="text-sm">English</span>
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>

              {isOpen && (
                <ul className="absolute w-40 bg-white border border-gray-200 rounded-md shadow-md mt-1 z-10">
                  <li className="p-2 bg-[#f6f6f7] hover:bg-gray-200 cursor-pointer rounded-t-md">
                    English
                  </li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-b-md">
                    Portuguese
                  </li>
                </ul>
              )}
            </div>

            {/* Mail */}
            <a
              href="mailto:webzedcontact@gmail.com"
              className="flex items-center gap-2 text-sm"
            >
              <TfiEmail />
              <span>
                <span className="hidden lg:inline-block mr-1">Mail</span>
                webzedcontact@gmail.com
              </span>
            </a>

            {/* Separator */}
            <span className="hidden sm:inline-block">|</span>

            {/* Helpline */}
            <a href="tel:4534345656" className="flex items-center gap-2 text-sm">
              <IoCallOutline />
              <span>
                <span className="hidden lg:inline-block mr-1">Helpline</span>
                4534345656
              </span>
            </a>
          </div>

          {/* Right: Login */}
          <div className="flex items-center gap-2 cursor-pointer text-sm mt-2 sm:mt-0">
            <BsArrowRightCircle className="text-[16px]" />
            <Link to="/login">LOGIN</Link>
          </div>

          {/* <div className="flex items-center gap-2 cursor-pointer">
            <FaRegUser className="" />
            <h1 className="">PROFILE</h1>
          </div> */}

        </div>
      </div>
       {/* Search */}
      <Search/>
    </div>
  );
}
