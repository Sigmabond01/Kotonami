import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Loader from "../../components/ui/Loader";
import { Navbar } from "../../components/ui/Navbar-top";
import { Footer } from "../../components/Footer";

export default function AnimeDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      if (!slug) return;

      const start = Date.now();
      try {
        const response = await axios.get(`https://kotonami-backend.onrender.com/api/anime/${slug}`);
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
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#334155] text-white p-4 sm:p-6 lg:p-10 font-mincho">
      <div className="flex justify-start mb-10 sm:mb-16 md:mb-28">
        <Navbar />
      </div>
      <Link to="/anime"
        className="group inline-flex items-center gap-2 py-3 text-blue-400 hover:text-blue-700 mb-4 sm:mb-6"
      >
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
        Return to Animes
      </Link>
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
        <img src={item.image} alt={item.title} className="rounded-xl w-full max-w-sm md:w-[400px] object-cover shadow-lg" />
        <div className="space-y-4 flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold">{item.title}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4 pb-4">
            <Link to={`/watch/${item.slug}`} className="inline-block bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-600 transition font-bold text-base sm:text-lg">
              Watch Now
            </Link>
            <Link to='/' className="inline-block bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-600 transition font-bold text-base sm:text-lg">
              Back to Home
            </Link>
          </div>
          <p className="text-white/80 leading-relaxed text-sm sm:text-base">{item.description}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs sm:text-sm text-white/60 pt-2">
            <span className="bg-blue-900/50 px-3 py-1 rounded-full">Level: {item.level}</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full">Subs: {item.subtitles.join(", ")}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
