import React from "react";
import { Github, Linkedin, Mail, MessageCircle, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-[5rem] bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-400 px-6 md:px-16 lg:px-24 xl:px-32 py-16 flex flex-wrap justify-center lg:justify-between gap-10 md:gap-20">
      {/* Left Section (Logo + Product Links) */}
      <div className="flex flex-wrap items-start gap-10 md:gap-20 xl:gap-[140px]">
        {/* Logo Placeholder */}
        <a href="/" className="hover:opacity-80 transition">
          <svg
            width="50"
            height="50"
            viewBox="0 0 31 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m8.75 5.3 6.75 3.884 6.75-3.885M8.75 28.58v-7.755L2 16.939m27 0-6.75 3.885v7.754M2.405 9.408 15.5 16.954l13.095-7.546M15.5 32V16.939M29 22.915V10.962a2.98 2.98 0 0 0-1.5-2.585L17 2.4a3.01 3.01 0 0 0-3 0L3.5 8.377A3 3 0 0 0 2 10.962v11.953A2.98 2.98 0 0 0 3.5 25.5L14 31.477a3.01 3.01 0 0 0 3 0L27.5 25.5a3 3 0 0 0 1.5-2.585"
              stroke="url(#a)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="a"
                x1="15.5"
                y1="2"
                x2="15.5"
                y2="32"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A7F3D0" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
        </a>

        {/* Links Sections */}
        <div>
          <p className="text-slate-100 font-semibold">Explore</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="/" className="hover:text-green-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-green-400 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-green-400 transition">
                Skills
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-green-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-slate-100 font-semibold">Resources</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="https://portfolio-git-main-subharthys-projects.vercel.app/" className="hover:text-green-400 transition">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#blogshttps://api.whatsapp.com/send/?phone=917980647151&text=Hi+Subharthy%2C+I+saw+your+portfolio%21&type=phone_number&app_absent=0" className="hover:text-green-400 transition">
                Whatsapp
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-green-400 transition">
                About Me
              </a>
            </li>
            <li>
              <a href="#resume" className="hover:text-green-400 transition">
                Resume
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-slate-100 font-semibold">Legal</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#privacy" className="hover:text-green-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-green-400 transition">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Section (Socials + Message) */}
      <div className="flex flex-col max-md:items-center max-md:text-center gap-4 items-end">
        <p className="max-w-72 text-gray-400 text-sm">
          Building digital experiences with code and creativity.
        </p>

        <div className="flex items-center gap-4 mt-3">
          <a
            href="https://github.com/S8kuiry"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/subharthy-kuiry-5b568927b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=917980647151&text=Hi+Subharthy%2C+I+saw+your+portfolio%21&type=phone_number&app_absent=0"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=subharthykuiry@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition"
          >
            <Mail className="w-6 h-6" />
          </a>
          <a
            href="https://portfolio-git-main-subharthys-projects.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition"
          >
            <Globe className="w-6 h-6" />
          </a>
        </div>

        <p className="mt-3 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
