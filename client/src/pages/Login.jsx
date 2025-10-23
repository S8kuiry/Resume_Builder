import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User2Icon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlState = query.get("state"); // ✅ fix: correct query param

  const [path, setPath] = useState(urlState || "login"); // ✅ "login" or "register"

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ When URL changes (like clicking Get Started or Login), sync state
  useEffect(() => {
    setPath(urlState || "login");
  }, [urlState]);


  // ------------------------- register and loginn handle logics---------------------
  const navigate = useNavigate()
  const { backendUrl, setToken ,setUser,user} = useContext(AppContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/users/login', { email, password })
      if(response.data.success){
        console.log(response.data)
        localStorage.setItem('token',response.data.token)
        setToken(response.data.token)
        toast.success(response.data.message)
        setUser(response.data.user)
        navigate('/app')
          
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }

  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/users/register', { name, email, password })
      console.log(response.data)
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        setEmail("")
        setName("")
        setPassword("")
        toast.success(response.data.message)
        console.log(response.data.user)
        // ✅ Switch to login mode
        setPath("login");
        toast.info("Account created! Please log in.");
      }


    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div
      className="pt-[10rem] min-h-screen flex items-start justify-center 
      bg-[linear-gradient(to_bottom,rgba(187,247,208,0.3),rgba(240,253,244,0.4)),url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] 
      bg-cover bg-center bg-no-repeat"
    >
      {/* Glassmorphism Login Card */}
      <div className="w-[23rem] max-w-md rounded-lg shadow-lg shadow-gray-400 bg-white/60 backdrop-blur-md flex flex-col items-center p-8 gap-6 border border-white/40">
        {/* Title */}
        <p className="text-3xl font-semibold text-gray-800">
          {path === "login" ? "Login" : "Sign Up"}
        </p>

        {/* Name Input */}
        {path !== "login" && (
          <div className="w-full relative">
            <User2Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="User Name"
              className="w-full pl-12 pr-4 py-3 bg-white/70 text-gray-800 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-gray-500"
            />
          </div>
        )}

        {/* Email Input */}
        <div className="w-full relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            className="w-full pl-12 pr-4 py-3 bg-white/70 text-gray-800 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-gray-500"
          />
        </div>

        {/* Password Input */}
        <div className="w-full relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 bg-white/70 text-gray-800 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-gray-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={path === "login" ? handleLogin : handleRegister}
          className="w-full py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-all active:scale-95 shadow-md"
        >
          {path === "login" ? "Login" : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center w-full gap-2">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>

        {/* Toggle */}
        <div className="text-sm text-gray-600">
          {path === "login" ? (
            <p>
              Don’t have an account?{" "}
              <Link
                to="?state=register"
                onClick={() => setPath("register")}
                className="text-green-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                to="?state=login"
                onClick={() => setPath("login")}
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
