import React from "react";
import Pattern from "./Pattern";
import { VideoExample } from "../VideoExample";

export function VideoExample2() {
  return (
    <div className="relative min-h-screen">
      <Pattern />
      <div className="absolute inset-0 z-10">
        <VideoExample />
      </div>
    </div>
  );
};