import './index.css';
import { useRef, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { About } from './components/About';
import { FeaturesSectionDemo } from './components/Features';
import { Footer } from './components/Footer';
import Hero from './components/Hero';

import  DailyLifePage  from './pages/DailyLife/DailyLifePage';
import DailyLifeDetail from './pages/DailyLife/DailyLifeDetail';

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
    </Routes>
  );
}

export default App;
