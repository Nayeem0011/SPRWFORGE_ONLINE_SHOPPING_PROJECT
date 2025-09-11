import { Link } from "react-router-dom";
import eroor_image from "../assets/error.png";

const ErrorPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 max-w-4xl w-full">
        {/* Left Side (Texts + Buttons) */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-[60px] md:text-[90px] text-[#333333] font-bold leading-tight">
            SORRY
          </h1>
          <h2 className="text-[22px] md:text-[30px] text-[#333333] mb-6">
            No item found.
          </h2>

          <h4 className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-center md:justify-start">
            <span className="text-[18px] text-[#333333] font-semibold">
              Try
            </span>
            <button
              onClick={() => window.location.reload()}
              className="text-[18px] md:text-[20px] text-[#333333] font-bold px-6 md:px-8 bg-gradient-to-b from-[#f7f8fa] to-[#e7e9ec] rounded-xl border border-[#bbb] shadow-inner h-[44px] leading-[42px] 
              transition-all duration-150 ease-in-out hover:from-[#e7e9ec] hover:to-[#f7f8fa] hover:border-gray-400"
            >
              Reload
            </button>
            <span className="text-[18px] text-[#333333] font-semibold">or</span>
            <Link to="/">
              <button className="text-[18px] md:text-[20px] text-[#470096] font-bold hover:underline">
                Go to homepage
              </button>
            </Link>
          </h4>
        </div>

        {/* Right Side (Image) */}
        <div className="flex-1 flex justify-center">
          <img
            src={eroor_image}
            alt="Error illustration"
            className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
