import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../../types";
import HomeBackButton from "../../button/HomeBackButton";
import Breadcrumb from "./Breadcrumb";
import ProductDetailsPage from "./ProductDetailsPage";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

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

  if (loading) return <p className="text-center py-10">Loading...</p>;
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
    <div className="pb-20">
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

      <div className="max-w-[1470px] mx-auto px-6 py-4 pb-10">
        <div className="flex gap-6">
           {/* Left side - Main Image + small image + text */}
          <div className="w-[400px] h-[500px]">
            <div className="relative w-[400px] h-[400px] overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}>
                <img
                  src={`https://shop.sprwforge.com/uploads/${product.image}`}
                  alt={product.title}
                  className="w-[400px] cursor-pointer"
                />

                 {/* Lens Box (effect) */}
                {isZooming && (
                  <div
                    className="absolute border border-gray-400 bg-black/30"
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

             {/* Small thumbnail */}
            <div className="flex items-center justify-center gap-2 py-5">
              <img
                src={`https://shop.sprwforge.com/uploads/${product.image}`}
                alt="thumbnail"
                className="w-[60px] h-[60px] object-cover border border-[#470096] shadow-[0_0_8px_2px_rgba(71,0,150,0.3)] rounded-xl cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-center">
               {/* Click image text under image */}
              {!isZooming ? (
                <p className="text-[16.5px] text-[#112211] font-medium">Roll over image to zoom in</p>
                ) : (
                  <p className="text-[16.5px] text-[#112211] font-medium">Click image for extended view</p>
                )}
            </div>

            <div className="mt-10 relative">
               {/* Collapsed Title with gradient */}
              {!isExpanded && (
                <p className="text-[16.5px] font-medium relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[50px] after:content-[''] after:bg-gradient-to-t after:from-white after:to-transparent ellipsis-para">
                  {product.title}
                </p>
              )}

               {/* Expanded Title without gradient */}
              {isExpanded && (
                <p className="text-[16.5px] font-medium text-[#112211]">
                  {product.title}
                </p>
              )}

               {/* Toggle Button */}
              <button
                className="my-4 text-[14px] text-[#111111] underline hover:no-underline"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            </div>
          </div>

          {/* Right Details */}
          <div className="flex relative">
            <div className="z-10 relative">
              <h1 className="text-[24px] text-[#111111] font-bold mb-3 border-b pb-4">
                {product.title}
              </h1>
              <p className="text-[#356842] text-[18.75px] font-bold mb-3">In Stock</p>
              <div className="text-sm text-gray-600 mb-8">
                <div className="grid grid-cols-2 gap-y-2">

                   {/* Brand */}
                  <span className="text-[15px] text-[#888888] py-2">Brand</span>
                  <span className="text-[#111111] text-[15px] underline py-2">
                    {product.brand?.name || "N/A"}
                  </span>

                   {/* Refund */}
                  <span className="text-[15px] text-[#888888]">Refund&</span>
                  <span className="text-[#111111]">Not refundable</span>

                   {/* Warranty */}
                  <span className="text-[15px] text-[#888888]">Warranty</span>
                  <span className="text-[#111111]">100% authentic</span>
                </div>
              </div>

              <p className="text-[#112211] text-[17px] font-medium">{product.title}</p>
            </div>

             {/* Right side - Zoom Preview */}
            {isZooming && (
              <div
                className="absolute top-0 left-0 w-[500px] h-[500px] border shadow-xl rounded-lg bg-no-repeat bg-cover z-20"
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
      </div>
    </div>
    <div className="pt-4">
      <ProductDetailsPage/>
    </div>
    </>
  );
}


