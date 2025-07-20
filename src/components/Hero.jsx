import { useNavigate } from "react-router-dom";
import { Navbar } from "./ui/navbar";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen font-mincho text-white bg-[url('/bg3.png')] bg-cover bg-bottom relative">
      <Navbar />
      <div className="absolute inset-0 bg-black/40 opacity-80 z-0" />
      <div className="relative z-10 max-w-4xl text-center space-y-4">
        <div className="flex items-start justify-start pt-60 pl-28">
          <h1 className="sm:text-5xl md:text-7xl font-bold font-mincho">
            Immersion was <strong className="text-green-400">NEVER</strong> this easy.
          </h1>
        </div>
        <div className="max-w-3xl pl-60 font-semibold">
          <p className="text-lg md:text-xl text-zinc-300">
            Learn Japanese by watching real shows. Dual subtitles. Click any word to get instant meaning, hiragana, and JLPT level.
          </p>
        </div>
        <div className="space-x-8 flex justify-center items-center pl-24 pt-10">
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
    </section>
  );
}
