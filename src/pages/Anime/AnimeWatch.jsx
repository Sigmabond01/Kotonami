import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";
import EpisodeList from "../../components/EpisodeList";
import AnimeInfoSidebar from "../../components/AnimeInfoSidebar";
import InteractiveSubtitle from "../../components/InteractiveSubtitle";

export default function AnimeWatch() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeData = async () => {
      if (!slug) return;
      try {
        const response = await axios.get(`http://localhost:3001/api/anime/${slug}`);
        setItem(response.data);
        if (response.data.episodes && response.data.episodes.length > 0) {
          setSelectedEpisode(response.data.episodes[0]);
        }
      } catch (error) {
        console.error("Failed to fetch anime data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeData();
  }, [slug]);

  const { 
    videoContainerRef, 
    activeJapaneseSubtitle, 
    activeEnglishSubtitle, 
    currentVideoTime, 
    subtitleOffset, 
    adjustSubtitleOffset 
  } = useVideoSubtitles(selectedEpisode ? selectedEpisode.embedUrl : null);
  
  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!item) return <div className="text-white p-10">Anime not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#182c18] to-[#012903] text-white font-mincho p-4 lg:p-6">
      <main className="w-full mx-auto flex flex-col lg:flex-row gap-6">
        
        <EpisodeList 
          episodes={item.episodes} 
          currentEpisode={selectedEpisode} 
          onSelectEpisode={setSelectedEpisode} 
        />

        <div key={selectedEpisode ? selectedEpisode.embedUrl : 'no-episode'} className="flex-1 space-y-4">
          <div ref={videoContainerRef} className="relative pt-[56.25%] w-full overflow-hidden rounded-xl shadow-lg bg-black">
            <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
          </div>
          
          <div className="space-y-2">
            <div className="text-center min-h-[3rem] flex items-center justify-center">
              <InteractiveSubtitle text={activeJapaneseSubtitle?.text} />
            </div>
            <div className="text-center text-lg text-white/70 min-h-[2.5rem] flex items-center justify-center">
              <span className={`transition-opacity duration-300 ${
                activeEnglishSubtitle?.text ? 'opacity-100' : 'opacity-40'
              }`}>
                {activeEnglishSubtitle?.text || ''}
              </span>
            </div>
          </div>
        </div>

        <AnimeInfoSidebar anime={item} />

      </main>
    </div>
  );
}