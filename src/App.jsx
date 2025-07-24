// App.js
import './index.css'
import { useRef, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { About } from './components/About'
import { FeaturesSectionDemo } from './components/Features'
import { Footer } from './components/Footer'
import Hero from './components/Hero'
import Movies from './pages/Interviews/Movies'
import TVSeries from './pages/Podcasts/TVSeries'
import Anime from './pages/DailyLife/Anime'
import Login from './pages/Login'
import MovieDetail from './pages/Interviews/MoviesDetail';
import AnimeDetail from './pages/DailyLife/AnimeDetail';
import TVSeriesDetail from './pages/Podcasts/TVSeriesDetail';

function App() {
  const aboutRef = useRef(null);
  const featureRef = useRef(null);
  const location = useLocation();
  const [hasNavigated, setHasNavigated] = useState(false);

  // on any navigation with state.scrollTo, auto‐scroll
  useEffect(() => {
    if (!hasNavigated) {
      setHasNavigated(true);
      return;
    }
    const section = location.state?.scrollTo;
    if (section === "about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "features") {
      featureRef.current?.scrollIntoView({ behavior: "smooth" });
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
      <Route path="/movies" element={<Movies />} />
      <Route path="/tvseries" element={<TVSeries />} />
      <Route path="/anime" element={<Anime />} />
      <Route path="/login" element={<Login />} />
      <Route path="/anime/:slug" element={<AnimeDetail />} />
      <Route path="/movies/:slug" element={<MovieDetail />} />
      <Route path="/tvseries/:slug" element={<TVSeriesDetail />} />
    </Routes>
  )
}

export default App
