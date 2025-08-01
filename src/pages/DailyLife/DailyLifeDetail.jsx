    import React, { useState } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import { Sidebar } from "../../components/ui/Sidebar";
    import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";

    const videos = {
      "jp-shopping": {
        title: "Let's Go Shopping – 25 min Japanese Listening Practice",
        embedUrl: "https://www.youtube.com/watch?v=UJyBgOdh9IA",
        description: "Join a real-world 25-minute Japanese shopping interaction designed for immersive learning. This episode captures a natural conversation, perfect for JLPT N4–N3 learners practicing active listening, vocabulary recognition, and grammar spotting. Use this to shadow native speech or reinforce vocab in context."
      },
      "night-walk": {
        title: "Night Walk in Nagoya – 20min Japanese Listening Practice",
        embedUrl: "https://youtu.be/y7voh2JGmV0",
        description: "Immerse yourself in native-level Japanese as you follow a calm night walk through Nagoya. This 20-minute episode features slow, clear speech—perfect for JLPT N4–N3 learners. Listen actively, pick out grammar patterns, and click on words for instant meaning.",
      },
      "kyoto-town": {
        title: "Exploring an old town in Kyoto / Easy Japanese Vlog",
        embedUrl: "https://youtu.be/2rf0xpYwdEs",
        description:"Take a leisurely stroll through Kyoto’s charming old town in this Easy Japanese Vlog (N5–N4 level). Perfect for beginners and early intermediate learners, this immersive listening practice helps you absorb natural, slow-paced Japanese in a real setting.",
      },
      "kyoto-family": {
        title:"Exploring Kyoto with Family – Casual Japanese Listening Practice",
        embedUrl: "https://youtu.be/PfW2R1Ejwuo?si=1XQ8DzVhJXVUxGvB",
        description: "Wander through Kyoto’s highlights—from the Shinkansen ride to temple strolls—in this relaxed vlog packed with everyday Japanese. Spoken entirely in casual, natural speech (no keigo), this episode is ideal for learners aiming to internalize conversational grammar, native phrasing, and spontaneous expressions in context."
      },
      "shopping-street": {
  title: "Walking Through a Japanese Shopping Street – Daily Life & Culture",
  embedUrl: "https://youtu.be/RA_VosefCG4?si=KdZLFAqLplGMdWMs",
  description: "Wander through a vibrant Japanese shopping street filled with vending machines, traditional meals, and real cultural experiences. This episode offers immersive listening practice with natural, casual Japanese—perfect for JLPT N4–N3 learners aiming to improve their comprehension of everyday expressions in real context."
},
"osaka-walk-talk": {
  title: "Osaka Walk‑and‑Talk – Real Life Japanese Practice",
  embedUrl: "https://youtu.be/OPJlI65cPGE",
  description: "Stroll along Nakanoshima’s riverside in Osaka while chatting about sushi, yakitori and yakiniku with a native speaker. This relaxed walk‑and‑talk format gives you real-life, conversational Japanese in context—ideal for JLPT N4–N3 learners looking to internalize casual speech and everyday vocabulary."
},
"park-conversation": {
  title: "Let's Learn Japanese in the Park – Beginner Listening Practice",
  embedUrl: "https://youtu.be/rjmKQ-fjnyQ?si=TahPTKfGhp9N08xJ",
  description: "Spend 13 minutes walking through a scenic park in Kagurazaka while engaging in natural Japanese conversation. This beginner‑level vlog (N5–N4) features clear, slow speech and real dialogue—excellent for shadowing, vocabulary reinforcement, and immersive listening exposure."
},
"dentist-visit": {
  title: "Going to the Dentist – Comprehensible Japanese Vlog (EP.1)",
  embedUrl: "https://youtu.be/zYBdhGBWX9c?list=PLwLSw1_eDZl3sLnaxsmQ0-pMuWsBe_dMo",
  description: "Start your immersion journey with a beginner-friendly vlog documenting a simple day: waking up, prepping, and heading to the dentist. Spoken in slow, clear, and repetitive Japanese, this video is tailored for N5–N4 learners aiming to build core vocabulary and internalize grammar in real-life contexts."
},
"saturday-in-japan": {
  title: "Japanese Listening Practice | A Saturday in Japan",
  embedUrl: "https://youtu.be/r9EA4CpLUJo",
  description: "Practice your Japanese listening by spending a casual Saturday in Japan. This video features slow, clear Japanese with visual context, perfect for beginner to intermediate learners. Use it for passive immersion or active listening drills."
},
    };

    export default function DailyLifeDetail() {
      const { slug } = useParams();
      const video = videos[slug];

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
      } = useVideoSubtitles(video ? video.embedUrl : null);

      const [selectedWordData, setSelectedWordData] = useState(null);
      const [loadingWordData, setLoadingWordData] = useState(false);
      const [errorWordData, setErrorWordData] = useState(null);
      const [showWordDetailsPanel, setShowWordDetailsPanel] = useState(false);

      const handleJapaneseSubtitleClick = async (sentence) => {
        setLoadingWordData(true);
        setErrorWordData(null);
        setSelectedWordData(null);
        setShowWordDetailsPanel(true);

        try {
          const response = await axios.post('/api/parse-japanese-text', { sentence });
          setSelectedWordData(response.data);
        } catch (err) {
          console.error("Error fetching the word data: ", err);
          setErrorWordData("Failed to get word breakdown" + (err.response?.data?.details || err.message));
        } finally {
          setLoadingWordData(false);
        }
      };

      if (!video) {
        return <div className="text-white p-10">Video not found</div>
      }

      return (
        <div className="flex min-h-screen bg-[#03240f] text-white font-mincho">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-60 px-6 py-10 flex flex-col lg:flex-row gap-6">
            {/* Left Column: Video and Subtitles */}
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
    