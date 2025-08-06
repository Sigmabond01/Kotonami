import { Link } from "react-router-dom";

export function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.slug}`}>
      <div className="bg-white/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full cursor-pointer group">
        <div className="relative">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full h-[320px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg text-white truncate font-semibold group-hover:text-green-300 transition-colors">
            {anime.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-green-800/80 rounded-full w-fit text-white">
              {anime.level}
            </span>
            <p className="text-xs text-white/60">
              Subs: {anime.subtitles.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}