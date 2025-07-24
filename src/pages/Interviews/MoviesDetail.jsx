import { useParams } from "react-router-dom";
import { movies } from "./Moviesdata";

export default function MoviesDetail() {
  const { slug } = useParams();
  const movie = movies.find((a) => a.slug === slug);

  if (!movies) {
    return <div className="text-white p-10">Anime not found.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-[#182c18] to-[#012903] min-h-screen text-white p-24 pr-96 font-mincho">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={movie.image}
          alt={movie.title}
          className="rounded-xl w-full md:w-[400px] object-cover"
        />
        <div className="space-y-8">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-white/80">{movie.description}</p>
          <div className="flex gap-4 text-sm text-white/60">
            <span>Level: {movie.level}</span>
            <span>Subs: {movie.subtitles.join(", ")}</span>
          </div>
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}
