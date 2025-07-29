    import React, { useState } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import { Sidebar } from "../../components/ui/Sidebar";
    import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";

    const videos = {
      "takashii-from-japan-goldrush": {
  title: "TakashiiFromJapan on How Foreigners View Japan – Goldrush Podcast Ep.96",
  embedUrl: "https://youtu.be/_GO1RJA-hvM?si=d3HCLcRKkKxHfwOX",
  description: "In this episode of the Goldrush Podcast, TakashiiFromJapan—one of the most well-known Japanese creators abroad—talks about cultural perception, identity, and what foreigners really think about Japan. Great for intermediate learners who want to follow natural conversational flow with real-world context."
},
      "kole-goldnrush": {
  title: "KOLE: The Rising Star of J-HipHop – GOLDNRUSH Ep.74",
  embedUrl: "https://youtu.be/y9rAlKEzBzM",
  description: "In Episode 74 of GOLDNRUSH PODCAST, KOLE—an emerging talent in Japanese hip-hop—talks about how a chance encounter with Yzerr in Atlanta brought him to Kawasaki. The episode dives into his path through the popular 'RAPSTAR Birth' series, his lyrical style in cyphers, and the story behind his sudden rise. A must-watch for fans of J-Rap and hip-hop culture."
},
"hokkaido-guide": {
  title: "Hokkaido – Japanese Prefecture Podcast #1",
  embedUrl: "https://youtu.be/f5pNIwgCVVE?si=jdj7idWD_NMu7e_I",
  description: "Kick off this Japanese-language prefecture series with Hokkaido—famous for its nature, food, and culture. Spoken in clear, native-speed Japanese with on-screen subtitles, this episode is perfect for listening practice and exposure to natural phrasing, local references, and casual dialogue structures."
},
"inaka-kaso": {
  title: "Rural Japan’s Depopulation Problem – Native Japanese Listening",
  embedUrl: "https://youtu.be/d1bLBtBySGY",
  description: "Why are Japan’s most scenic places also the most empty? This podcast explores '過疎'—rural depopulation—with native-level spoken Japanese, touching on social issues, personal reflections, and local life. Ideal for intermediate to advanced learners wanting real, unscripted listening practice."
},
"nishida-rise": {
  title: "Ace Spiker Yuji Nishida on Growth, YouTube & Marriage – GOLDNRUSH Ep.110",
  embedUrl: "https://youtu.be/5eCWPY7k0Z4",
  description: "In this episode of GOLDNRUSH Podcast, Japan's volleyball superstar Yuji Nishida reflects on how approaching things casually helped him master both sports and life. He dives into how he improved without pressure, his YouTube journey, and thoughts on married life—all in natural conversational Japanese. Great for intermediate learners aiming to grasp real speech patterns, mindset talk, and sports culture."
},
"yuyu-happiness": {
  title: "Happiness – Japanese Conversation (N5-N3)",
  embedUrl: "https://youtu.be/GQXqpBh8_kc",
  description: "What does happiness mean to you? In this gentle and thoughtful episode, YUYU talks about 幸せ (しあわせ) using slow, clear Japanese suitable for beginners. Great for N5 to N3 learners who want real conversation input without getting overwhelmed. Includes natural expressions and vocab review points."
},
"regions-of-japan-56": {
  title: "1-Hour Japanese Listening – Regions of Japan #56",
  embedUrl: "https://youtu.be/Jvid5ttib-4",
  description: "This relaxing 1-hour episode covers Japan’s 8 regions, told through real-life memories—from slipping on icy roads in Hokkaido to tasting miso in Gifu. The pace is beginner-friendly but rich with real vocabulary and cultural insight. Ideal for shadowing, passive immersion, or focused listening."
},
"wasabi-long-5": {
  title: "1 Hour Random Japanese Talk | Coffee chat | 雑談 自然な話し方 | Wasabi Podcast LONG #5",
  embedUrl: "https://youtu.be/nRuEzDxY2Zc",
  description: "Join the Wasabi Podcast for a full hour of unscripted Japanese conversation. Perfect for learners aiming to absorb natural flow, intonation, and daily vocabulary. Great background listening while doing other tasks or for focused study."
},
"goldnrush-dan-ep89": {
  title: "Say 'Yes' to Everything — Dan on Creativity | GOLDNRUSH PODCAST Ep.89",
  embedUrl: "https://youtu.be/w5KPdk2gYKg",
  description: "In GOLDNRUSH Podcast Ep.89, Dan—known for his multi-creative talents and open approach to opportunity—shares insights on how saying 'yes' shapes his career. The episode explores his creative process, working philosophy, and how staying flexible fuels his work across disciplines."
},
"slowjp-conbini-ep1": {
  title: "Convenience Stores in Japan | My Slow Japanese Podcast #1",
  embedUrl: "https://youtu.be/JRs2vrM_f78",
  description: "In the first episode of My Slow Japanese Podcast, the speaker talks about Japanese convenience stores—how they work, what they offer, and why they’re a central part of daily life in Japan. The language is slow, clear, and perfect for Japanese learners practicing listening at a relaxed pace."
},
"goldnrush-tsunoda-ep105": {
  title: "Inside the Mind of Japan’s Youngest F1 Driver | GOLDNRUSH Ep.105",
  embedUrl: "https://youtu.be/Qj1dkCZfcRc",
  description: "GOLDNRUSH Podcast Ep.105 dives into the world of Yuki Tsunoda, Japan’s youngest F1 driver. From managing over 1000 controls in his car to the pressures of elite motorsports, this episode reveals the reality behind the Red Bull athlete's journey. Includes discussion on Red Bull’s 'Rise Like Pro' campaign."
},
"nativepodcast-hometown-ep1": {
  title: "Real Native Japanese Podcast: About My Hometown | Ep.1",
  embedUrl: "https://youtu.be/we6eAG5TfBw",
  description: "Episode 1 of this native-level Japanese podcast features a relaxed and unscripted discussion about the speaker's hometown. Aimed at learners who want to train their ear with real, unsimplified Japanese. Ideal for shadowing or passive listening."
},
    };

    export default function Podcast() {
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
    