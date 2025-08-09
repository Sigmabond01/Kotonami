import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "../../components/ui/Sidebar";
import { useVideoSubtitles } from "../../hooks/useVideoSubtitles";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const videos = {
  "what-a-small-town-in-japan-is-like": {
  title: "What a Small Town in Japan Is Like – Life Where I'm From",
  embedUrl: "https://www.youtube.com/embed/IiU3Nk16BLQ",
  description: "The ‘Life Where I’m From’ team takes us to Kofu, Tottori—a village of just 2,500—reflecting on what everyday life looks like when your town is small and close-knit. Authentic, grounded Japanese narration walks you through local spaces, community rhythm, and quiet culture. Clean, immersive audio perfect for mid-level learners building real-world listening comfort."
},
"what-owning-ramen-restaurant-japan": {
  title: "What Owning a Ramen Restaurant in Japan Is Like",
  embedUrl: "https://www.youtube.com/embed/gmIwxqdwgrI",
  description: "‘Life Where I’m From’ gives a mini-documentary look at Kunimoto, the owner of Mengokoro Ramen in Tokyo. Follow his brutal 15-hour workdays, get a glimpse of every ingredient made fresh, and feel the sweat behind each bowl. A real, immersive lesson in Japanese food culture, work ethic, and the soul behind small, family-run businesses. A must-watch for learners chasing natural dialogue with cultural depth."
},
    "jp-shopping": {
        title: "Let's Go Shopping – 25 min Japanese Listening Practice",
        embedUrl: "https://www.youtube.com/watch?v=UJyBgOdh9IA",
        description: "Join a real-world 25-minute Japanese shopping interaction designed for immersive learning. This episode captures a natural conversation, perfect for JLPT N4–N3 learners practicing active listening, vocabulary recognition, and grammar spotting. Use this to shadow native speech or reinforce vocab in context."
    },
    "feeding-2200-japanese-students": {
  title: "Feeding 2,200 Hungry Japanese Students – School Lunch Prep",
  embedUrl: "https://www.youtube.com/embed/gBHZxcQcYgg",
  description: "This video offers a rare look behind the scenes at how a massive batch of school lunches is made in Japan—feeding 2,200 students in one go. From ingredient prep and hygiene practices to efficient serving, it’s a masterclass in food logistics and cultural craftsmanship—great for learners who want to build vocabulary around cooking, routines, and large-scale operations."
},
    "night-walk": {
        title: "Night Walk in Nagoya – 20min Japanese Listening Practice",
        embedUrl: "https://youtu.be/y7voh2JGmV0",
        description: "Immerse yourself in native-level Japanese as you follow a calm night walk through Nagoya. This 20-minute episode features slow, clear speech—perfect for JLPT N4–N3 learners. Listen actively, pick out grammar patterns, and click on words for instant meaning.",
    },
    "kyoto-town": {
        title: "Exploring an old town in Kyoto / Easy Japanese Vlog",
        embedUrl: "https://youtu.be/2rf0xpYwdEs",
        description: "Take a leisurely stroll through Kyoto’s charming old town in this Easy Japanese Vlog (N5–N4 level). Perfect for beginners and early intermediate learners, this immersive listening practice helps you absorb natural, slow-paced Japanese in a real setting.",
    },
    "24h-japanese-vending-eats": {
  title: "Eating at 24-Hour Japanese Vending Machines",
  embedUrl: "https://www.youtube.com/embed/pP8zmVly9e0",
  description: "Experience a midnight food run powered entirely by Japanese vending machines. No staff, no lines—just you, hot savory bites, and the hum of Tokyo's never-sleeping streets. This video captures native speech, casual ordering phrases, and cultural food rituals—ideal for advanced learners aiming to absorb authentic tone and vocabulary in ambient context."
},
    "kyoto-family": {
        title: "Exploring Kyoto with Family – Casual Japanese Listening Practice",
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
    "working-japanese-man-recharge": {
  title: "Recharge After Work: Japanese Salaryman & Comfort Food",
  embedUrl: "https://youtu.be/hcafMhQLZW0",
  description: "Follow a Japanese salaryman in his wind-down ritual—leaving the office, picking up piping hot comfort food, and savoring those first bites that signal ‘end of the day.’ It’s relaxed, natural Japanese speech in real daily life, perfect for learners aiming to strengthen listening skills and pick up casual mealtime vocabulary."
},
"kyoto-in-the-rain-vlog": {
  title: "KYOTO in the Rain – Temples, Gardens & Cozy Cafés",
  embedUrl: "https://www.youtube.com/embed/xVVVQjaD-pg",
  description: "Some of Kyoto’s hidden magic shows up when it rains. This travel vlog takes you through temples, lush gardens, and into charming cafés with warm atmospheres and soft chatter—ideal for immersive, ambient listening and learning natural Japanese."
},
"instant-noodle-cafe-24h": {
  title: "Eating at a 24-Hour Instant Noodle Café",
  embedUrl: "https://www.youtube.com/embed/K5Uk0ZnlVqc",
  description: "In this video, a creator explores a Malaysian instant noodle café that’s open 24/7. The setup includes vending machines stocked with noodle packets and toppings, letting customers prepare their own bowl around the clock. Perfect for immersive listening with natural Japanese narration, food culture vibes, and self-service tech in action."
},
"one-man-ramen-kitchen": {
  title: "One-Person Ramen Shop & Wok Mastery",
  embedUrl: "https://youtu.be/zmmDBLBaCc8",
  description: "This video captures the artistry and grit of a solo ramen chef hustling behind the counter. From hand-kneading noodles to wok-tossing fried rice and serving bowls of rich ramen, every step is handled with precision and passion—all without another staff member. A perfect pick for immersive listening, food vocabulary, and real-life kitchen rhythms."
},
"why-learn-a-foreign-language-146": {
  title: "Why Learn a Foreign Language? | 25-Min Japanese Listening Practice (#146)",
  embedUrl: "https://www.youtube.com/embed/l7ufokPMyM0",
  description: "A 25-minute episode of Comprehensible Japanese where the speaker reflects on *why* they—and perhaps *you*—learn foreign languages. Slow, natural Japanese with immersive context makes this perfect for mid-level listeners aiming to shape their motivation alongside their listening skills.",
},
"visiting-maid-cafe-akh": {
  title: "Visiting a Japanese Maid Café in Akihabara — ASMR Experience",
  embedUrl: "https://www.youtube.com/embed/u90AN5QpbXE",
  description: "Join 'It’s Time to Travel' as they explore @Home Café in Akihabara—filmed with permission—for a full ASMR-style experience. Meet Premium Maid Mizukin, enjoy 'Moe Moe Kyun♡' drink chants, omurice, sundae magic, and even a personalized Polaroid. A rare, dreamy glimpse into maid café culture with real Japanese ambiance and ritual."
},
"visiting-butler-cafe-swallowtail": {
  title: "Visiting a Japanese Butler Café – Swallowtail & Tailored Tea",
  embedUrl: "https://www.youtube.com/embed/b6lX96wONF4",
  description: "Step into Akihabara’s Swallowtail Butler Café with permission to film inside. Experience refined ASMR-level hospitality from butlers in tailcoats as they serve custom teas like 'Anna Maria', explain porcelain design, guide etiquette, and let you feel royal—even if just for an hour. It’s immersive Japanese conversation, cultural nuance, and class all wrapped in one."
},
"imaya-hotdog-grandpa": {
  title: "A Day in the Life of Japan’s Most Famous Grandpa’s Hot Dog Shop",
  embedUrl: "https://www.youtube.com/embed/VHkwt6yxVWk",
  description: "Join ‘Japanese Kitchen Tour’ on a visit to Imaya’s hot-dog stall in Fukuoka’s Nishi Park. Founded by Mr. Imasaki in 1972, this beloved stand continues to draw long lines with its rich history and handmade charm. Enjoy Japanese narration that delivers cultural context, food prep insight, and real-life dialogue all wrapped into one immersive listening experience."  
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
                      to="/dailylife"
                      className="group inline-flex items-center gap-2 py-2 text-blue-400 hover:text-blue-700 mb-6"
                    >
                      <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                        <span className="font-medium">Return to Daily Life</span>
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
                        {playerReady && (activeJapaneseSubtitle) && (
                            <div
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-fit max-w-[90%] p-3 text-center bg-black bg-opacity-30 rounded-lg"
                                style={{ zIndex: 10 }}
                            >
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
                </div>
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