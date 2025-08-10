import './index.css';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

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
import Index from './pages/Index';

function App() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Index />
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
    </motion.div>
    </AnimatePresence>
  );
}

export default App;
