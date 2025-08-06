// src/pages/AnimeDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function AnimeDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      if (!slug) return;
      try {
        const response = await axios.get(`http://localhost:3001/api/anime/${slug}`);
        setItem(response.data);
      } catch (error) {
        console.error("Failed to fetch anime details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeDetail();
  }, [slug]);
  
  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!item) return <div className="text-white p-10">Anime not found.</div>;

  return (
    <div className="min-h-screen bg-[#121212] text-white p-10 font-mincho">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <img src={item.image} alt={item.title} className="rounded-xl w-full md:w-[400px] object-cover shadow-lg" />
        <div className="space-y-4 flex-1">
          <h1 className="text-4xl font-bold">{item.title}</h1>
          <p className="text-white/80 leading-relaxed">{item.description}</p>
          <div className="flex gap-4 text-sm text-white/60 pt-2">
            <span className="bg-green-900/50 px-3 py-1 rounded-full">Level: {item.level}</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full">Subs: {item.subtitles.join(", ")}</span>
          </div>
          <div className="pt-4">
            <Link to={`/watch/${item.slug}`} className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-bold text-lg">
               Watch Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}