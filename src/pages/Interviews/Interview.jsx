    import React, { useState, useEffect } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import { Sidebar } from "../../components/ui/Sidebar";
    import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";
    import { Link } from "react-router-dom";
    import { ArrowLeft } from "lucide-react";

    export default function Interview() {
      const { slug } = useParams();
      const [video, setVideo] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const {
        japaneseSubtitles,
        englishSubtitles,
        loadingSubtitles,
        errorSubtitles,
        videoContainerRef,
        playerReady,
        activeJapaneseSubtitle,
        activeEnglishSubtitle,
        isFullscreen,
        toggleFullscreen,
        MaximizeIcon,
        MinimizeIcon,
      } = useVideoSubtitles(video ? video.embedUrl : null, false);

      const [selectedWordData, setSelectedWordData] = useState(null);
      const [loadingWordData, setLoadingWordData] = useState(false);
      const [errorWordData, setErrorWordData] = useState(null);
      const [showWordDetailsPanel, setShowWordDetailsPanel] = useState(false);

      useEffect(() => {
        const fetchVideo = async () => {
          if(!slug) return;
          try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3003/api/interviews/${slug}`);
            setVideo(response.data);
          } catch (err) {
            console.error("Failed to fetch video details:", err);
            setError("Could not find the video!");
          } finally {
            setLoading(false);
          }
        };
        fetchVideo();
      }, [slug]);

    const handleJapaneseSubtitleClick = async (sentence) => {
    setLoadingWordData(true);
    setErrorWordData(null);
    setSelectedWordData(null);
    setShowWordDetailsPanel(true);

    try {
        const response = await axios.post('http://localhost:3001/api/parse-japanese-text', {
            sentence: sentence
        });
        setSelectedWordData(response.data);
    } catch (err) {
        console.error("Error fetching the word data: ", err);
        setErrorWordData("Failed to get word breakdown" + (err.response?.data?.details || err.message));
    } finally {
        setLoadingWordData(false);
    }
};

      if(loading) {
        return <div className="text-white p-10">Loading interviews..</div>
      }
      if (error || !video) {
        return <div className="text-white p-10">{error || "Video not found"}</div>
      }

      return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#0f172a]  to-[#334155] text-white font-mincho">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-60 px-6 py-10 flex flex-col lg:flex-row gap-6">
            {/* Left Column: Video and Subtitles */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
              <p className="text-sm text-gray-300 mb-6">{video.description}</p>
             <Link
                                   to="/audiobooks"
                                   className="group inline-flex items-center gap-2 py-2 text-blue-400 hover:text-blue-700 mb-6"
                                 >
                                   <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                                     <span className="font-medium">Return to Audiobooks</span>
                               </Link>
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
              {/* Removed: Original Full Subtitles Section */}
            </div>
            {/* Right Column: Word Details Panel */}
            {showWordDetailsPanel && (
              <div className="w-full lg:w-80 bg-white/5 rounded-xl p-4 shadow-lg flex-shrink-0 max-h-[calc(100vh-80px)] overflow-y-auto">
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
                            {wordInfo.jlpt && <p className="text-xs text-gray-400">JLPT: {wordInfo.jlpt}</p>}
                            {!wordInfo.jlpt && <p className="text-xs text-gray-500 italic">JLPT: N/A</p>}
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
    