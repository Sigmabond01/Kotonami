import React from "react";
import Pattern from "./ui/Pattern";
import Hero2 from "./ui/Hero2";

export function Hero() {
  return (
    <div className="relative min-h-screen bg-black/50">
      <Pattern />
      <div className="absolute inset-0 z-10">
        <Hero2 />
      </div>
    </div>
  );
};