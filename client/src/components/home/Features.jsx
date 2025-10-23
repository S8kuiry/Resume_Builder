import React from "react";
import "@fontsource/poppins";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

export const Features = () => {
  // feature data for cleaner mapping
  const features = [
    {
      title: "Real-Time Analytics",
      desc: "Get instant insights into your operations with live dashboards.",
      color: "violet",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
        >
          <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
          <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Secure Platform",
      desc: "End-to-end encryption and GDPR-compliant safety.",
      color: "green",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
        >
          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
        </svg>
      ),
    },
    {
      title: "Customizable Reports",
      desc: "Export beautiful, audit-ready reports in one click.",
      color: "orange",
      icon: (
        <svg
          className="size-6"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 15V3" />
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m7 10 5 5 5-5" />
        </svg>
      ),
    },
  ];

  return (
    <div id="features" className="scroll-mt-8 font-[Poppins]">
      {/* Header */}
      <div className="w-full pt-20 flex flex-col items-center gap-3 justify-center bg-[rgba(240,253,244,0.4)]">
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer mb-4 border border-green-600 flex gap-2 text-sm items-center justify-center rounded-[50px] h-10 bg-green-100/70 px-7"
        >
          <Zap className="text-green-700 w-5" />
          <p className="text-green-700">Simple Process</p>
        </motion.button>

        <h1 className="text-5xl text-slate-700 font-semibold my-2 text-center">
          Build Your Resume
        </h1>
        <p className="text-gray-500 text-center text-lg">
          Our streamlined process helps you create a professional resume in
          minutes with intelligent <br /> AI-powered tools and features.
        </p>
      </div>

      {/* Features Section */}
      <section className="w-full py-10 bg-[rgba(240,253,244,0.4)] flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-10">
        {/* Left image */}
        <motion.img
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl w-full xl:-ml-32 rounded-2xl"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="Feature Illustration"
        />

        {/* Right Cards */}
        <div className="space-y-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`h-34 flex items-center justify-center gap-6 max-w-md cursor-pointer p-6 rounded-lg border transition-all shadow-sm hover:shadow-md
                ${
                  f.color === "violet"
                    ? "bg-violet-50 border-violet-400 hover:border-violet-600"
                    : f.color === "green"
                    ? "bg-green-50 border-green-200 hover:border-green-600"
                    : "bg-orange-50 border-orange-200 hover:border-orange-600"
                }`}
            >
              <div
                className={`${
                  f.color === "violet"
                    ? "text-violet-600"
                    : f.color === "green"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {f.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-800">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
