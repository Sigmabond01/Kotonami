// DailyLifeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Make sure you have axios installed: npm install axios
import { Sidebar } from "../../components/ui/Sidebar"; // Adjust path if needed

// Helper to extract YouTube Video ID from any YouTube URL
const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// --- YOUR VIDEO DATA ---
// !! IMPORTANT !! Ensure `embedUrl` uses a full YouTube video URL
const videos = {
  "buying-snacks-osaka": {
    title: "Buying Snacks in Osaka",
    embedUrl: "https://www.youtube.com/watch?v=UJyBgOdh9IA", // <--- USE A REAL YOUTUBE VIDEO URL HERE
    description: "Follow a native speaker as they explore snacks in an Osaka konbini. Listen to real-world phrases, accents, and context."
  },
  "buying-snacks-man": {
    title: "Buying Snacks in bus",
    embedUrl: "https://youtu.be/wbQgGx27AkQ?si=tuDBM99k6xbzz7hb", // <--- USE A REAL YOUTUBE VIDEO URL HERE
    description: "Follow a native speaker as they explore snacks in an Osaka konbini. Listen to real-world phrases, accents, and context."
  },
  // Add more video entries here
  // "another-video-slug": {
  //   title: "Another Japanese Video",
  //   embedUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  //   description: "..."
  // }
};

