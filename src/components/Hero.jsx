
export default function Hero() {
  return (
    <section className="min-h-screen font-mincho text-white bg-[url('/bg3.png')] bg-cover bg-bottom relative">
      <div className="absolute inset-0 bg-black/30 opacity-60 z-0" />
      <div className="relative z-10 max-w-3xl text-center space-y-6">
        <div className="flex items-start justify-start pt-64 pl-28">
          <h1 className="sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight font-mincho">
            Reflect on what you learn.
          </h1>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight font-mincho">
          Kotonami
        </h1>
        <p className="text-lg md:text-xl text-zinc-300">
          Learn Japanese by watching real shows. Dual subtitles. Click any word to get instant meaning, hiragana, and JLPT level.
        </p>
      </div>
    </section>
  );
}
