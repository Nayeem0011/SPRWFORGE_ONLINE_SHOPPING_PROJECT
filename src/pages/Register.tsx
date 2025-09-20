import { TfiEmail } from "react-icons/tfi"
import registerLogo from "../assets/logo.png"
import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { registerUser } from "../auth/authSlice";
import { useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../auth/hooks";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <div>
      <div className="min-h-screen bg-[#F2F3F5]">
      {/* Logo */}
      <div className="flex items-center justify-center py-10">
        <Link to="/">
          <img 
            src={registerLogo} 
            alt="Login Logo" 
            className="w-[118px] h-[55px]"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-10"> 
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && <p className="text-red-500 mb-2 text-center text-[14px]">{error}</p>}
           
             {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <div className="relative">
                <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[18px]" />
                <input
                  type="name"
                  required
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:shadow-lg focus:ring-2 focus:ring-[#470096] focus:bg-gray-100 text-[13.5px]"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

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

             {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[22px]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:shadow-lg focus:ring-2 focus:ring-[#470096] focus:bg-gray-100 text-[13.5px]"
                  placeholder="Your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-[20px]" />
                    ) : (
                      <AiOutlineEye className="text-[20px]" />
                  )}
                </button>
             </div>
            </div>

            {/*Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirm password</label>
              <div className="relative">
                <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[22px]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:shadow-lg focus:ring-2 focus:ring-[#470096] focus:bg-gray-100 text-[13.5px]"
                  placeholder="Your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-[20px]" />
                    ) : (
                      <AiOutlineEye className="text-[20px]" />
                  )}
                </button>
             </div>
            </div>

             {/* Forgot Password + Button Row */}
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
                <Link to="/login" className="text-[#470096] font-bold underline hover:no-underline">
                  Sign In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register




