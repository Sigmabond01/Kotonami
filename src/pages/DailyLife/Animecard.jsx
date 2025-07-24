import { Link } from "react-router-dom";

export function Animecard({ anime, onClick }) {
  return (
    <Link to={`/anime/${anime.slug}`}>
    <div
      className="bg-white/5 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 w-full cursor-pointer"
      onClick={() => onClick(anime)}
    >
      <img
        src={anime.image}
        alt={anime.title}
        className="w-full h-[320px] object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg text-white truncate">{anime.title}</h3>
        <span className="text-xs px-2 py-1 bg-green-700 rounded-full w-fit text-white">
          {anime.level}
        </span>
        <p className="text-xs text-white/70">
          Subs: {anime.subtitles.join(", ")}
        </p>
      </div>
    </div>
    </Link>
  );
}
