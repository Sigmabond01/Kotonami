import { Link } from "react-router-dom";


export function MovieCard({ movies }) {
  return (
    <Link to={`/movies/${movies.slug}`}>
  <div className="bg-white/5 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 w-full">
    <img
      src={movies.image}
      alt={movies.title}
      className="w-full h-[320px] object-cover"
    />
    <div className="p-4 flex flex-col gap-2">
      <h3 className="text-lg text-white truncate">{movies.title}</h3>
      <span className="text-xs px-2 py-1 bg-green-700 rounded-full w-fit text-white">
        {movies.level}
      </span>
      <p className="text-xs text-white/70">
        Subs: {movies.subtitles.join(", ")}
      </p>
    </div>
  </div>
</Link>
  );
}
