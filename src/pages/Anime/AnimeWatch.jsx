import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";
import { ArrowLeft } from "lucide-react";
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

    // Click handler for subtitles
    const handleJapaneseSubtitleClick = async (sentence) => {
        if (!sentence) return;
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
            setErrorWordData("Failed to get word breakdown. " + (err.response?.data?.details || err.message));
        } finally {
            setLoadingWordData(false);
        }
    };
    
    useEffect(() => {
        setShowWordDetailsPanel(false);
        setSelectedWordData(null);
    }, [selectedEpisode]);


    if (loading) return <div className="text-white p-10">Loading Anime...</div>;
    if (!item) return <div className="text-white p-10">Anime not found.</div>;

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#0f172a]  to-[#334155] text-white font-mincho">
            <main className="flex-1 px-6 py-10 flex flex-col lg:flex-row gap-6">
    {/* LEFT: Episode List */}
    <EpisodeList
        episodes={item.episodes}
        currentEpisode={selectedEpisode}
        onSelectEpisode={setSelectedEpisode}
    />

    {/* CENTER: Video Player */}
    <div className="flex-1 space-y-6">
        <div>
            <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
            {selectedEpisode && (
                <h2 className="text-lg text-white/70">
                    Episode {selectedEpisode.number}: {selectedEpisode.title}
                </h2>
            )}
        </div>

        <div
            ref={videoContainerRef}
            className={`group relative pt-[56.25%] w-full overflow-hidden rounded-xl shadow-lg bg-black ${
                isFullscreen ? "fixed top-0 left-0 w-screen h-screen z-50 rounded-none" : ""
            }`}
        >
            <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
            {playerReady && (
                <button
                    onClick={toggleFullscreen}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 transition opacity-0 group-hover:opacity-100"
                >
                    {isFullscreen ? <MinimizeIcon size={20} /> : <MaximizeIcon size={20} />}
                </button>
            )}
            {playerReady && activeJapaneseSubtitle && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-fit max-w-[90%] p-3 text-center bg-black/40 rounded-lg">
                    <p
                        className="text-yellow-300 text-xl font-bold cursor-pointer hover:underline"
                        onClick={() => handleJapaneseSubtitleClick(activeJapaneseSubtitle.text)}
                    >
                        {activeJapaneseSubtitle.text}
                    </p>
                </div>
            )}
        </div>
    </div>

    {/* RIGHT: Word Breakdown */}
    {showWordDetailsPanel && (
        <div className="w-full lg:w-80 bg-black/20 rounded-xl p-4 shadow-lg flex-shrink-0 max-h-[calc(100vh-120px)] overflow-y-auto border border-white/10">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Word Breakdown</h2>
                <button
                    onClick={() => setShowWordDetailsPanel(false)}
                    className="text-2xl hover:text-red-500"
                >
                    &times;
                </button>
            </div>
            {loadingWordData && <p className="text-gray-400">Loading...</p>}
            {errorWordData && <p className="text-red-400">{errorWordData}</p>}
            {!loadingWordData && !errorWordData && selectedWordData && (
                <div className="space-y-4">
                    {Array.isArray(selectedWordData) &&
                        selectedWordData.map((wordInfo, idx) => (
                            <div key={idx} className="pb-2 border-b border-gray-700 last:border-b-0">
                                <h3 className="text-lg font-bold text-teal-300">{wordInfo.word}</h3>
                                <p className="text-sm">Reading: {wordInfo.reading}</p>
                                <p className="text-sm">Romaji: {wordInfo.romaji}</p>
                                <p className="text-sm">
                                    Meaning: {wordInfo.meaning || "Not found"}
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