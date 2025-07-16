import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center font-mincho text-white bg-[url('/waves.svg')] bg-cover bg-bottom px-6">
      <div className="max-w-3xl text-center space-y-6">
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
