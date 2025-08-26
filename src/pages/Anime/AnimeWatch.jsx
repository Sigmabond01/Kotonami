import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";
import EpisodeList from "../../components/EpisodeList";
export default function AnimeWatch() {
    const { slug } = useParams();
    const [item, setItem] = useState(null);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAnimeData = async () => {
            if (!slug) return;
            try {
                const response = await axios.get(`https://kotonami-backend.onrender.com/api/anime/${slug}`);
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
        playerReady,
        activeJapaneseSubtitle,
        isFullscreen,
        toggleFullscreen,
        MaximizeIcon,
        MinimizeIcon,
    } = useVideoSubtitles(
        selectedEpisode ? selectedEpisode.embedUrl : null,
        false
    );
    const [selectedWordData, setSelectedWordData] = useState(null);
    const [loadingWordData, setLoadingWordData] = useState(false);
    const [errorWordData, setErrorWordData] = useState(null);
    const [showWordDetailsPanel, setShowWordDetailsPanel] = useState(false);
    const handleJapaneseSubtitleClick = async (sentence) => {
        if (!sentence) return;
        setLoadingWordData(true);
        setErrorWordData(null);
        setSelectedWordData(null);
        setShowWordDetailsPanel(true);
        try {
            const response = await axios.post('https://kotonami-backend.onrender.com/api/parse-japanese-text', {
                sentence: sentence
            });
            setSelectedWordData(response.data);
        } catch (err) {
            console.error("Error fetching the word data: ", err);
            setErrorWordData("Failed to get word breakdown. " + (err.response?.data?.details || err.message));
        } finally {
            setLoadingWordData(false);
        }
    };
    useEffect(() => {
        setShowWordDetailsPanel(false);
        setSelectedWordData(null);
    }, [selectedEpisode]);
    if (loading) return <div className="text-white p-10 flex items-center justify-center min-h-screen font-mincho bg-gradient-to-br from-[#0a0a14] via-[#0f0f20] to-[#0a0a14]">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
            <p className="text-xl text-cyan-300 font-semibold tracking-wide">Loading Anime...</p>
        </div>
    </div>;
    if (!item) return <div className="text-white p-10 flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0f0f20] to-[#0a0a14]">
        <div className="text-center">
            <p className="text-xl text-red-400 font-semibold tracking-wide">Anime not found. 😔</p>
            <Link to="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-transform transform hover:scale-105">Go Home</Link>
        </div>
    </div>;
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0f0f20] to-[#0a0a14] text-white font-mincho antialiased">
            <header className="w-full px-4 sm:px-6 pt-6">
                <div className="flex justify-between items-center max-w-[1600px] mx-auto">
                    <Link to={`/anime/${slug}`} className="flex items-center px-4 py-2 bg-slate-800/60 hover:bg-slate-700/80 rounded-lg transition-colors text-slate-200 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Go back to anime
                    </Link>
                    <a href="https://github.com/Sigmabond01/Kotonami" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-slate-800/60 hover:bg-slate-700/80 rounded-lg transition-colors text-slate-200 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        Star on GitHub !!
                    </a>
                </div>
            </header>
            <main className="flex flex-col lg:flex-row w-full px-4 sm:px-6 pt-6 pb-8 gap-6">
                <div className="w-full lg:w-80 flex-shrink-0 order-2 lg:order-1">
                    <EpisodeList
                        episodes={item.episodes}
                        currentEpisode={selectedEpisode}
                        onSelectEpisode={setSelectedEpisode}
                    />
                </div>
                <div className="flex-1 space-y-6 flex flex-col order-1 lg:order-2">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-cyan-300 drop-shadow-md">{item.title}</h1>
                        {selectedEpisode && (
                            <h2 className="text-lg sm:text-xl text-white/80 font-medium">
                                Episode {selectedEpisode.number}: {selectedEpisode.title}
                            </h2>
                        )}
                    </div>
                    <div
                        ref={videoContainerRef}
                        className={`group relative pt-[56.25%] w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 ${
                            isFullscreen ? "fixed top-0 left-0 w-screen h-screen z-50 rounded-none" : ""
                        }`}
                    >
                        <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
                        {playerReady && (
                            <button
                                onClick={toggleFullscreen}
                                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 sm:p-3 rounded-full z-20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                            >
                                {isFullscreen ? <MinimizeIcon size={24} /> : <MaximizeIcon size={24} />}
                            </button>
                        )}
                        {playerReady && activeJapaneseSubtitle && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-fit max-w-[90%] p-2 sm:p-3 text-center bg-black/20 backdrop-blur-sm rounded-lg shadow-xs">
                                <p
                                    className="text-yellow-300 text-base sm:text-lg font-bold cursor-pointer"
                                    onClick={() => handleJapaneseSubtitleClick(activeJapaneseSubtitle.text)}
                                >
                                    {activeJapaneseSubtitle.text}
                                </p>
                            </div>
                        )}
                    </div>
                    {!playerReady && (
                        <div className="flex justify-center items-center h-48">
                            <p className="text-white/60 text-lg">Loading video player and subtitles...</p>
                        </div>
                    )}
                </div>
                {showWordDetailsPanel && (
                    <div className="w-full lg:w-96 bg-black/50 rounded-2xl p-6 shadow-2xl flex-shrink-0 max-h-[60vh] lg:max-h-[calc(100vh-64px)] overflow-y-auto border border-slate-700/50 backdrop-blur-sm transition-all duration-500 order-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl sm:text-2xl font-semibold text-cyan-300">Word Breakdown</h2>
                            <button
                                onClick={() => setShowWordDetailsPanel(false)}
                                className="text-3xl text-slate-400 hover:text-red-400 transition-colors"
                            >
                                &times;
                            </button>
                        </div>
                        {loadingWordData && <p className="text-slate-400 animate-pulse">Analyzing text...</p>}
                        {errorWordData && <p className="text-red-400 text-sm">{errorWordData}</p>}
                        {!loadingWordData && !errorWordData && selectedWordData && (
                            <div className="space-y-5">
                                {Array.isArray(selectedWordData) &&
                                    selectedWordData.map((wordInfo, idx) => (
                                        <div key={idx} className="pb-4 border-b border-slate-700/70 last:border-b-0">
                                            <h3 className="text-lg sm:text-xl font-bold text-cyan-200">{wordInfo.word}</h3>
                                            <p className="text-sm sm:text-base text-slate-300">
                                                <span className="font-semibold">Reading:</span> {wordInfo.reading || 'N/A'}
                                            </p>
                                            <p className="text-sm sm:text-base text-slate-300">
                                                <span className="font-semibold">Romaji:</span> {wordInfo.romaji || 'N/A'}
                                            </p>
                                            <p className="text-sm sm:text-base text-slate-300">
                                                <span className="font-semibold">Meaning:</span> {wordInfo.meaning || "Not found"}
                                            </p>
                                            <p className="text-sm sm:text-base text-slate-300">
                                                <span className="font-semibold">JLPT:</span> {wordInfo.jlpt || 'N/A'}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}