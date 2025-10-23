"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const BoxesCore = ({ className, ...rest }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);

  // optional color palette (soft accent glow)
  const colors = [
    "rgba(147, 51, 234, 0.3)", // purple
    "rgba(59, 130, 246, 0.3)", // blue
    "rgba(16, 185, 129, 0.3)", // green
    "rgba(234, 179, 8, 0.3)",  // yellow
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform:
          "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)",
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="relative h-8 w-16 border-l border-slate-700/20"
        >
          {cols.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              className="relative h-8 w-16 border-t border-r border-slate-700/20"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.2"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 text-slate-400/40 blur-[1.5px] brightness-75"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
