// src/hooks/useVideoSubtitles.js
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Maximize, Minimize } from 'lucide-react';

const getYouTubeVideoId = (url) => {
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
  const [playerReady, setPlayerReady] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [activeJapaneseSubtitle, setActiveJapaneseSubtitle] = useState(null);
  const [activeEnglishSubtitle, setActiveEnglishSubtitle] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => { // Fixed typo: onYoutubeIframeAPIReady -> onYouTubeIframeAPIReady
      if (youtubeVideoId) {
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
              console.log("YouTube Player Ready:", event.target); // Consistent log message
            },
            'onStateChange': (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                const updateTime = () => {
                  if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                    setCurrentVideoTime(playerRef.current.getCurrentTime());
                  }
                  if (playerRef.current && playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
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
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else if (youtubeVideoId) {
      window.onYouTubeIframeAPIReady(); // Fixed typo: onYoutubeIframeAPIReady -> onYouTubeIframeAPIReady
    }
    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      window.onYouTubeIframeAPIReady = null; // Fixed typo: onYoutubeIframeAPIReady -> onYouTubeIframeAPIReady
    };
  }, [youtubeVideoId]);

  useEffect(() => {
    if (!playerReady || japaneseSubtitles.length === 0) return;
    const jpActive = japaneseSubtitles.find(sub => {
      const start = timeToSeconds(sub.start);
      const end = timeToSeconds(sub.end);
      return currentVideoTime >= start && currentVideoTime < end;
    });
    setActiveJapaneseSubtitle(jpActive);

    if (jpActive) {
      const jpIndex = japaneseSubtitles.indexOf(jpActive);
      if (englishSubtitles[jpIndex]) {
        setActiveEnglishSubtitle(englishSubtitles[jpIndex]);
      } else {
        setActiveEnglishSubtitle(null);
      }
    } else {
      setActiveEnglishSubtitle(null);
    }
  }, [currentVideoTime, playerReady, japaneseSubtitles, englishSubtitles]);

  useEffect(() => {
    const fetchSubtitles = async () => {
      if (!youtubeVideoId) {
        setErrorSubtitles("Video ID not found for this video. Cannot fetch subtitles."); // Consistent error message
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
        console.error("Error fetching subtitles:", err); // Consistent error message
        setErrorSubtitles("Failed to load subtitles. Please check server logs and video ID."); // Consistent error message
      } finally {
        setLoadingSubtitles(false);
      }
    };
    fetchSubtitles();
  }, [youtubeVideoId]);

  const toggleFullscreen = useCallback(() => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => { // Fixed typo: requestFullScreen -> requestFullscreen
        console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement); // Fixed logic: !document.fullscreenElement -> !!document.fullscreenElement
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

  const MaximizeIcon = Maximize;
  const MinimizeIcon = Minimize;

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
    MaximizeIcon,
    MinimizeIcon,
  };
};
