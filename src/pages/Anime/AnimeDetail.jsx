import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Logo from "../../components/ui/Logo";
import Loader from "../../components/ui/Loader";

export default function AnimeDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      if (!slug) return;

      const start = Date.now();
      try {
        const response = await axios.get(`http://localhost:3001/api/anime/${slug}`);
        const data = response.data;

        const elapsed = Date.now() - start;
        const minDuration = 1500;

        if (elapsed < minDuration) {
          setTimeout(() => {
            setItem(data);
            setLoading(false);
          }, minDuration - elapsed);
        } else {
          setItem(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch anime details:", error);
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [slug]);
  
  if (loading) return <Loader />;
  if (!item) return <div className="text-white p-10">Anime not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a]  to-[#334155] text-white p-10 font-mincho">
      <div className="flex justify-start py-0">
        <a href="https://x.com/Sigmabond01" target="_blank"><Logo /></a>
      </div>
      <Link to="/"
        className="group inline-flex p-52 items-center gap-2 py-0 text-blue-400 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
        Return to Homepage
      </Link>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <img src={item.image} alt={item.title} className="rounded-xl w-full md:w-[400px] object-cover shadow-lg" />
        <div className="space-y-4 flex-1">
          <h1 className="text-4xl font-bold">{item.title}</h1>
          <p className="text-white/80 leading-relaxed">{item.description}</p>
          <div className="flex gap-4 text-sm text-white/60 pt-2">
            <span className="bg-blue-900/50 px-3 py-1 rounded-full">Level: {item.level}</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full">Subs: {item.subtitles.join(", ")}</span>
          </div>
          <div className="pt-4 space-x-6">
            <Link to={`/watch/${item.slug}`} className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-bold text-lg">
              Watch Now
            </Link>
            <Link to='/anime' className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-bold text-lg">
              Back to anime
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
