// src/hooks/useVideoSubtitles.js
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Maximize, Minimize } from 'lucide-react';

const getYouTubeVideoId = (url) => {
    if (!url) {
        return null;
    }
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const timeToSeconds = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.split(':');
    const seconds = parseFloat(parts.pop());
    const minutes = parseInt(parts.pop() || '0');
    const hours = parseInt(parts.pop() || '0');
    return hours * 3600 + minutes * 60 + seconds;
};

//  FIX 1: Add 'fetchEnglish = true' as a parameter
export const useVideoSubtitles = (videoEmbedUrl, fetchEnglish = true) => {
    const youtubeVideoId = getYouTubeVideoId(videoEmbedUrl);

    const [japaneseSubtitles, setJapaneseSubtitles] = useState([]);
    const [englishSubtitles, setEnglishSubtitles] = useState([]);
    const [loadingSubtitles, setLoadingSubtitles] = useState(true);
    const [errorSubtitles, setErrorSubtitles] = useState(null);

    const playerRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);
    const [currentVideoTime, setCurrentVideoTime] = useState(0);
    const [activeJapaneseSubtitle, setActiveJapaneseSubtitle] = useState(null);
    const [activeEnglishSubtitle, setActiveEnglishSubtitle] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const timeUpdateRef = useRef(null);

    const updateCurrentTime = useCallback(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
            setCurrentVideoTime(playerRef.current.getCurrentTime());
        }
    }, []);

    const startTimeTracking = useCallback(() => {
        if (timeUpdateRef.current) cancelAnimationFrame(timeUpdateRef.current);
        const animationUpdate = () => {
            updateCurrentTime();
            timeUpdateRef.current = requestAnimationFrame(animationUpdate);
        };
        timeUpdateRef.current = requestAnimationFrame(animationUpdate);
    }, [updateCurrentTime]);

    const stopTimeTracking = useCallback(() => {
        if (timeUpdateRef.current) {
            cancelAnimationFrame(timeUpdateRef.current);
        }
    }, []);

    useEffect(() => {
        window.onYouTubeIframeAPIReady = () => {
            if (youtubeVideoId) {
                if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                    playerRef.current.destroy();
                }
                playerRef.current = new window.YT.Player('youtube-player', {
                    videoId: youtubeVideoId,
                    playerVars: { 'autoplay': 0, 'controls': 1, 'enablejsapi': 1, 'rel': 0, 'modestbranding': 1, 'origin': window.location.origin, 'fs': 0 },
                    events: {
                        'onReady': () => setPlayerReady(true),
                        'onStateChange': (event) => {
                            if (event.data === window.YT.PlayerState.PLAYING) {
                                startTimeTracking();
                            } else {
                                stopTimeTracking();
                            }
                        },
                        'onError': () => stopTimeTracking()
                    }
                });
            }
        };
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(tag);
        } else if (youtubeVideoId) {
            window.onYouTubeIframeAPIReady();
        }
        return () => {
            stopTimeTracking();
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [youtubeVideoId, startTimeTracking, stopTimeTracking]);

    useEffect(() => {
        if (!playerReady || japaneseSubtitles.length === 0) return;

        const activeSub = japaneseSubtitles.find(sub => {
            const start = timeToSeconds(sub.start);
            const end = timeToSeconds(sub.end);
            return currentVideoTime >= start && currentVideoTime < end;
        });

        if (activeSub !== activeJapaneseSubtitle) {
            setActiveJapaneseSubtitle(activeSub || null);
            if (fetchEnglish && activeSub) {
                const subIndex = japaneseSubtitles.indexOf(activeSub);
                setActiveEnglishSubtitle(englishSubtitles[subIndex] || null);
            } else {
                setActiveEnglishSubtitle(null);
            }
        }
    }, [currentVideoTime, playerReady, japaneseSubtitles, englishSubtitles, activeJapaneseSubtitle, fetchEnglish]);

    useEffect(() => {
        const fetchSubtitles = async () => {
            if (!youtubeVideoId) {
                setLoadingSubtitles(false);
                return;
            }
            setLoadingSubtitles(true);
            setErrorSubtitles(null);
            setJapaneseSubtitles([]);
            setEnglishSubtitles([]);

            try {
                //  FIX 2: Make fetching conditional
                const jpPromise = axios.get(`http://localhost:3001/api/subtitles/${youtubeVideoId}?lang=ja`);
                if (fetchEnglish) {
                    const enPromise = axios.get(`http://localhost:3001/api/subtitles/${youtubeVideoId}?lang=en`);
                    const [jpRes, enRes] = await Promise.all([jpPromise, enPromise]);
                    setJapaneseSubtitles(Array.isArray(jpRes.data) ? jpRes.data : []);
                    setEnglishSubtitles(Array.isArray(enRes.data) ? enRes.data : []);
                } else {
                    const jpRes = await jpPromise;
                    setJapaneseSubtitles(Array.isArray(jpRes.data) ? jpRes.data : []);
                }
            } catch (err) {
                console.error("Error fetching subtitles:", err);
                setErrorSubtitles("Failed to load subtitles.");
            } finally {
                setLoadingSubtitles(false);
            }
        };
        fetchSubtitles();
    }, [youtubeVideoId, fetchEnglish]);

    const toggleFullscreen = useCallback(() => {
        if (!videoContainerRef.current) return;
        if (!document.fullscreenElement) {
            videoContainerRef.current.requestFullscreen().catch(err => console.error(err));
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return {
        japaneseSubtitles,
        englishSubtitles,
        loadingSubtitles,
        errorSubtitles,
        playerRef,
        videoContainerRef,
        playerReady,
        activeJapaneseSubtitle,
        activeEnglishSubtitle,
        isFullscreen,
        toggleFullscreen,
        MaximizeIcon: Maximize,
        MinimizeIcon: Minimize,
    };
};