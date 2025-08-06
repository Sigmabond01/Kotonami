export default function EpisodeList({ episodes, currentEpisode, onSelectEpisode }) {
  return (
    <div className="w-full lg:w-80 bg-black/20 rounded-xl p-4 flex-shrink-0 max-h-[calc(100vh-80px)] overflow-y-auto border border-white/10">
      <h2 className="text-xl font-semibold mb-3">Episodes</h2>
      <ul className="space-y-2">
        {episodes.map((ep) => (
          <li
            key={ep.number}
            onClick={() => onSelectEpisode(ep)}
            className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center gap-4 ${
              currentEpisode?.number === ep.number
                ? "bg-green-600/80 text-white font-bold"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <span className="text-gray-400 font-mono text-lg w-8 text-center">{ep.number}</span>
            <span className="flex-1 truncate">{ep.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}