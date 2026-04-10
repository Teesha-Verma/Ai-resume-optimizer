import React from 'react';
import CustomCursor from '../components/landing/CustomCursor';
import LandingNavbar from '../components/landing/LandingNavbar';
import Hero from '../components/landing/Hero';
import Problem from '../components/landing/Problem';
import Workflow from '../components/landing/Workflow';
import Features from '../components/landing/Features';
import Compare from '../components/landing/Compare';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

function LandingPage() {
  return (
    <div className="bg-[var(--bg)] text-[var(--text)] font-sans font-light min-h-screen overflow-x-hidden">
      <CustomCursor />
      <LandingNavbar />
      <Hero />
      <Problem />
      <Workflow />
      <Features />
      <Compare />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;
