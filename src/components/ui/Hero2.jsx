import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";


export default function Hero2() {
  const navigate = useNavigate();

  return (
    <section className="font-mincho min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-8 max-w-5xl text-center pt-28 pr-6">
          <h1 className="sm:text-5xl md:text-8xl font-bold">
            Immersion was <strong class="neon-text">NEVER</strong> this easy.
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 font-semibold">
            <strong>Kotonami</strong> shows you how Japanese is really spoken through videos with dual subtitles.
            Click any word to see its meaning, hiragana, and JLPT level instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <button
              onClick={() => navigate("/", { state: { scrollTo: "about" } })}
              className="px-8 py-3 bg-white/10 backdrop-blur-xl text-white border border-white/30 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Explore now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-white/10 backdrop-blur-xl text-white border border-white/30 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
