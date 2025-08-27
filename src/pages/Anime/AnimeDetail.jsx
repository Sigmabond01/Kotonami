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
  if (!item) return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#334155] flex items-center justify-center">
      <div className="text-white text-center p-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Anime not found</h2>
        <Link 
          to="/anime" 
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Return to Anime List
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#334155] text-white font-mincho">
      <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <Navbar />
        </div>

        <Link
          to="/anime"
          className="
            flex w-full sm:w-auto items-center justify-center sm:justify-start gap-2 
            px-4 py-3 sm:px-5 sm:py-2.5 
            rounded-lg font-medium
            text-sm sm:text-base 
            text-blue-400 bg-blue-900/20 
            hover:bg-blue-700/30 hover:text-white 
            transition-all duration-300 mb-6 sm:mb-8
            group
          "
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Return to Animes
        </Link>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-start">
            <div className="w-full flex justify-center lg:block lg:w-auto flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.title} 
                className="
                  rounded-xl w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:w-[400px] 
                  object-cover shadow-2xl
                  transition-transform duration-300 hover:scale-105
                " 
              />
            </div>

            <div className="flex-1 w-full space-y-4 sm:space-y-6 text-center lg:text-left px-2 sm:px-0">
              <h1 className="
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                font-bold leading-tight
                break-words
              ">
                {item.title}
              </h1>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 pt-4 pb-4">
                <Link 
                  to={`/watch/${item.slug}`} 
                  className="
                    w-full sm:w-auto
                    bg-blue-700 text-white 
                    px-6 py-3 sm:px-8 sm:py-4 
                    rounded-lg hover:bg-blue-600 
                    transition-all duration-300 hover:scale-105
                    font-bold text-base sm:text-lg
                    shadow-lg hover:shadow-xl
                  "
                >
                  Watch Now
                </Link>
                <Link 
                  to='/' 
                  className="
                    w-full sm:w-auto
                    bg-slate-700 text-white 
                    px-6 py-3 sm:px-8 sm:py-4 
                    rounded-lg hover:bg-slate-600 
                    transition-all duration-300 hover:scale-105
                    font-bold text-base sm:text-lg
                    shadow-lg hover:shadow-xl
                  "
                >
                  Back to Home
                </Link>
              </div>

              <div className="max-w-none lg:max-w-2xl">
                <p className="
                  text-white/90 leading-relaxed 
                  text-sm sm:text-base lg:text-lg
                  text-justify sm:text-center lg:text-left
                ">
                  {item.description}
                </p>
              </div>

              <div className="
                flex flex-col sm:flex-row flex-wrap 
                justify-center lg:justify-start 
                gap-2 sm:gap-3 
                text-xs sm:text-sm 
                text-white/80 pt-4
              ">
                <span className="
                  bg-blue-900/50 backdrop-blur-sm
                  px-4 py-2 rounded-full
                  border border-blue-700/30
                  transition-colors hover:bg-blue-800/60
                ">
                  Level: {item.level}
                </span>
                <span className="
                  bg-blue-900/50 backdrop-blur-sm
                  px-4 py-2 rounded-full
                  border border-blue-700/30
                  transition-colors hover:bg-blue-800/60
                  break-all sm:break-normal
                ">
                  Subs: {item.subtitles.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 lg:mt-20">
        <Footer />
      </div>
    </div>
  );
}
