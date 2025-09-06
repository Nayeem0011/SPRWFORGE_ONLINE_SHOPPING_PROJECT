import { TfiEmail } from "react-icons/tfi"
import forgotLogo from "../assets/logo.png"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-[#F2F3F5]">
      {/* Logo */}
      <div className="flex items-center justify-center py-10">
        <img 
          src={forgotLogo} 
          alt="Login Logo" 
          className="w-[118px] h-[55px]"
        />
      </div>

      {/* Card */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-10"> 
          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <TfiEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[18px]" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:shadow-lg focus:ring-2 focus:ring-[#470096] focus:bg-gray-100 text-[13.5px]"
                  placeholder="Your email"
                />
              </div>
            </div>

            {/* Right Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-[210px] bg-[#470096] text-[15px] text-white py-[10px] font-bold rounded-lg hover:bg-[#350074] transition"
              >
                Submit
              </button>
            </div>

            {/* Bottom Center Link */}
            <div className="flex justify-center pb-2">
              <span className="text-[15px] text-[#111111]">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#470096] font-bold underline hover:no-underline">
                  Create an account
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
