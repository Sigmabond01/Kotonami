import { useVideoSubtitles } from "./useVideoSubtitles";
import { useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function VideoDetail({video, backLink}) {
    const {
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
        if(!sentence) return;
        setLoadingWordData(true);
        setErrorWordData(null);
        setSelectedWordData(null);
        setShowWordDetailsPanel(true);

        try {
            const response = await axios.post('http://localhost:3001/api/parse-japanese-text', {
                sentence
            });
            setSelectedWordData(response.data);
        } catch (err) {
            console.error("Error fetching word data:", err);
            setErrorWordData("Failed to get word breakdown" + (err.response?.data?.details || err.message));
        } finally {
            setLoadingWordData(false);
        }
    };
    return (
        <main className="flex-1 ml-16 md:ml-60 px-6 py-10 flex flex-col lg:flex-row gap-6">
            {/*Left side*/}
            <div className="flex-1">
                <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
                <p className="text-sm text-gray-300 mb-6">{video.description}</p>
                {backLink && (
                    <Link
                    to={backLink.href}
                    className="group inline-flex items-center gap-2 py-2 text-blue-400 hover:text-blue-700 mb-6">
                        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1"></ArrowLeft>
                        <span className="font-medium">{backLink.label}</span>
                    </Link>
                )}
                <div
                ref={videoContainerRef}
                className={`relative pt-[56.25%] w-full overflow-hidden rounded-xl shadow-lg mb-6 bg-black ${
                    isFullscreen ? 'fixed top-0 left-0 w-screen h-screen z-50 rounded-none' : ''
                }`}
                >
                    <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
                    {playerReady && (
                        <button
                        onClick={toggleFullscreen}
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 transition opacity-0 group-hover:opacity-100">
                            {isFullscreen ? <MinimizeIcon size={22} /> : <MaximizeIcon size={22} />}
                        </button>
                    )}
                    {playerReady && (activeJapaneseSubtitle || activeEnglishSubtitle) && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-fit max-w-[90%] p-3 text-center bg-black/40 rounded-lg">
                            {activeEnglishSubtitle && (
                                <p className="text-gray-200 text-lg mb-1">{activeEnglishSubtitle.text}</p>
                            )}
                            {activeJapaneseSubtitle && (
                                <p className="text-yellow-300 text-xl font-bold cursor-pointer hover:underline"
                                onClick={() => handleJapaneseSubtitleClick(activeJapaneseSubtitle.text)}
                                >
                                    {activeJapaneseSubtitle.text}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/*right*/}
            {showWordDetailsPanel && (
                <div className="w-full lg:w-80 bg-white/5 rounded-xl p-4 shadow-lg flex-shrink-0 max-h-[calc(100vh-80px)] overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-3">Word Breakdown</h2>
                    {loadingWordData && <p className="text-yellow-400">Loading word data.....</p>}
                    {errorWordData && <p className="text-red-400">{errorWordData}</p>}
                    {!loadingWordData && !errorWordData && selectedWordData && (
                        <div className="space-y-4">
                            {selectedWordData.map((wordInfo, idx) => (
                                <div key={idx} className="mb-4 pb-2 border-b border-gray-700 last:border-b-0">
                                    <h3 className="text-lg font-bold text-teal-300">{wordInfo.word}</h3>
                                    <p className="text-sm text-gray-300">Reading: {wordInfo.reading}</p>
                                    <p className="text-sm text-gray-300">Romaji: {wordInfo.romaji}</p>
                                    <p className="text-sm text-gray-300">Meaning: {wordInfo.meaning || "Not found!"}</p>
                                    <p className="text-xs text-gray-400">JLPT: {wordInfo.jlpt || "N/A"}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                    onClick={() => setShowWordDetailsPanel(false)}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        Close
                    </button>
                </div>
            )}
        </main>
    );
}