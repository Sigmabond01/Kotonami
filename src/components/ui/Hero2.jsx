import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";

export default function Hero2() {
  const navigate = useNavigate();

  return (
    <section className="font-mincho">
      <Navbar />
      <div className="relative flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex-1 max-w-7xl space-y-4">
          <div className="pt-40">
            <h1 className="sm:text-5xl md:text-7xl font-bold text-center">
              Immersion was <strong className="text-[#8aadc2]">NEVER</strong> this easy.
            </h1>
          </div>
          <div className="max-w-7xl text-center font-semibold">
            <p className="text-lg md:text-xl text-zinc-300">
              <strong> Kotonami</strong> shows you how Japanese is really spoken through videos with dual subtitles.
              Click any word to see its meaning, hiragana, and JLPT level instantly.
            </p>
          </div>
          <div className="space-x-12 flex justify-center items-center pt-8 pr-8">
            <button 
              onClick={() => navigate("/", { state: { scrollTo: "about" } })}
              className="px-8 py-3 bg-white/10 backdrop-blur-xl text-white border border-white/30 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore now
            </button>
            <button 
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-white/10 backdrop-blur-xl text-white border border-white/30 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get started
            </button>
          </div>
        </div>
        <div className="flex-1 flex ml-4 justify-end items-center mt-32">
          <div className="relative">
            <img
              src="/saikiblue.png"
              alt="Kotonami Character"
              className="max-w-full h-auto max-h-[80vh] drop-shadow-4xl opacity-70"
              style={{ filter: "brightness(0.75)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}