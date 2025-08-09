import React from "react";
import Pattern from "./ui/Pattern";
import { VideoExample } from "./ui/VideoExample";

export function VideoExample2() {
  return (
    <div className="relative w-full">
      <div className="relative z-10">
        <VideoExample />
      </div>
    </div>
  );
};
