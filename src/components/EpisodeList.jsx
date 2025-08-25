export default function EpisodeList({ episodes, currentEpisode, onSelectEpisode }) {
  return (
    <div className="w-full lg:w-96 bg-slate-900/40 rounded-2xl p-6 shadow-2xl flex-shrink-0 max-h-[calc(100vh-64px)] overflow-hidden overflow-y-auto border border-slate-700/50 custom-scrollbar">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300 tracking-wide">Episodes</h2>
      <ul className="space-y-3">
        {episodes.map((ep) => (
          <li
            key={ep.number}
            onClick={() => onSelectEpisode(ep)}
            className={`
              p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
              flex items-center gap-4 border border-transparent
              ${
                currentEpisode?.number === ep.number
                  ? "bg-blue-600/30 text-cyan-200 font-bold border-blue-600/40 shadow-lg transform scale-105"
                  : "bg-slate-800/60 hover:bg-slate-700/60 hover:border-blue-500/30 hover:shadow-lg"
              }
            `}
          >
            <span 
              className={`
                font-mono text-lg font-semibold w-10 text-center flex-shrink-0
                ${currentEpisode?.number === ep.number ? "text-cyan-400" : "text-slate-400"}
              `}
            >
              #{ep.number}
            </span>
            <span className="flex-1 truncate text-lg">
              {ep.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}