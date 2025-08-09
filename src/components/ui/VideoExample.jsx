import React from "react";

export function VideoExample() {
  return (
    <section
      className="font-mincho relative w-full text-white"
      aria-label="Kotonami demo"
    >
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        <h2 className="text-center text-5xl pt-2">See Kotonami in Action</h2>

        <p className="text-center text-lg max-w-3xl mx-auto">
          Watch Kotonami break down real Japanese subtitles into bite-sized,
          interactive learning — real context, real sentences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full">
            <video
              controls
              className="w-full block rounded-lg max-h-[60vh] object-contain"
              preload="metadata"
            >
              <source src="/videos/kotonami-demo.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="w-full flex justify-center">
            <img
              src="/saikileft.png"
              alt="Saiki left"
              className="w-full h-auto max-h-[60vh] object-contain"
              draggable={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full flex justify-center">
            <img
              src="/saikiright.png"
              alt="Saiki right"
              className="w-full h-auto max-h-[60vh] object-contain"
              draggable={false}
            />
          </div>
          <div className="w-full">
            <video
              controls
              className="w-full block rounded-lg max-h-[60vh] object-contain"
              preload="metadata"
            >
              <source src="/videos/kotonami-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* safety clear */}
        <div className="w-full" style={{clear: "both"}} />
      </div>
    </section>
  );
}
