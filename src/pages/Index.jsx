 import { useRef, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { About } from '../components/About';
import { FeaturesSectionDemo } from '../components/Features';
import { Footer } from '../components/Footer';
import { VideoExample2 } from '../components/VideoExample2';

import MidnightMistWrapper from '../components/ui/MidnightMist';
import { Hero } from '../components/Hero';
import Disclaimer from '../components/Disclaimer';
 
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
      <MidnightMistWrapper>
        <div className='space-y-28'>
        <div ref={aboutRef}><About /></div>
        <Disclaimer />
        <VideoExample2 />
        <div ref={featureRef}><FeaturesSectionDemo /></div>
        <Footer />
        </div>
      </MidnightMistWrapper>
      </>
    }
  />
</Routes>

    );
}