import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './app/Dashboard';
import Learn from './app/Learn';
import PlayerVsAI from './app/PlayerVsAI';
import PlayerVsPlayer from './app/PlayerVsPlayer';
import Messages from './app/Messages';
import Spectate from './app/Spectate';
import Profile from './app/Profile';

export default function App() {
  const [pvpMatches, setPvpMatches] = useState([]);

  const handleMatchCreate = (match) => {
    setPvpMatches((prev) => [...prev, match]);
  };

  const acceptMatch = (id) => {
    setPvpMatches((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'accepted' } : m))
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dashboard pvpMatches={pvpMatches} handleMatchCreate={handleMatchCreate} acceptMatch={acceptMatch} />}
        />
        <Route path="/learn" element={<Learn />} />
        <Route path="/ai" element={<PlayerVsAI />} />
        <Route path="/pvp" element={<PlayerVsPlayer onMatchCreate={handleMatchCreate} />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/spectate" element={<Spectate />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
