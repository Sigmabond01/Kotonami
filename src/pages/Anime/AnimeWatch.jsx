import { useParams } from "react-router-dom";
import { useState } from "react";
import { anime } from "./Animedata";

export default function AnimeWatch() {
  const { slug } = useParams();
  const item = anime.find((a) => a.slug === slug);

  // Guard: no matching anime
  if (!item) return <div className="text-white p-10">Anime not found.</div>;

  const [selectedEpisode, setSelectedEpisode] = useState(item.episodes?.[0] || null);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8 font-mincho">
        {/* --- Title --- */}
        <h1 className="text-3xl font-bold">{item.title}</h1>

        {/* --- Video Player --- */}
        {selectedEpisode && (
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={selectedEpisode.embedUrl}
              title={`Episode ${selectedEpisode.number}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
            <p className="text-sm text-white/60 mt-2 text-center">
              Episode {selectedEpisode.number}: {selectedEpisode.title}
            </p>
          </div>
        )}

        {/* --- Episode Buttons --- */}
        <div className="flex flex-wrap gap-3 justify-center">
          {item.episodes?.map((ep) => (
            <button
              key={ep.number}
              onClick={() => setSelectedEpisode(ep)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                selectedEpisode?.number === ep.number
                  ? "bg-green-600 border-green-700 text-white"
                  : "bg-white/10 border-white/20 text-white/80 hover:bg-green-800 hover:text-white"
              }`}
            >
              Ep {ep.number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
