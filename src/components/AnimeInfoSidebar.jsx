export default function AnimeInfoSidebar({ anime }) {
  if (!anime) return null;

  return (
    <div className="w-full lg:w-80 bg-black/20 rounded-xl p-4 flex-shrink-0 max-h-[calc(100vh-80px)] overflow-y-auto border border-white/10">
      <img src={anime.image} alt={anime.title} className="w-full rounded-lg mb-4" />
      <h2 className="text-2xl font-bold mb-2">{anime.title}</h2>
      <div className="flex gap-2 mb-4">
        <span className="text-xs px-2 py-1 bg-green-800/80 rounded-full">{anime.level}</span>
        <span className="text-xs px-2 py-1 bg-blue-800/80 rounded-full">Subs: {anime.subtitles.join(", ")}</span>
      </div>
      <p className="text-sm text-white/70 leading-relaxed">{anime.description}</p>
    </div>
  );
}