export default function DailyLifeDetail() {
  const { slug } = useParams();
  const video = videos[slug];

  // Derive YouTube video ID from the embedUrl for backend calls
  const youtubeVideoId = video ? getYouTubeVideoId(video.embedUrl) : null;

  // --- State for Subtitles ---
  const [japaneseSubtitles, setJapaneseSubtitles] = useState([]);
  const [englishSubtitles, setEnglishSubtitles] = useState([]);
  const [loadingSubtitles, setLoadingSubtitles] = useState(true);
  const [errorSubtitles, setErrorSubtitles] = useState(null);

  // --- State for Word Details Panel ---
  const [selectedWordData, setSelectedWordData] = useState(null); // Data for the clicked word(s)
  const [loadingWordData, setLoadingWordData] = useState(false);
  const [errorWordData, setErrorWordData] = useState(null);
  const [showWordDetailsPanel, setShowWordDetailsPanel] = useState(false); // Controls visibility of the panel

  // --- useEffect to fetch subtitles when component mounts or video changes ---
  useEffect(() => {
    const fetchSubtitles = async () => {
      if (!youtubeVideoId) {
        setErrorSubtitles("Video ID not found for this video. Cannot fetch subtitles.");
        setLoadingSubtitles(false);
        return;
      }

      setLoadingSubtitles(true);
      setErrorSubtitles(null);
      setJapaneseSubtitles([]);
      setEnglishSubtitles([]);
      setSelectedWordData(null); // Clear previous word data when video changes
      setShowWordDetailsPanel(false); // Hide panel

      try {
        // Fetch Japanese subtitles - ADD /api BACK IN
        const jpRes = await axios.get(`/api/subtitles/${youtubeVideoId}?lang=ja`);
        console.log("JP Subtitles Raw Data:", jpRes.data);
        console.log("Type of jpRes.data:", typeof jpRes.data);
        console.log("Is jpRes.data an array?", Array.isArray(jpRes.data));
        setJapaneseSubtitles(Array.isArray(jpRes.data) ? jpRes.data : []);
        console.log(`Fetched ${Array.isArray(jpRes.data) ? jpRes.data.length : 0} Japanese subtitle lines.`);

        // Fetch English subtitles - ADD /api BACK IN
        const enRes = await axios.get(`/api/subtitles/${youtubeVideoId}?lang=en`);
        console.log("EN Subtitles Raw Data:", enRes.data);
        console.log("Type of enRes.data:", typeof enRes.data);
        console.log("Is enRes.data an array?", Array.isArray(enRes.data));
        setEnglishSubtitles(Array.isArray(enRes.data) ? enRes.data : []);
        console.log(`Fetched ${Array.isArray(enRes.data) ? enRes.data.length : 0} English subtitle lines.`);

      } catch (err) {
        console.error("Error fetching subtitles:", err);
        setErrorSubtitles("Failed to load subtitles. Please check server logs and video ID.");
      } finally {
        setLoadingSubtitles(false);
      }
    };

    fetchSubtitles();
  }, [youtubeVideoId]); // Re-run effect when the YouTube video ID changes

  // --- Function to handle click on a Japanese subtitle line ---
  const handleJapaneseSubtitleClick = async (sentence) => {
    setLoadingWordData(true);
    setErrorWordData(null);
    setSelectedWordData(null); // Clear previous data
    setShowWordDetailsPanel(true); // Always show panel when a subtitle is clicked

    try {
      // This endpoint already has /api and is correctly proxied
      const response = await axios.post('/api/parse-japanese-text', { sentence });
      setSelectedWordData(response.data);
    } catch (err) {
      console.error("Error fetching word data:", err);
      setErrorWordData("Failed to get word breakdown. " + (err.response?.data?.details || err.message));
    } finally {
      setLoadingWordData(false);
    }
  };

  // --- If video not found ---
  if (!video) {
    return <div className="text-white p-10">Video not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#03240f] text-white font-mincho">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-60 px-6 py-10 flex flex-col lg:flex-row gap-6"> {/* Use lg:flex-row for larger screens */}
        {/* Left Column: Video and Subtitles */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
          <p className="text-sm text-gray-300 mb-6">{video.description}</p>

          <div className="relative pt-[56.25%] w-full overflow-hidden rounded-xl shadow-lg mb-6">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              // Use the YouTube embed URL with the extracted video ID
              src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&origin=${window.location.origin}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Subtitles Section */}
          <div className="bg-white/5 rounded-xl p-4 shadow-inner">
            <h2 className="text-xl font-semibold mb-3">Subtitles</h2>
            {loadingSubtitles && <p className="text-gray-400">Loading subtitles...</p>}
            {errorSubtitles && <p className="text-red-400">Error loading subtitles: {errorSubtitles}</p>}

            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              {/* Check if subtitles are loaded and valid before mapping */}
              {(!loadingSubtitles && !errorSubtitles && japaneseSubtitles.length === 0 && englishSubtitles.length === 0) && (
                <p className="text-gray-400">No subtitles available for this video (or failed to load).</p>
              )}

              {/* Displaying Dual Subtitles */}
              {/* Loop through Japanese subtitles and find corresponding English ones by index */}
              {Array.isArray(japaneseSubtitles) && japaneseSubtitles.map((jpSub, index) => {
                const enSub = Array.isArray(englishSubtitles) ? englishSubtitles[index] : undefined; // Robust check for enSub too

                return (
                  <div key={jpSub.start + index} className="mb-3 p-2 rounded-lg transition-colors duration-200 hover:bg-white/10">
                    {/* English Subtitle (optional based on availability) */}
                    {enSub && <p className="text-gray-200 text-sm mb-1">{enSub.text}</p>}
                    {/* Japanese Subtitle - Make it clickable */}
                    <p
                      className="text-yellow-300 text-base cursor-pointer hover:underline"
                      onClick={() => handleJapaneseSubtitleClick(jpSub.text)}
                    >
                      {jpSub.text}
                    </p>
                    {/* You could add cue.start and cue.end times here for debugging or user info */}
                    {/* <span className="text-xs text-gray-500">{jpSub.start} - {jpSub.end}</span> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Word Details Panel */}
        {showWordDetailsPanel && (
          <div className="w-full lg:w-80 bg-white/5 rounded-xl p-4 shadow-lg flex-shrink-0 max-h-[calc(100vh-80px)] overflow-y-auto"> {/* Adjust max-height as needed */}
            <h2 className="text-xl font-semibold mb-3">Word Breakdown</h2>
            {loadingWordData && <p className="text-gray-400">Loading word data...</p>}
            {errorWordData && <p className="text-red-400">Error: {errorWordData}</p>}

            {!loadingWordData && !errorWordData && selectedWordData && (
              <div>
                {Array.isArray(selectedWordData) && selectedWordData.length > 0 ? (
                  <div className="space-y-4">
                    {selectedWordData.map((wordInfo, idx) => (
                      <div key={idx} className="mb-4 pb-2 border-b border-gray-700 last:border-b-0">
                        <h3 className="text-lg font-bold text-teal-300">{wordInfo.word}</h3>
                        <p className="text-sm text-gray-300">Reading: {wordInfo.reading}</p>
                        <p className="text-sm text-gray-300">Romaji: {wordInfo.romaji}</p>
                        <p className="text-sm text-gray-100">Meaning: {wordInfo.meaning || 'Not found'}</p>
                        <p className="text-xs text-gray-400">JLPT: {wordInfo.jlpt || 'N/A'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No detailed breakdown available for this phrase.</p>
                )}
              </div>
            )}
            {!loadingWordData && !errorWordData && !selectedWordData && (
              <p className="text-gray-400">Click on a Japanese subtitle line to see word details here.</p>
            )}
            <button
              onClick={() => setShowWordDetailsPanel(false)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Close
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
