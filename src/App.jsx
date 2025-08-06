import './index.css';
import { useRef, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { About } from './components/About';
import { FeaturesSectionDemo } from './components/Features';
import { Footer } from './components/Footer';
import Hero from './components/Hero';

import  DailyLifePage  from './pages/DailyLife/DailyLifePage';
import DailyLifeDetail from './pages/DailyLife/DailyLifeDetail';

import PodcastPage from './pages/Pocasts/PodcastPage';
import Podcast from './pages/Pocasts/Podcast';

import InterviewPage from './pages/Interviews/InterviewPage';
import Interview from './pages/Interviews/Interview';
import AudioPage from './pages/AudioBooks/AudioPage';
import AudioBook from './pages/AudioBooks/Audiobook';
import AnimeDetail from './pages/Anime/AnimeDetail';
import Anime from './pages/Anime/Anime';
import AnimeWatch from './pages/Anime/AnimeWatch';

function App() {
  const aboutRef = useRef(null);
  const featureRef = useRef(null);
  const location = useLocation();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (!hasNavigated) {
      setHasNavigated(true);
      return;
    }
    const section = location.state?.scrollTo;
    if (section === 'about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'features') {
      featureRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hasNavigated, location]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <div ref={aboutRef}><About /></div>
            <div ref={featureRef}><FeaturesSectionDemo /></div>
            <Footer />
          </>
        }
      />
      <Route path="/dailylife" element={<DailyLifePage />} />
      <Route path="/dailylife/:slug" element={<DailyLifeDetail />} />

      <Route path="/podcasts" element={<PodcastPage />} />
      <Route path="/podcasts/:slug" element={<Podcast />} />

      <Route path="/interviews" element={<InterviewPage />} />
      <Route path="/interviews/:slug" element={<Interview />} />

      <Route path="/audiobooks" element={<AudioPage />} />
      <Route path="/audiobooks/:slug" element={<AudioBook />} />

      <Route path="/anime" element={<Anime />} />
      <Route path="/anime/:slug" element={<AnimeDetail />} />
      <Route path="/watch/:slug" element={<AnimeWatch />} />

    </Routes>
  );
}

export default App;
