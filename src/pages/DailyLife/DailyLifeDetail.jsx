// DailyLifeDetail.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "../../components/ui/Sidebar";
import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";


const videos = {
  "buying-snacks-osaka": {
    title: "Buying Snacks in Osaka",
    embedUrl: "https://www.youtube.com/watch?v=UJyBgOdh9IA",
    description: "Follow a native speaker as they explore snacks in an Osaka konbini. Listen to real-world phrases, accents, and context." // Description of the video.
  },
  // Add more video entries here
};

export default function DailyLifeDetail() {
  const { slug } = useParams();
  const video = videos[slug];

  //custom hook to get all video and subtitle
  const {
  japaneseSubtitles,
  englishSubtitles,
  loadingSubtitles,
  errorSubtitles,
  playerRef,
  videoContainerRef,
  playerReady,
  activeJapaneseSubtitle,
  activeEnglishSubtitle,
  isFullscreen,
  toggleFullscreen,
  MaximizeIcon,
  MinimizeIcon,
  } = useVideoSubtitles(video ? video.embedUrl : null);

  const [selectedWordData, setSelectedWordData] = useState(null);
  const [loadingWordData, setLoadingWordData] = useState(false);
  const [errorWordData, setErrorWordData] = useState(null);
  const [showWordDetailsPanel, setShowWordDetailsPanel] = useState(false);

  //function to handle click on a Japanese subtitle line
  const handleJapaneseSubtitleClick = async (sentence) => {
    setLoadingWordData(true);
    setErrorWordData(null);
    setSelectedWordData(null);
    setShowWordDetailsPanel(true);

    try {
      //post request to the backend API
      const response = await axios.post('/api/parse-japanese-text', { sentence });
      setSelectedWordData(response.data);
    } catch (err) {
      console.error("Error fetching the word data: ", err);
      setErrorWordData("Failed to get word breakdown" + (err.response?.data?.details || err.message));
    } finally {
      setLoadingWordData(false);
    }
  };
  if(!video) {
    return <div className="text-white p-10">Video not found</div>
  }

  return (
    <div className="flex min-h-screen bg-[#03240f] text-white font-mincho">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-60 px-6 py-10 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
          <p className="text-sm text-gray-300 mb-6">{video.description}</p>
          <div
          ref={videoContainerRef}
          className={`relative pt-[56.25%] w-full overflow-hidden rounded-xl shadow-lg mb-6 bg-black ${isFullscreen ? 'fixed top-0 left-0 w-screen h-screen z-50 rounded-none' : ''}`}
          >
            <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
            {playerReady && (
              <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full z-20 transition-opacity duration-200 opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
              >
                {isFullscreen ? <MinimizeIcon size={20} /> : <MaximizeIcon size={20} />}
              </button>
            )}
            {playerReady && (activeJapaneseSubtitle || activeEnglishSubtitle) && (
              <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-fit max-w-[90%] p-3 text-center bg-black bg-opacity-30 rounded-lg"
              style={{ zIndex: 10 }}
              >
                {activeEnglishSubtitle && (
                  <p className="text-gray-200 text-lg mb-1 leading-tight">
                    {activeEnglishSubtitle.text}
                  </p>
                )}
                  {activeJapaneseSubtitle && (
                    <p
                    className="text-yellow-300 text-xl font-bold cursor-pointer hover:underline leading-tight"
                    onClick={() => handleJapaneseSubtitleClick(activeJapaneseSubtitle.text)}>
                      {activeJapaneseSubtitle.text}
                    </p>
                  )}
              </div>
            )}
          </div>
          <div className="bg-white/5 rounded-xl p-4 shadow-inner">
            <h2 className="text-xl font-semibold mb-3">Full Transcript (Clickable)</h2>
            {loadingSubtitles && <p className="text-gray-400">Loading subtitles...</p>}
            {errorSubtitles && <p className="text-red-400">Error loading subtitles: {errorSubtitles}</p>}

            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2"> {/* Scrollable container for subtitles. */}
              {(!loadingSubtitles && !errorSubtitles && japaneseSubtitles.length === 0 && englishSubtitles.length === 0) && (
                <p className="text-gray-400">No subtitles available for this video (or failed to load).</p>
              )}

              {/* Maps through Japanese subtitles to display them alongside English counterparts. */}
              {Array.isArray(japaneseSubtitles) && japaneseSubtitles.map((jpSub, index) => {
                const enSub = Array.isArray(englishSubtitles) ? englishSubtitles[index] : undefined;

                return (
                  <div key={jpSub.start + index} className="mb-3 p-2 rounded-lg transition-colors duration-200 hover:bg-white/10">
                    {enSub && <p className="text-gray-200 text-sm mb-1">{enSub.text}</p>}
                    <p
                      className="text-yellow-300 text-base cursor-pointer hover:underline"
                      onClick={() => handleJapaneseSubtitleClick(jpSub.text)}
                    >
                      {jpSub.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {showWordDetailsPanel && (
          <div className="w-full lg:w-80 bg-white/5 rounded-xl p-4 shadow-lg flex-shrink-0 max-h-[calc(100vh-80px)] overflow-y-auto"> {/* Styling for the word details panel. */}
            <h2 className="text-xl font-semibold mb-3">Word Breakdown</h2> {/* Panel title. */}
            {loadingWordData && <p className="text-gray-400">Loading word data...</p>} {/* Loading indicator. */}
            {errorWordData && <p className="text-red-400">Error: {errorWordData}</p>} {/* Error message. */}

            {!loadingWordData && !errorWordData && selectedWordData && (
              <div>
                {Array.isArray(selectedWordData) && selectedWordData.length > 0 ? (
                  <div className="space-y-4">
                    {selectedWordData.map((wordInfo, idx) => (
                      <div key={idx} className="mb-4 pb-2 border-b border-gray-700 last:border-b-0"> {/* Container for each word's details. */}
                        <h3 className="text-lg font-bold text-teal-300">{wordInfo.word}</h3> {/* Displays the Japanese word. */}
                        <p className="text-sm text-gray-300">Reading: {wordInfo.reading}</p> {/* Displays the reading. */}
                        <p className="text-sm text-gray-300">Romaji: {wordInfo.romaji}</p> {/* Displays the romaji. */}
                        <p className="text-sm text-gray-100">Meaning: {wordInfo.meaning || 'Not found'}</p> {/* Displays the meaning, defaults to 'Not found'. */}
                        {wordInfo.jlpt && <p className="text-xs text-gray-400">JLPT: {wordInfo.jlpt}</p>} {/* Displays JLPT if available. */}
                        {!wordInfo.jlpt && <p className="text-xs text-gray-500 italic">JLPT: N/A</p>} {/* Displays N/A if JLPT is not available. */}
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