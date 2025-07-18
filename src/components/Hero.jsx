import { Navbar } from "./ui/navbar";

export default function Hero() {
  return (
    <section className="min-h-screen font-mincho text-white bg-[url('/bg3.png')] bg-cover bg-bottom relative">
      <Navbar />
      <div className="absolute inset-0 bg-black/60 opacity-60 z-0" />
      <div className="relative z-10 max-w-5xl text-center space-y-4 ">
        <div className="flex items-start justify-start pt-72 pl-28">
          <h1 className="sm:text-5xl md:text-7xl font-bold font-mincho">
            Reflect on what you learn.
          </h1>
        </div>
        <div className="max-w-3xl pl-60 font-semibold">
        <p className="text-lg md:text-xl text-zinc-300">
          Learn Japanese by watching real shows. Dual subtitles. Click any word to get instant meaning, hiragana, and JLPT level.
        </p>
        </div>
      </div>
    </section>
  );
}
