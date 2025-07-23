import { useParams } from "react-router-dom";
import { series } from "./Seriesdata";

export default function TVSeriesDetail() {
  const { slug } = useParams();
  const serie = series.find((a) => a.slug === slug);

  if (!serie) {
    return <div className="text-white p-10">Anime not found.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-[#182c18] to-[#012903] min-h-screen text-white p-24 pr-96 font-mincho">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={serie.image}
          alt={serie.title}
          className="rounded-xl w-full md:w-[400px] object-cover"
        />
        <div className="space-y-8">
          <h1 className="text-4xl font-bold">{serie.title}</h1>
          <p className="text-white/80">{serie.description}</p>
          <div className="flex gap-4 text-sm text-white/60">
            <span>Level: {serie.level}</span>
            <span>Subs: {serie.subtitles.join(", ")}</span>
          </div>
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}
