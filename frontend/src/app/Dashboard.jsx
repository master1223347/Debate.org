import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MagicBento from '../components/MagicBento';


export default function Dashboard({ pvpMatches, handleMatchCreate, acceptMatch }) {
  const navigate = useNavigate();


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-400 p-6 shadow-lg flex flex-col gap-6 rounded-r-3xl">
        <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-50 transition" onClick={() => navigate('/ai')}>Player vs AI</button>
        <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-50 transition" onClick={() => navigate('/pvp')}>Player vs Player</button>
        <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-50 transition" onClick={() => navigate('/messages')}>Messages</button>
        <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-50 transition" onClick={() => navigate('/learn')}>Learn</button>
        <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-50 transition" onClick={() => navigate('/spectate')}>Spectate</button>
        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition mt-4" onClick={() => navigate('/profile')}>Profile</button>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-0 relative bg-black min-h-screen">
        {/* Hero Section as Full-Width Section */}
        <section className="relative w-full min-h-[32rem] md:min-h-[38rem] flex flex-col items-center justify-center text-center overflow-hidden mb-12">
          <img
            src="https://miro.medium.com/v2/resize:fit:1200/1*Ga5plNQ8acOlDATrhHArGQ.jpeg"
            alt="Harvey Specter Mad Aura"
            className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm scale-105"
          />
          <div className="relative z-10 w-full px-4 flex flex-col items-center justify-center">
            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 drop-shadow-2xl mb-6 tracking-tight animate-fade-in-down">Step into the Arena</h1>
            <p className="text-2xl md:text-3xl text-white font-semibold mb-10 animate-fade-in-up drop-shadow-lg max-w-2xl mx-auto">Challenge yourself, sharpen your skills, and join a community of passionate debaters. The world is watching—make your mark.</p>
            <div className="flex gap-8 animate-fade-in-up justify-center">
              <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white text-xl font-bold py-4 px-10 rounded-2xl shadow-2xl transition transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 border-2 border-white/30">Start Practicing</button>
              <button className="bg-white/80 hover:bg-white text-blue-700 text-xl font-bold py-4 px-10 rounded-2xl shadow-2xl border-2 border-blue-400 transition transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2">Browse Cases</button>
            </div>
            <div className="mt-10 flex justify-center gap-4 animate-fade-in-up">
              <span className="inline-block w-3 h-3 rounded-full bg-pink-400 shadow-lg animate-pulse" />
              <span className="inline-block w-3 h-3 rounded-full bg-purple-400 shadow-lg animate-pulse" />
              <span className="inline-block w-3 h-3 rounded-full bg-blue-400 shadow-lg animate-pulse" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent z-0" />
          <div className="absolute top-0 left-0 w-32 h-32 bg-pink-400/30 rounded-full blur-2xl z-0 animate-float" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400/30 rounded-full blur-2xl z-0 animate-float" />
        </section>
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
