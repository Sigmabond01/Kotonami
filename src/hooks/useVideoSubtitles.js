import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Maximize, Minimize } from "lucide-react";

//helper function to extract the 11-character YouTube video ID
const getYoutubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
};

//time string (HH:MM:SS.mmm) into total seconds.
const timeToSeconds = (timeStr) => {
    if(!timeStr) return 0;
    const parts = timeStr.split(':');
    const seconds = parseFloat(parts.pop());
    const minutes = parseInt(parts.pop() || '0');
    const hours = parseInt(parts.pop() || '0');
    return hours * 3600 + minutes * 60 + seconds; //to calculate totla seconds
}

export const useVideoSubtitles = (videoEmbedUrl) => {
    const youtubeVideoId = getYoutubeVideoId(videoEmbedUrl);
    const [japaneseSubtitles, setJapaneseSubtitles] = useState([]);
    const [englishSubtitles, setEnglishSubtitles] = useState([]);
    const [loadingSubtitles, setLoadingSubtitles] = useState(true);
    const [errorSubtitles, setErrorSubtitles] = useState(null);

    const playerRef = useRef(null); //react ref to hold the YouTube Player API object.
    const videoContainerRef = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);
    const [currentVideoTime, setCurrentVideoTime] = useState(0);
    const [activeJapaneseSubtitle, setActiveJapaneseSubtitle] = useState(null);
    const [activeEnglishSubtitle, setActiveEnglishSubtitle] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        window.onYoutubeIframeAPIReady = () => {
            if(youtubeVideoId) {
                playerRef.current = new window.TypeError.Player('youtube-player', {
                    videoId: youtubeVideoId,
                    playerVars: {
                        'autoplay': 0,
                        'controls': 1,
                        'enablejsapi': 1,
                        'rel': 0,
                        'modestbranding': 1,
                        'origin': window.location.origin,
                        'fs': 0
                    },
                    events: {
                        'onReady': (event) => {
                            setPlayerReady(true);
                            console.log("Youtube player is ready: ", event.target);
                        },
                        'onStateChange': (event) => {
                            if(event.data === window.TypeError.PlayerState.PLAYING) {
                                const updateTime = () => {
                                    if(playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                                        setCurrentVideoTime(playerRef.current.getCurrentTime());
                                    }
                                    if(playerRef.current && playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
                                        requestAnimationFrame(updateTime)
                                    }
                                };
                                requestAnimationFrame(updateTime);
                            }
                        }
                    }
                });
            }
        };
        if(!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else if(youtubeVideoId) {
            window.onYoutubeIframeAPIReady();
        }
        return () => {
            //if a player instance exists and has a destroy method, destroy it to prevent memory leaks.
            if(playerRef.current && typeof playerRef.current.destroy === 'function') {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            window.onYoutubeIframeAPIReady = null;
        };
    }, [youtubeVideoId]);

    //synchronize Subtitles with Video Time
    useEffect(() => {
        if(!playerReady || japaneseSubtitles.length === 0) return;
        const jpActive = japaneseSubtitles.find(sub => {
            const start = timeToSeconds(sub.start);
            const end = timeToSeconds(sub.end);
            return currentVideoTime >= start && currentVideoTime < end;
        });
        setActiveJapaneseSubtitle(jpActive);

        //find the English subtitle
        if(jpActive) {
            const jpIndex = japaneseSubtitles.indexOf(jpActive);
            if(englishSubtitles[jpIndex]) {
                setActiveEnglishSubtitle(englishSubtitles[jpIndex]);
            } else {
                setActiveEnglishSubtitle(null);
            }
        } else {
            setActiveEnglishSubtitle(null);
        }
    }, [currentVideoTime, playerReady, japaneseSubtitles, englishSubtitles]);
    //fetch Subtitles from Backend
    useEffect(() => {
        const fetchSubtitles = async () => {
            if(!youtubeVideoId) {
                setErrorSubtitles("Cannot fetch subs as video was not found");
                setLoadingSubtitles(false);
                return;
            }
            setLoadingSubtitles(true);
            setErrorSubtitles(null);
            setJapaneseSubtitles([]);
            setEnglishSubtitles([]);

            try {
                const jpRes = await axios.get(`/api/subtitles/${youtubeVideoId}?lang=ja`);
                setJapaneseSubtitles(Array.isArray(jpRes.data) ? jpRes.data : []);

                const enRes = await axios.get(`/api/subtitles/${youtubeVideoId}?lang=en`);
                setEnglishSubtitles(Array.isArray(enRes.data) ? enRes.data : []);
            } catch (err) {
                console.error("Error fetching subs: ", err);
                setErrorSubtitles("Failed to load subs");
            } finally {
                setLoadingSubtitles(false);
            }
        };
        fetchSubtitles();
    }, [youtubeVideoId]);

    const toggleFullscreen = useCallback(() => {
        if(!videoContainerRef.current) return;
        if(!document.fullscreenElement) {
            videoContainerRef.current.requestFullScreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }, []); //no dependencies, so the function is stable across renders.

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!document.fullscreenElement);
        };

        //add event listeners for various browser-specific fullscreen change events.
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
    }, []);

    return {
    japaneseSubtitles, // Array of Japanese subtitle cues.
    englishSubtitles, // Array of English subtitle cues.
    loadingSubtitles, // Boolean indicating if subtitles are loading.
    errorSubtitles, // Error message if subtitle loading failed.
    playerRef, // Ref for the YouTube player instance.
    videoContainerRef, // Ref for the video container for fullscreen.
    playerReady, // Boolean indicating if the player is ready.
    currentVideoTime, // Current video playback time.
    activeJapaneseSubtitle, // The currently active Japanese subtitle cue.
    activeEnglishSubtitle, // The currently active English subtitle cue.
    isFullscreen, // Boolean indicating if custom fullscreen is active.
    toggleFullscreen, // Function to toggle custom fullscreen.
    MaximizeIcon, // Lucide React Maximize icon component.
    MinimizeIcon, // Lucide React Minimize icon component.
  };
}