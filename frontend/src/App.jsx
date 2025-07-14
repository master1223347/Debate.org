import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import PlayerVsAI from './components/PlayerVsAI';
import PlayerVsPlayer from './components/PlayerVsPlayer';
import Messages from './components/Messages';
import Spectate from './components/Spectate';
import Profile from './components/Profile';

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
