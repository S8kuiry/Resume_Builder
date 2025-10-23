"use client";
import React, { useContext } from "react";
import { Boxes } from "../components/ui/background-boxes";
import { AppContext } from "../context/AppContext";
import { twMerge } from "tailwind-merge";

export function BackgroundBoxesDemo() {
    const { bgCol } = useContext(AppContext); // ✅ move useContext here inside component

    return (
        <div className="absolute z-0 inset-0 w-full h-full overflow-hidden bg-transparent flex items-center justify-center">
            {/* Overlay for subtle tint */}
            <div
                className={`absolute inset-0 w-full h-full pointer-events-none transition-colors duration-500
        ${bgCol ? "bg-slate-800/20" : "bg-slate-100/70"}`}
            />

            {/* Blurred background grid */}
            <div className="absolute inset-0 scale-105 blur-[1px] flex items-center justify-start mt-[8rem] flex-col ">
                <Boxes />
                 
               
            </div>
        </div>
    );
}
