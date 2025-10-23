import React, { useContext, useState } from "react";
import logo from '../../../public/logo.svg'
import { AppContext } from "../../context/AppContext";
import {FileVideoCameraIcon,  Moon, Pointer, SunIcon, VideotapeIcon, ViewIcon} from 'lucide-react'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {bgCol,setBgCol,user} = useContext(AppContext)
 const logos = [
        'https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/framer.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg',
    ]
  return (
<section className="w-full h-[100vh] flex flex-col items-center text-sm 
bg-[linear-gradient(to_bottom,rgba(187,247,208,0.3),rgba(240,253,244,0.4)),url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat">
   
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 text-slate-800 text-sm">
        <a href="/" className="">
          <img src={logo} className="w-35 " alt="Logo" />
        </a>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <a href="/" className="hover:text-slate-500 transition">
            Home
          </a>
          <a href="#features" className="hover:text-slate-500 transition">
            Features
          </a>
          <a href="#testimonials" className="hover:text-slate-500 transition">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-slate-500 transition">
            Contact
          </a>
        </div>

        {user?(
          <div className="hidden md:block  space-x-3">
             <Link to={`/app`}className="active:scale-96 px-6 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-md">
            Dashboard
          </Link>
        

          
        </div>

        ):(
          <div className="hidden md:block  space-x-3">
          <Link to='/login?state=register' className=" active:scale-96 px-6 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-md">
            Get started
          </Link>
          <Link to='/login?state=login' className="active:scale-96 hover:bg-green-100 transition px-6 py-2 border border-green-600 rounded-md">
            Login
          </Link>

          
        </div>

        )}

         

       

        <button
          onClick={() => setMenuOpen(true)}
          className="cursor-pointer md:hidden active:scale-90 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h16"/>
            <path d="M4 12h16"/>
            <path d="M4 19h16"/>
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="text-lg mt-2 fixed inset-0 z-[100] bg-white/60 text-slate-800 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300">
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
          <a className="text-teal-600" href="/login?state=login">Login</a>
          <button
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-green-100 hover:bg-green-200 transition text-black rounded-md flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
      )}

      <main className="flex flex-col items-center max-md:px-2">
        <a className="mt-32 flex items-center gap-2 border border-green-200 rounded-full p-1 pr-3 text-sm font-medium text-green-500 bg-green-200/20">
          <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            NEW
          </span>
          <p className="flex items-center gap-1">
            <span>Try AI Feature</span>
            <svg className="mt-1" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </a>

        <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[80px] font-semibold max-w-4xl text-slate-900 mt-6">
          Land your dream job with<br />
          <span className="bg-gradient-to-r from-green-800 to-green-400 bg-clip-text text-transparent font-bold">
            AI-powered
          </span> resumes.
        </h1>
        <p className="text-center text-base text-slate-700 max-w-lg mt-2">
          Our platform helps you create professional resumes fast using AI.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <Link to='/login?state=register' className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white active:scale-95 rounded-lg px-7 h-11">
            Get started
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link className="flex items-center justify-center gap-2 border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-lg px-8 h-11">
            <ViewIcon/> <p>Try Demo</p>
          </Link>

          
        </div>
         
      </main>
      <div className=" mt-10 w-full flex items-center justify-center "><p className="py-6 text-slate-400 mt-14">Trusting by leading brands, including</p></div>
       <div className="cursor-pointer flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4" id="logo-container">
                        {logos.map((logo, index) => <motion.img whileTap={{scale:0.96}} whileHover={{scale:1.04}} key={index} src={logo} alt="logo" className="cursor-pointer h-6 w-auto max-w-xs" />)}
                    </div>
      
    </section>
  );
};

export default HeroSection;
