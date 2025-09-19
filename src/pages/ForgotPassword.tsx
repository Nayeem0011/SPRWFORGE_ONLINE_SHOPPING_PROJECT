import { TfiEmail } from "react-icons/tfi"
import forgotLogo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { useState } from "react";
import { forgotPassword } from "../auth/authSlice";
import { useAppDispatch, useAppSelector } from "../auth/hooks";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }))
      .unwrap()
      .then(() => setSuccess("Check your email for reset instructions"))
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#F2F3F5]">
      {/* Logo */}
      <div className="flex items-center justify-center py-10">
        <Link to="/">
          <img 
            src={forgotLogo} 
            alt="Login Logo" 
            className="w-[118px] h-[55px]"
          />
        </Link>
      </div>

      {/* Card */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-10"> 
          <form  onSubmit={handleSubmit} className="space-y-5">

            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}

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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Right Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-[210px] bg-[#470096] text-[15px] text-white py-[10px] font-bold rounded-lg hover:bg-[#350074] transition"
              >
                {loading ? "Loading..." : "Submit"}
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
