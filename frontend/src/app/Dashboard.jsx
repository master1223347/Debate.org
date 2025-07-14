import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import MagicBento from '../components/MagicBento';


export default function Dashboard({ pvpMatches, handleMatchCreate, acceptMatch }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Main Area - remove sidebar */}
      <div className="flex-1 p-0 relative bg-black min-h-screen">
        {/* Hero Section as Full-Width Section */}
        <Hero />
        {/* Rectangular Architecture Layout - replaced with MagicBento */}
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>
    </div>
  );
}
