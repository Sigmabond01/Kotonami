// DailyLifeDetail.jsx
import React, { useState } from "react"; // Only useState is needed from React now.
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters.
import axios from "axios"; // axios is still needed here for fetching word data.
import { Sidebar } from "../../components/ui/Sidebar"; // Import the Sidebar component.
import { useVideoSubtitles } from "../../hooks/useVideoSubtitles"; // Import the new custom hook.

// --- YOUR VIDEO DATA ---
// Constant object holding video information, keyed by a slug.
const videos = {
  "buying-snacks-osaka": {
    title: "Buying Snacks in Osaka", // Title of the video.
    embedUrl: "https://www.youtube.com/watch?v=UJyBgOdh9IA", // Full YouTube URL for the video.
    description: "Follow a native speaker as they explore snacks in an Osaka konbini. Listen to real-world phrases, accents, and context." // Description of the video.
  },
  // Placeholder for adding more video entries.
  // Add more video entries here
};

// Default export for the DailyLifeDetail React functional component.
export default function DailyLifeDetail() {
  const { slug } = useParams(); // Extracts the 'slug' URL parameter (e.g., "buying-snacks-osaka").
  const video = videos[slug]; // Retrieves video data from the 'videos' object using the slug.

  // --- Use the custom hook to get all video and subtitle related states/functions ---
  // The hook abstracts away the complex logic, returning only what's needed for rendering.
  const {
    japaneseSubtitles, // Array of Japanese subtitle cues.
    englishSubtitles, // Array of English subtitle cues.
    loadingSubtitles, // Boolean indicating if subtitles are loading.
    errorSubtitles, // Error message if subtitle loading failed.
    playerRef, // Ref for the YouTube player instance (used for the div ID).
    videoContainerRef, // Ref for the video container for fullscreen control.
    playerReady, // Boolean indicating if the player is ready.
    activeJapaneseSubtitle, // The currently active Japanese subtitle cue.
    activeEnglishSubtitle, // The currently active English subtitle cue.
    isFullscreen, // Boolean indicating if custom fullscreen is active.
    toggleFullscreen, // Function to toggle custom fullscreen.
    MaximizeIcon, // Lucide React Maximize icon component.
    MinimizeIcon, // Lucide React Minimize icon component.
  } = useVideoSubtitles(video ? video.embedUrl : null); // Pass the video URL to the hook.

  // --- State for Word Details Panel (remains in this component as it's specific to the panel) ---
  const [selectedWordData, setSelectedWordData] = useState(null); // Stores detailed word data for a clicked Japanese phrase.
  const [loadingWordData, setLoadingWordData] = useState(false); // Indicates if word data is loading.
  const [errorWordData, setErrorWordData] = useState(null); // Stores error message for word data fetching.
  const [showWordDetailsPanel, setShowWordDetailsPanel] = useState(false); // Controls visibility of the word details panel.

  // --- Function to handle click on a Japanese subtitle line (from overlay or full transcript) ---
  // Asynchronous function to handle clicks on Japanese subtitle text, fetching word data from the backend.
  const handleJapaneseSubtitleClick = async (sentence) => {
    setLoadingWordData(true); // Set loading state for word data.
    setErrorWordData(null); // Clear any previous word data error.
    setSelectedWordData(null); // Clear any previously selected word data.
    setShowWordDetailsPanel(true); // Ensure the word details panel is visible.

    try {
      // Make a POST request to the backend API to parse the Japanese sentence.
      const response = await axios.post('/api/parse-japanese-text', { sentence });
      setSelectedWordData(response.data); // Set the fetched word data.
    } catch (err) {
      console.error("Error fetching word data:", err); // Log any error during word data fetching.
      // Set a user-friendly error message, including details from the backend response if available.
      setErrorWordData("Failed to get word breakdown. " + (err.response?.data?.details || err.message));
    } finally {
      setLoadingWordData(false); // Set loading state to false.
    }
  };

  // Renders a "Video not found" message if the video data is not available.
  if (!video) {
    return <div className="text-white p-10">Video not found</div>;
  }

  // Main render function for the DailyLifeDetail component.
  return (
    <div className="flex min-h-screen bg-[#03240f] text-white font-mincho">
      <Sidebar /> {/* Renders the Sidebar component. */}
      <main className="flex-1 ml-16 md:ml-60 px-6 py-10 flex flex-col lg:flex-row gap-6"> {/* Main content area, responsive layout. */}
        {/* Left Column: Contains video player and full transcript section. */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{video.title}</h1> {/* Displays video title. */}
          <p className="text-sm text-gray-300 mb-6">{video.description}</p> {/* Displays video description. */}

          {/* Video Player Container with Subtitle Overlay */}
          <div
            ref={videoContainerRef} // Attach the ref from the hook to this div for fullscreen control.
            // Dynamically applies CSS classes for fullscreen mode.
            // 'fixed top-0 left-0 w-screen h-screen z-50 rounded-none' makes it fill the screen.
            className={`relative pt-[56.25%] w-full overflow-hidden rounded-xl shadow-lg mb-6 bg-black ${isFullscreen ? 'fixed top-0 left-0 w-screen h-screen z-50 rounded-none' : ''}`}
          >
            {/* YouTube Iframe Player container. The ID 'youtube-player' is crucial for the hook. */}
            <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>

            {/* Custom Fullscreen Button */}
            {playerReady && ( // Renders the button only when the YouTube player is ready.
              <button
                onClick={toggleFullscreen} // Calls the toggleFullscreen function from the hook on click.
                // Styling for the fullscreen button: positioned at top-right, semi-transparent, rounded, fades in on hover.
                className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full z-20 transition-opacity duration-200 opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
              >
                {/* Displays MinimizeIcon when in fullscreen, MaximizeIcon when not. */}
                {isFullscreen ? <MinimizeIcon size={24} /> : <MaximizeIcon size={24} />}
              </button>
            )}

            {/* Subtitle Overlay */}
            {playerReady && (activeJapaneseSubtitle || activeEnglishSubtitle) && ( // Renders only if player is ready and a subtitle is active.
              <div
                // Styling for the subtitle overlay: positioned at bottom-center, transparent background, rounded corners, max-width.
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-fit max-w-[90%] p-3 text-center bg-black bg-opacity-30 rounded-lg"
                style={{ zIndex: 10 }} // Ensures the overlay is visually above the video player.
              >
                {activeEnglishSubtitle && ( // Displays English subtitle if active.
                  <p className="text-gray-200 text-lg mb-1 leading-tight">
                    {activeEnglishSubtitle.text}
                  </p>
                )}
                {activeJapaneseSubtitle && ( // Displays Japanese subtitle if active.
                  <p
                    className="text-yellow-300 text-xl font-bold cursor-pointer hover:underline leading-tight"
                    onClick={() => handleJapaneseSubtitleClick(activeJapaneseSubtitle.text)} // Makes Japanese text clickable for word lookup.
                  >
                    {activeJapaneseSubtitle.text}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Original Full Subtitles Section (can be removed if overlay is sufficient, or kept for full transcript view) */}
          <div className="bg-white/5 rounded-xl p-4 shadow-inner">
            <h2 className="text-xl font-semibold mb-3">Full Transcript (Clickable)</h2> {/* Section title. */}
            {loadingSubtitles && <p className="text-gray-400">Loading subtitles...</p>} {/* Loading indicator. */}
            {errorSubtitles && <p className="text-red-400">Error loading subtitles: {errorSubtitles}</p>} {/* Error message. */}

            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2"> {/* Scrollable container for subtitles. */}
              {/* Message displayed if no subtitles are found after loading. */}
              {(!loadingSubtitles && !errorSubtitles && japaneseSubtitles.length === 0 && englishSubtitles.length === 0) && (
                <p className="text-gray-400">No subtitles available for this video (or failed to load).</p>
              )}

              {/* Maps through Japanese subtitles to display them alongside English counterparts. */}
              {Array.isArray(japaneseSubtitles) && japaneseSubtitles.map((jpSub, index) => {
                // Gets corresponding English subtitle, with robust array check.
                const enSub = Array.isArray(englishSubtitles) ? englishSubtitles[index] : undefined;

                return (
                  <div key={jpSub.start + index} className="mb-3 p-2 rounded-lg transition-colors duration-200 hover:bg-white/10"> {/* Container for each dual subtitle line. */}
                    {enSub && <p className="text-gray-200 text-sm mb-1">{enSub.text}</p>} {/* Displays English subtitle if available. */}
                    <p
                      className="text-yellow-300 text-base cursor-pointer hover:underline"
                      onClick={() => handleJapaneseSubtitleClick(jpSub.text)} // Makes Japanese text clickable.
                    >
                      {jpSub.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Word Details Panel */}
        {showWordDetailsPanel && ( // Renders the panel only when 'showWordDetailsPanel' is true.
          <div className="w-full lg:w-80 bg-white/5 rounded-xl p-4 shadow-lg flex-shrink-0 max-h-[calc(100vh-80px)] overflow-y-auto"> {/* Styling for the word details panel. */}
            <h2 className="text-xl font-semibold mb-3">Word Breakdown</h2> {/* Panel title. */}
            {loadingWordData && <p className="text-gray-400">Loading word data...</p>} {/* Loading indicator. */}
            {errorWordData && <p className="text-red-400">Error: {errorWordData}</p>} {/* Error message. */}

            {!loadingWordData && !errorWordData && selectedWordData && ( // Renders content when not loading, no error, and data is present.
              <div>
                {Array.isArray(selectedWordData) && selectedWordData.length > 0 ? ( // Checks if word data is an array and not empty.
                  <div className="space-y-4"> {/* Container for individual word details. */}
                    {selectedWordData.map((wordInfo, idx) => ( // Maps through each word in the selected data.
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
                  <p className="text-gray-400">No detailed breakdown available for this phrase.</p> // Message if no breakdown found.
                )}
              </div>
            )}
            {!loadingWordData && !errorWordData && !selectedWordData && ( // Message when panel is open but no word is selected.
              <p className="text-gray-400">Click on a Japanese subtitle line to see word details here.</p>
            )}
            <button
              onClick={() => setShowWordDetailsPanel(false)} // Hides the word details panel on click.
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200" // Styling for the close button.
            >
              Close
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
