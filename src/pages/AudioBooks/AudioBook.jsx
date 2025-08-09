    import React, { useState } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import { Sidebar } from "../../components/ui/Sidebar";
    import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";
    import { Link } from "react-router-dom";
    import { ArrowLeft } from "lucide-react";

    const videos = {
        "your-name-n5-audiobook": {
  title: "Your Name Audiobook (JLPT N4/N5) | Learn Easy Japanese with Stories",
  embedUrl: "https://www.youtube.com/embed/somEzKcCDVE",
  description: "A simplified retelling of the hit film 'Your Name' tailored for beginner-level Japanese learners (JLPT N4/N5). This easy Japanese audiobook helps you improve listening skills through a familiar story, with natural narration and clear vocabulary."
},
"spirited-away-n5": {
  title: "Spirited Away Audiobook (JLPT N4/N5) | Learn Easy Japanese with Stories",
  embedUrl: "https://www.youtube.com/embed/tEoRxBLOMqg",
  description: "A simplified audiobook adaptation of Spirited Away for JLPT N4/N5 learners. This story-focused lesson helps build vocabulary and listening comprehension with native pronunciation and slow, clear narration. Great for immersive learning."
},
"ogura-hyakunin-isshu-audiobook": {
  title: "Ogura Hyakunin Isshu (Free Audio Book in Japanese)",
  embedUrl: "https://www.youtube.com/embed/a94d3HlK_Cc",
  description: "A free audiobook version of the famous Japanese poetry anthology Ogura Hyakunin Isshu, compiled by Fujiwara no Teika. This is an excellent resource for advanced learners interested in classical Japanese literature and listening practice rooted in historical context."
},
"howls-moving-castle-n5-part3": {
  title: "Howl's Moving Castle: Easy Japanese Reading & Explanation (JLPT N4/N5, Part 3)",
  embedUrl: "https://www.youtube.com/embed/kSZAmW63KC8",
  description: "This is part 3 of an easy Japanese reading series based on Howl's Moving Castle. Tailored for JLPT N4/N5 learners, it features sentence-by-sentence explanations, vocabulary help, and grammar guidance to support natural comprehension and language acquisition."
},
"kouyahijiri-audiobook": {
  title: "Kouyahijiri by Kyōka Izumi (Full Audiobook)",
  embedUrl: "https://www.youtube.com/embed/hTWxrT6UAxs",
  description: "A full-length Japanese audiobook of Kyōka Izumi’s 'Kouyahijiri' — a gothic tale set in the mountains. Known for its lush, expressive language and atmospheric storytelling, this is a rich resource for those delving into classical Japanese or literature-based immersion."
},
"kikis-delivery-ghibli": {
  title: "Learn Japanese with Ghibli: Kiki's Delivery Service - Scene Description",
  embedUrl: "https://www.youtube.com/embed/ZZHZXpDaV-c",
  description: "This video breaks down scenes from Ghibli's *Kiki's Delivery Service* to help learners absorb natural Japanese in context. It’s ideal for JLPT N4/N5 learners aiming to bridge textbook Japanese with real-world usage through storytelling and visual cues."
},
"totoro-japanese-audiobook": {
  title: "My Neighbor Totoro Audiobook (JLPT N4/N5)",
  embedUrl: "https://www.youtube.com/embed/g4BslkuX6I0",
  description: "This audiobook version of *My Neighbor Totoro* uses slow, clear Japanese tailored to JLPT N4/N5 learners. It’s an ideal tool for boosting listening skills and vocabulary through immersion in a beloved Ghibli story."
},
"straw-turnaround-folktale": {
  title: "From Straw to a Great Turnaround – Easy Japanese Folktale",
  embedUrl: "https://www.youtube.com/embed/rLwowh9SBa4",
  description: "This is a retelling of the classic Japanese folktale about how a single piece of straw leads to great fortune. Narrated in slow, clear Japanese for JLPT N5 learners, this is perfect for listening comprehension and cultural understanding."
},
"gongitsune-audiobook": {
  title: "『ごんぎつね』– Japanese Classical Story Audiobook",
  embedUrl: "https://www.youtube.com/embed/J6KtEUu7fhU",
  description: "This audiobook narrates 'Gongitsune', a well-known Japanese folktale about a mischievous fox and a human boy. The story is read in clear, fluent Japanese and offers excellent practice for learners familiar with JLPT N4–N3 level vocabulary."
},
"toshisyun-akutagawa": {
  title: "Toshisyun by Ryunosuke Akutagawa (Full Audiobook)",
  embedUrl: "https://www.youtube.com/embed/cDPlxiHqcEw",
  description: "A timeless short story by literary master Ryunosuke Akutagawa, 'Toshisyun' explores the journey of a young man seeking power under the mentorship of a wise hermit. This audiobook, read in Japanese, is perfect for learners interested in classical language, moral storytelling, and Japanese literature."
},
"restaurant-of-many-orders": {
  title: "『注文の多い料理店』– Kenji Miyazawa Audiobook",
  embedUrl: "https://www.youtube.com/embed/q-o8i-5zSWs",
  description: "This audiobook presents Kenji Miyazawa's famous short story 'The Restaurant of Many Orders'. It’s a bizarre tale about two hunters who get more than they bargained for at a mysterious restaurant. Narrated clearly in Japanese, it’s excellent for JLPT N4–N3 listeners aiming to immerse in classic literature."
},
"poverty-god-folktale": {
  title: "The One Living in the House Was… the Poverty God｜Japanese Folktale",
  embedUrl: "https://www.youtube.com/embed/aNltAtr0pOE",
  description: "This folktale narrated in simple Japanese tells the story of a man who discovers that the god of poverty has made itself at home in his house. With clear narration and basic vocabulary, this video is perfect for JLPT N5 learners wanting to improve their listening comprehension through traditional Japanese storytelling."
},
    };

    export default function AudioBook() {
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
    