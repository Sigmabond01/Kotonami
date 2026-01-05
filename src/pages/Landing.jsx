import { useRef, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { About } from '../components/sections/Landing/About';
import { FeaturesSectionDemo } from '../components/sections/Landing/Features';
import { Footer } from '../components/sections/Landing/Footer';
import { VideoExample2 } from '../components/sections/Landing/VideoExample2';

import Hero from '../components/sections/Landing/Hero';
import Disclaimer from '../components/ui/misc/Disclaimer';

export default function Index() {
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
            <div className='space-y-28'>
              <div ref={aboutRef}><About /></div>
              <Disclaimer />
              <VideoExample2 />
              <div ref={featureRef}><FeaturesSectionDemo /></div>
              <Footer />
            </div>
          </>
        }
      />
    </Routes>

  );
}