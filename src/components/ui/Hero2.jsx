import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";

export default function Hero2() {
  const navigate = useNavigate();

  return (
    <section className="font-mincho min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="space-y-8 mt-16 text-center w-full max-w-5xl px-2 sm:px-6 md:px-2 py-16">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold">
            Immersion was <strong className="neon-text">NEVER</strong> this easy.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-semibold">
            <strong>Kotonami</strong> shows you how Japanese is really spoken through videos with dual subtitles.
            Click any word to see its meaning, hiragana, and JLPT level instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-6 text-lg sm:text-xl">
            <button
              onClick={() => navigate("/anime")}
              className="px-8 py-3 sm:px-10 sm:py-4 bg-white/10 backdrop-blur-xl text-white border border-white/30 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Explore now
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 sm:px-10 sm:py-4 bg-white/10 backdrop-blur-xl text-white border border-white/30 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
