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

export const useVideoSubtitles = (videoEmbedUrl) => {
  const youtubeVideoId = getYouTubeVideoId(videoEmbedUrl);

  const [japaneseSubtitles, setJapaneseSubtitles] = useState([]);
  const [englishSubtitles, setEnglishSubtitles] = useState([]);
  const [loadingSubtitles, setLoadingSubtitles] = useState(true);
  const [errorSubtitles, setErrorSubtitles] = useState(null);

  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const lastSubtitleIndexRef = useRef(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [activeJapaneseSubtitle, setActiveJapaneseSubtitle] = useState(null);
  const [activeEnglishSubtitle, setActiveEnglishSubtitle] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const timeUpdateRef = useRef(null);
  const intervalRef = useRef(null);

  const [subtitleOffset, setSubtitleOffset] = useState(0);

  const updateCurrentTime = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
      try {
        const time = playerRef.current.getCurrentTime();
        setCurrentVideoTime(time);
      } catch (error) {
        console.warn('Error getting current time:', error);
      }
    }
  }, []);

  const startTimeTracking = useCallback(() => {
    if (timeUpdateRef.current) {
      cancelAnimationFrame(timeUpdateRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const animationUpdate = () => {
      updateCurrentTime();
      timeUpdateRef.current = requestAnimationFrame(animationUpdate);
    };

    timeUpdateRef.current = requestAnimationFrame(animationUpdate);
    intervalRef.current = setInterval(updateCurrentTime, 100);
  }, [updateCurrentTime]);

  const stopTimeTracking = useCallback(() => {
    if (timeUpdateRef.current) {
      cancelAnimationFrame(timeUpdateRef.current);
      timeUpdateRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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
              startTimeTracking();
            },
            'onStateChange': (event) => {
              if (event.data === window.YT.PlayerState.PLAYING ||
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.BUFFERING) {
                startTimeTracking();
              }
              updateCurrentTime();
            },
            'onError': (event) => {
              console.error("YouTube Player Error:", event.data);
              stopTimeTracking();
            }
          }
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else if (youtubeVideoId) {
      window.onYouTubeIframeAPIReady();
    }

    return () => {
      stopTimeTracking();
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      window.onYouTubeIframeAPIReady = null;
    };
  }, [youtubeVideoId, startTimeTracking, stopTimeTracking, updateCurrentTime]);

  useEffect(() => {
    if (!playerReady || japaneseSubtitles.length === 0) {
      setActiveJapaneseSubtitle(null);
      setActiveEnglishSubtitle(null);
      return;
    }

    const adjustedTime = currentVideoTime + subtitleOffset;
    let newActiveSubtitle = null;
    let newActiveSubtitleIndex = -1;
    let searchIndex = lastSubtitleIndexRef.current;
    let currentSub = japaneseSubtitles[searchIndex];

    if (currentSub && adjustedTime < timeToSeconds(currentSub.start)) {
      lastSubtitleIndexRef.current = 0;
      searchIndex = 0;
    }

    for (let i = searchIndex; i < japaneseSubtitles.length; i++) {
      const sub = japaneseSubtitles[i];
      const start = timeToSeconds(sub.start);
      const end = timeToSeconds(sub.end);

      if (adjustedTime >= start && adjustedTime < end) {
        newActiveSubtitle = sub;
        newActiveSubtitleIndex = i;
        break;
      }

      if (start > adjustedTime) {
        break;
      }
    }

    if (newActiveSubtitle !== activeJapaneseSubtitle) {
      setActiveJapaneseSubtitle(newActiveSubtitle);

      if (newActiveSubtitleIndex !== -1 && englishSubtitles[newActiveSubtitleIndex]) {
        setActiveEnglishSubtitle(englishSubtitles[newActiveSubtitleIndex]);
      } else {
        setActiveEnglishSubtitle(null);
      }

      if (newActiveSubtitleIndex !== -1) {
        lastSubtitleIndexRef.current = newActiveSubtitleIndex;
      }
    }
  }, [currentVideoTime, playerReady, japaneseSubtitles, englishSubtitles, subtitleOffset, activeJapaneseSubtitle]);

  useEffect(() => {
    lastSubtitleIndexRef.current = 0;
  }, [youtubeVideoId]);

  useEffect(() => {
    const fetchSubtitles = async () => {
      if (!youtubeVideoId) {
        setErrorSubtitles("Video ID not found for this video. Cannot fetch subtitles.");
        setLoadingSubtitles(false);
        return;
      }

      setLoadingSubtitles(true);
      setErrorSubtitles(null);
      setJapaneseSubtitles([]);
      setEnglishSubtitles([]);

      try {
        const [jpRes, enRes] = await Promise.all([
          axios.get(`/api/subtitles/${youtubeVideoId}?lang=ja`),
          axios.get(`/api/subtitles/${youtubeVideoId}?lang=en`)
        ]);

        const jpSubs = Array.isArray(jpRes.data) ? jpRes.data : [];
        const enSubs = Array.isArray(enRes.data) ? enRes.data : [];

        setJapaneseSubtitles(jpSubs);
        setEnglishSubtitles(enSubs);
      } catch (err) {
        console.error("Error fetching subtitles:", err);
        setErrorSubtitles("Failed to load subtitles. Please check server logs and video ID.");
      } finally {
        setLoadingSubtitles(false);
      }
    };

    fetchSubtitles();
  }, [youtubeVideoId]);

  const toggleFullscreen = useCallback(() => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

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

  const adjustSubtitleOffset = useCallback((offsetSeconds) => {
    setSubtitleOffset(offsetSeconds);
  }, []);

  return {
    japaneseSubtitles,
    englishSubtitles,
    loadingSubtitles,
    errorSubtitles,
    playerRef,
    videoContainerRef,
    playerReady,
    currentVideoTime,
    activeJapaneseSubtitle,
    activeEnglishSubtitle,
    isFullscreen,
    toggleFullscreen,
    MaximizeIcon: Maximize,
    MinimizeIcon: Minimize,
    subtitleOffset,
    adjustSubtitleOffset,
  };
};