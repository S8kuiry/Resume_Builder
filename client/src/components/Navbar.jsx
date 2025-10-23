import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { AppContext } from "../context/AppContext";
import { SunDim, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { bgCol, setBgCol ,user,setToken,setUser} = useContext(AppContext);

  const toggle = () => setBgCol(!bgCol);

  const navigate = useNavigate()

  const handlelogout = ()=>{
    try {
      const res = window.confirm("Do you want to Logout?")
      if(!res)return;
      
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    setToken(null);                   // clear token from context
    setUser(null);
      navigate('/')
      
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <nav className="z-30 h-[65px] w-full px-6 md:px-16 lg:px-20 xl:px-30 flex items-center justify-between z-30 bg-gradient-to-r from-green-700 via-green-500 to-green-700 shadow-lg transition-all duration-300">
      {/* Left: Logo + SVG */}
      <div className=" flex items-center gap-3">
        <Link to={'/'}><img src={logo} alt="Logo" className="active:scale-96 hover:scale-104 h-8 w-auto cursor-pointer transition-all duration-300" /></Link>
        <svg
        onClick={()=>navigate('/')}
        className="active:scale-96 hover:scale-104 cursor-pointer transition-all duration-300"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Right: Desktop Menu */}
      <div className="flex items-center gap-5">
        {/* Greeting */}
        <p className="text-white text-sm font-regular hidden sm:inline">Welcome , {user.name||"John Doe"}  </p>

        {/* Logout Button */}
        <button
        onClick={handlelogout}
          type="button"
          className="cursor-pointer bg-white text-green-700 md:inline hidden text-sm font-semibold hover:opacity-90 active:scale-95 transition-all w-32 h-10 rounded-full shadow-md"
        >
          Logout
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggle}
          className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
            bgCol ? "bg-gray-300" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-[2px] left-[3px] w-5 h-5 flex items-center justify-center bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              bgCol ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {bgCol ? (
              <SunDim className="w-4 h-4 text-yellow-900" />
            ) : (
              <Moon className="w-4 h-4 text-gray-700" />
            )}
          </span>
        </button>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="menu-btn"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-block md:hidden active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 30 30"
            fill="#fff"
          >
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className=" absolute top-[65px] left-0 w-full bg-gradient-to-r from-green-700 via-green-500 to-green-700  py-6 flex flex-col items-center justify-center gap-4 md:hidden shadow-lg transition-all duration-300 animate-fadeIn">

          
          

          {/* Divider */}
          <div className="w-[80%] h-[1px] bg-white/30 "></div>

          {/* Logout Button */}
          <button
          onClick={handlelogout}
            type="button"
            className="w-[80%] bg-white text-green-700 font-semibold text-base py-2 rounded-lg shadow-md hover:bg-green-50 hover:scale-95 active:scale-90 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
