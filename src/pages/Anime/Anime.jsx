// src/pages/Anime.jsx
import { useState, useEffect } from "react";
import { Sidebar } from "../../components/ui/Sidebar";
import Searchbar from "../../components/ui/Searchbar";
import { AnimeCard } from "./AnimeCard";
import axios from "axios";

export default function Anime() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/anime");
        setAnimeList(response.data);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, []);

  return (
    <div className="flex bg-gradient-to-r from-[#182c18] to-[#012903] min-h-screen text-white font-mincho">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-60 p-8">
        <Searchbar />
        {loading ? (
          <div className="text-center">Loading shows...</div>
        ) : (
          <div className="w-full max-w-[1280px] mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {animeList.map((item) => (
                <AnimeCard key={item._id} anime={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}