    import React, { useState } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import { Sidebar } from "../../components/ui/Sidebar";
    import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";
    import { Link } from "react-router-dom";
    import { ArrowLeft } from "lucide-react";

    const videos = {
"easyjp-what-did-you-do-today": {
  title: "What Did You Do Today? | Easy Japanese Interview (N5–N4)",
  embedUrl: "https://youtu.be/QaExGOtWbac",
  description: "An easy Japanese interview for beginners (N5–N4 level) centered around the question: 'What did you do today?'. Helps learners practice listening to real-life responses with clear, slow pronunciation and casual grammar."
},
"why-japan-so-cheap": {
  title: "Why Is Japan So Cheap Now? | Japanese Interview",
  embedUrl: "https://youtu.be/C0FSpSe50m0",
  description: "This Japanese interview explores why Japan is considered cheap by foreigners today. The speaker discusses inflation, cost of living, and currency trends. A solid listening resource for learners interested in real-world economic context and conversational Japanese."
},
"japanese-elders-foreigners": {
  title: "Do Japanese Elders Like Foreigners in Japan? | Street Interview",
  embedUrl: "https://youtu.be/TbqtCm8q_G4",
  description: "This street interview dives into the perceptions of elderly Japanese people toward foreigners living or visiting Japan. It offers raw insights into generational views, cultural attitudes, and subtle language cues—perfect for intermediate and advanced Japanese learners."
},
"ex-yakuza-confession": {
  title: "Confessions of Ex-Yakuza Leader [ENG CC]",
  embedUrl: "https://youtu.be/Fd4nlMmda_I",
  description: "In this gripping Japanese interview (with English subtitles), a former Yakuza leader shares unfiltered stories from inside Japan’s infamous organized crime world. Learn about the discipline, loyalty, violence, and redemption behind one of Japan’s most feared organizations. Excellent for advanced Japanese listening with deep cultural context."
},
"things-foreigners-shouldnt-do": {
  title: "Things Foreigners Should NEVER Do - Japanese Interview",
  embedUrl: "https://youtu.be/tTBzNtEq47U",
  description: "This Japanese street interview dives into social norms and unwritten rules foreigners often break in Japan. Locals express what they find disrespectful, surprising, or even shocking when tourists or residents ignore Japanese etiquette. A goldmine for serious learners trying to understand Japanese behavior, culture, and unspoken boundaries."
},
"bald-man-dating-japan": {
  title: "Would You Date a Bald Man? - Japanese Interview",
  embedUrl: "https://youtu.be/t63dNVP08gs",
  description: "This casual Japanese interview tackles a fun but revealing topic: baldness and dating appeal. Locals share their honest thoughts, preferences, and dealbreakers when it comes to hair—or the lack of it. Insightful for anyone curious about beauty standards and relationship expectations in Japan."
},
"japanese-elders-regrets": {
  title: "Japanese Elders Tell Us Their Biggest Regrets",
  embedUrl: "https://youtu.be/PAzHMt77tjk",
  description: "What do people wish they'd done differently? In this powerful street interview, elderly Japanese citizens share their biggest life regrets—missed opportunities, family, careers, and personal growth. An eye-opening perspective into aging, wisdom, and reflection in Japanese society."
},
"japan-tourist-warnings": {
  title: "\"Tourists, please don’t do this here\" from Japanese locals",
  embedUrl: "https://youtu.be/fXV89VQ5dJQ",
  description: "In this Japanese street interview, locals voice their frustrations and wishes to tourists visiting Japan. From public behavior to cultural respect, this video offers valuable insights and etiquette tips that every visitor should know to avoid offending locals or standing out in the wrong way."
},
"japan-confess-crush": {
  title: "Asking Strangers in Japan to Confess to Their CRUSH",
  embedUrl: "https://youtu.be/VPgvmzeQFq8",
  description: "What happens when you ask people in Japan to reveal their hidden love? This lighthearted and candid street interview dives into the hearts of Japanese strangers as they share confessions about their crushes—some bold, some shy, all real. A sweet look at romance in Japanese culture."
},
"morning-routine-easy-jp": {
  title: "Easy Japanese Interview - Morning Routine (N5-N4)",
  embedUrl: "https://youtu.be/8kQCtx9Ff0A",
  description: "A basic Japanese interview that walks through common morning routines. This is perfect for beginners (N5–N4) looking to improve listening comprehension and natural sentence structure. Use it for shadowing or vocab reinforcement."
},
"why-jp-salarymen-work-hard": {
  title: "Why Japanese Salarymen Work So Hard",
  embedUrl: "https://youtu.be/25kp8rvWNJM",
  description: "Explore why Japanese salarymen work extreme hours through real street interviews. Locals give raw, cultural insight into what's driving Japan’s intense work ethic—expectations, pride, and societal pressure. Great for learners trying to understand modern Japan beyond textbooks."
},
"do-japanese-people-think-japanese-is-difficult": {
  title: "Do Japanese People Think Japanese is Difficult? (Interview)",
  embedUrl: "https://www.youtube.com/embed/QK400iXefwg",
  description: "A Japanese street interview exploring what native speakers think about the difficulty of their own language. Great listening practice and insight into cultural perspectives on learning and using Japanese as a native speaker or foreigner."
},
  "japanese-yakuza-opinions": {
    title: "What Do Japanese Really Think About the Yakuza?",
    embedUrl: "https://www.youtube.com/embed/2RjcdkzdqKk",
    description: "Through candid street interviews, locals share their unfiltered opinions about the Yakuza—Japan’s infamous organized crime syndicate. From fear and respect to curiosity and indifference, the video captures a spectrum of perspectives grounded in real-life encounters and cultural context."
  },
  "hardest-english-words-japan": {
    title: "Can Japanese People Pronounce the HARDEST English Words?",
    embedUrl: "https://www.youtube.com/embed/dHceVBQ0dfs",
    description: "In a playful linguistic challenge, Japanese speakers attempt to pronounce notoriously difficult English words. The mix of determination, mispronunciations, and laughter reveals both the beauty and struggle of crossing language barriers."
  },
  "japan-ai-robots-opinions": {
    title: "Interviewing Japanese People About AI, Technology, and ROBOTS",
    embedUrl: "https://www.youtube.com/embed/8qXYy1kOSmA",
    description: "Exploring Japan’s deep integration with advanced technology, this video captures everyday citizens’ thoughts on AI, automation, and robotics—from optimism about innovation to caution over societal impacts."
  },
  "rude-in-japan": {
    title: "What's Considered Rude In Japan? | Street Interview",
    embedUrl: "https://www.youtube.com/embed/Vk2l_ivkOFI",
    description: "A cultural deep-dive into Japanese etiquette, revealing surprising social missteps that can leave a bad impression. Locals highlight small yet meaningful gestures that define politeness in Japan."
  },
  "common-japanese-words": {
    title: "Words Japanese People Use Everyday",
    embedUrl: "https://www.youtube.com/embed/sbICTVKKHyw",
    description: "A look into the heartbeat of daily Japanese conversation, this video introduces common phrases that shape interactions—from greetings to casual slang—offering a linguistic snapshot of modern Japan."
  },
  "how-not-to-text-japanese-girls": {
    title: "How NOT to Text Japanese Girls | Japan Street Interviews",
    embedUrl: "https://www.youtube.com/embed/DUr1CJAK50w",
    description: "Locals discuss common mistakes foreigners make when texting Japanese women, revealing cultural nuances in communication style, pacing, and tone that can make or break connections."
  },
  "outrageous-kanji-challenge": {
    title: "I Paid Japanese People to Read OUTRAGEOUSLY Difficult Kanji",
    embedUrl: "https://www.youtube.com/embed/oHBSDbBn3d0",
    description: "A hilarious and humbling challenge where Japanese natives attempt to read extremely rare and complex kanji. The struggle shows the vastness of Japan’s writing system and the limits of everyday literacy."
  },
  "dreadlocks-trend-japan": {
    title: "Why Dreadlocks Are Trending In Japan",
    embedUrl: "https://www.youtube.com/embed/FCIc-xiZAP0",
    description: "An exploration of how dreadlocks have become a rising fashion trend in Japan, blending global influences with local street style. The video examines perceptions, cultural adoption, and the artistry behind the look."
  },
  "japanese-job-interview-tips": {
    title: "How to have a Japanese interview",
    embedUrl: "https://www.youtube.com/embed/pz48MM_urnw",
    description: "A practical and cultural guide to navigating Japanese job interviews. It covers key etiquette, expected behaviors, and the subtle social cues that can set candidates apart in a highly formal process."
  }
    };

    export default function Interview() {
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
      } = useVideoSubtitles(video ? video.embedUrl : null, false);

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
      if (!video) {
        return <div className="text-white p-10">Video not found</div>
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
    