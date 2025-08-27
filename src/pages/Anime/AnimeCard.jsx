import { Link } from "react-router-dom";

export function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.slug}`}>
      <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl hover:shadow-blue-900/25 transition-all duration-300 hover:border-blue-600/40 group cursor-pointer flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-[180px] xs:h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-colors duration-300"/>
        </div>
        <div className="p-2 xs:p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2 md:gap-3 bg-gradient-to-b from-slate-800 to-slate-900">
          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-white truncate group-hover:text-blue-200 transition-colors duration-200">
            {anime.title}
          </h3>
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-3">
            <p className="text-[10px] xs:text-xs sm:text-sm text-blue-300/80 truncate">
              Subs: {anime.subtitles && anime.subtitles.length > 0 
                ? anime.subtitles.join(", ") 
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
