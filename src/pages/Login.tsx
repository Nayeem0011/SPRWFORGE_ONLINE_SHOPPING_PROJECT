import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi"
import loginLogo from "../assets/logo.png"
import { loginUser } from "../auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../auth/hooks";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#F2F3F5]">
      {/* Logo */}
      <div className="flex items-center justify-center py-10">
        <Link to="/">
          <img 
            src={loginLogo} 
            alt="Login Logo" 
            className="w-[118px] h-[55px]"
          />
        </Link>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-10"> 
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && <p className="text-red-500 mb-2">{error}</p>}
           
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

             {/* Forgot Password + Button Row */}
            <div className="flex items-center justify-between pt-2">
              <Link 
                to="/forgot-password"
                className="text-[15px] text-[#555555] underline hover:no-underline"
              >
                Forgot Password
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="w-[110px] bg-[#470096] text-[15px] text-white py-3 font-bold rounded-lg hover:bg-[#350074] transition"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login


