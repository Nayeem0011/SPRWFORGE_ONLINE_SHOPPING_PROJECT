import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../../types";
import HomeBackButton from "../../button/HomeBackButton";
import Breadcrumb from "./Breadcrumb";
import ProductDetailsPage from "./ProductDetailsPage";
import { MdClose } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  // Zoom state
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const lensSize = 200; // lens box size
  const zoomLevel = 2; // zoom level

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://shop.sprwforge.com/api/v1/product/${id}?id=${id}&user_id=`);
        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p className="flex items-center justify-center pt-20">
    <div className="w-16 h-16 border-4 border-t-[#470096] border-gray-300 rounded-full animate-spin">
    </div>
  </p>;
  if (!product) return <p className="text-center py-10">Product not found</p>;

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    let x = e.pageX - left - lensSize / 2;
    let y = e.pageY - top - lensSize / 2;

    // Prevent lens from going outside
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > width - lensSize) x = width - lensSize;
    if (y > height - lensSize) y = height - lensSize;

    setLensPos({ x, y });
  };

  return (
    <>
    <div className="">
       {/* Top Bar - Full Width */}
      <div className="w-full bg-[#f1f2f3] mt-10">
        <div className="max-w-[1470px] mx-auto flex items-center justify-between px-6 ">
          <Breadcrumb product={product} />
        </div>
      </div>

       {/* Main Section: Image (left) + Details (right) */}
      <div className="max-w-[1470px] mx-auto flex items-center justify-between px-6 pt-4">
        <h1 className="flex items-center gap-2 text-[16px] capitalize text-[#888888]">
          <HomeBackButton />
          {slug}
          <h2 className="text-[15px]  text-[#888888]">
            {product.title}
          </h2>
        </h1>
      </div>

      <div className="max-w-[1470px] mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
        <div className="flex flex-col lg:flex-row gap-6">

           {/* Left side - Main Image + small image + text */}
          <div className="w-full lg:w-[400px]">
            <div
              className="relative w-full max-w-[400px] h-[350px] sm:h-[400px] mx-auto overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
            >
              <img
                src={`https://shop.sprwforge.com/uploads/${product.image}`}
                alt={product.title}
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => setOpenCart(true)}
              />

               {/* Lens Box */}
              {isZooming && window.innerWidth > 900 && (
                <div
                  className="hidden lg:block  absolute border border-gray-400 bg-black/30"
                  style={{
                    width: `${lensSize}px`,
                    height: `${lensSize}px`,
                    left: `${lensPos.x}px`,
                    top: `${lensPos.y}px`,
                    pointerEvents: "none",
                  }}
               />
              )}
          </div>

           {/* Image Cart */}
          {openCart && window.innerWidth > 900 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
              {/* Background overlay */}
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setOpenCart(false)}
              />

               {/* Modal container */}
              <div className="relative z-50 max-w-[1470px] mx-auto flex flex-col md:flex-row w-full h-[90vh] md:h-[800px] rounded-lg bg-white shadow-lg overflow-hidden">
                 {/* Left side - Product Image */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white relative">
                  <img
                    src={`https://shop.sprwforge.com/uploads/${product.image}`}
                    alt={product.title}
                    className="max-h-[350px] sm:max-h-[450px] object-contain"
                  />

                   {/* Left button */}
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 shadow-md p-2.5 rounded-full z-10">
                    <span className="text-white">
                      <FaChevronLeft />
                    </span>
                  </button>
                </div>

                 {/* Right side - Product Info */}
                <div className="w-full md:w-[300px] bg-[#f1f2f1] border p-6 relative flex flex-col">
                   {/* Close button */}
                  <button
                    onClick={() => setOpenCart(false)}
                    className="absolute text-[18px] py-1 px-1 rounded-full border border-[#470096] hover:bg-[#FFFFFF] right-4 top-4 text-gray-600 "
                  >
                    <MdClose />
                  </button>

                  <h2 className="text-lg font-semibold mb-6 mt-6">
                    {product.title}
                  </h2>

                   {/* Small image preview */}
                  <div className="rounded-lg p-1 w-20">
                    <img
                      src={`https://shop.sprwforge.com/uploads/${product.image}`}
                      alt={product.title}
                      className="rounded-lg border border-[#470096] shadow-lg"
                    />
                  </div>

                   {/* Right button */}
                  <button className="absolute left-[-20px] sm:left-[-40px] top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 shadow-md p-2.5 rounded-full z-10">
                    <span className="text-white">
                      <FaChevronRight />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

           {/* Small thumbnail */}
          <div className="flex items-center justify-center gap-2 py-5">
            <img
              src={`https://shop.sprwforge.com/uploads/${product.image}`}
              alt="thumbnail"
              className="w-[60px] h-[60px] object-cover border border-[#470096] shadow-[0_0_8px_2px_rgba(71,0,150,0.3)] rounded-xl cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-center">
            {!isZooming ? (
              <p className="text-[15px] sm:text-[16.5px] text-[#112211] font-medium">
                Roll over image to zoom in
              </p>
              ) : (
                <p className="text-[15px] sm:text-[16.5px] text-[#112211] font-medium">
                  Click image for extended view
                </p>
            )}
          </div>
        </div>

         {/* Right Details */}
        <div className="flex relative px-2 sm:px-4">
          <div className="z-10 relative">
            <h1 className="text-[20px] sm:text-[24px] text-[#111111] font-bold mb-3 border-b pb-3 sm:pb-4">
              {product.title}
            </h1>
            <p className="text-[#356842] text-[16px] sm:text-[18.75px] font-bold mb-3">
              In Stock
            </p>
            <div className="text-sm text-gray-600 mb-6 sm:mb-8">
              <div className="grid grid-cols-2 gap-y-2">
                 {/* Brand */}
                <span className="text-[14px] sm:text-[15px] text-[#888888] py-2">
                  Brand
                </span>
                <span className="text-[#111111] text-[14px] sm:text-[15px] underline py-2">
                  {product.brand?.name || "N/A"}
                </span>
                 {/* Refund */}
                <span className="text-[14px] sm:text-[15px] text-[#888888]">
                  Refund&
                </span>
                <span className="text-[#111111]">Not refundable</span>

                 {/* Warranty */}
                <span className="text-[14px] sm:text-[15px] text-[#888888]">
                  Warranty
                </span>
                <span className="text-[#111111]">100% authentic</span>
              </div>
            </div>
            <p className="hidden lg:block text-[#112211] text-[15px] sm:text-[17px] font-medium">
              {product.title}
            </p>
          </div>

           {/* Right side - Zoom Preview */}
          {isZooming && window.innerWidth > 900 && (
            <div
              className="hidden lg:block absolute top-0 left-0 w-[350px] sm:w-[400px] md:w-[500px] h-[350px] sm:h-[400px] md:h-[500px] border shadow-xl rounded-lg bg-no-repeat bg-cover z-20"
              style={{
                backgroundImage: `url(https://shop.sprwforge.com/uploads/${product.image})`,
                backgroundSize: `${400 * zoomLevel}px ${500 * zoomLevel}px`,
                backgroundPosition: `-${lensPos.x * zoomLevel}px -${
                lensPos.y * zoomLevel
                }px`,
              }}
            />
          )}
        </div>
      </div>

      <div className="mt-6 sm:mt-10 relative">
         {/* Collapsed Title */}
        {!isExpanded && (
          <p className="text-[15px] sm:text-[16.5px] font-medium relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[50px] after:content-[''] after:bg-gradient-to-t after:from-white after:to-transparent ellipsis-para">
            {product.title}
          </p>
        )}

         {/* Expanded Title */}
        {isExpanded && (
          <p className="text-[15px] sm:text-[16.5px] font-medium text-[#112211]">
            {product.title}
          </p>
        )}

         {/* Toggle Button */}
        <button
          className="my-3 sm:my-4 text-[13px] sm:text-[14px] text-[#111111] underline hover:no-underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      </div>
    </div>
    </div>
    <div className="max-w-[1470px] mx-auto pt-4">
      <ProductDetailsPage/>
    </div>
    </>
  );
}


