import { useParams } from "react-router-dom";
import { anime } from "./Animedata";
import { Link } from "react-router-dom";

export default function AnimeDetail() {
  const { slug } = useParams();
  const item = anime.find((a) => a.slug === slug);

  if (!item) {
    return <div className="text-white p-10">Anime not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-10 font-mincho">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={item.image}
          alt={item.title}
          className="rounded-xl w-full md:w-[400px] object-cover"
        />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{item.title}</h1>
          <p className="text-white/80">{item.description}</p>
          <div className="flex gap-4 text-sm text-white/60">
            <span>Level: {item.level}</span>
            <span>Subs: {item.subtitles.join(", ")}</span>
          </div>
          <Link
  to={`/anime/${item.slug}`}
  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
>
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Watch Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
