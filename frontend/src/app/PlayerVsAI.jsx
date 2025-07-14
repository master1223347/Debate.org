import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlayerVsAI() {
  const navigate = useNavigate();
  const [settingsSubmitted, setSettingsSubmitted] = useState(false);
  const [matchOver, setMatchOver] = useState(false);

  const [settings, setSettings] = useState({
    event: 'Public Forum',
    time: '3 min',
    style: 'Traditional',
    difficulty: 'Intermediate',
    side: 'Random'
  });

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const assignSides = () => {
    if (settings.side === 'Random') {
      const sides = ['Affirmative', 'Negative'];
      const rng = Math.floor(Math.random() * 2);
      return sides[rng];
    }
    return settings.side;
  };

  const playerSide = assignSides();
  const aiSide = playerSide === 'Affirmative' ? 'Negative' : 'Affirmative';

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      {!settingsSubmitted ? (
        <div className="max-w-2xl w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Create AI Match</h1>
          <div className="space-y-6">
            <div>
              <label className="font-semibold text-blue-700">Debate Event</label>
              <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={settings.event} onChange={e => handleSettingChange('event', e.target.value)}>
                <option>Public Forum</option>
                <option>Lincoln Douglas</option>
                <option>Congress</option>
                <option>Policy</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-blue-700">Time Control</label>
              <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={settings.time} onChange={e => handleSettingChange('time', e.target.value)}>
                <option>3 min</option>
                <option>5 min</option>
                <option>10 min</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-blue-700">Style</label>
              <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={settings.style} onChange={e => handleSettingChange('style', e.target.value)}>
                <option>Traditional</option>
                <option>Progressive</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-blue-700">Difficulty</label>
              <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={settings.difficulty} onChange={e => handleSettingChange('difficulty', e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-blue-700">Side</label>
              <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={settings.side} onChange={e => handleSettingChange('side', e.target.value)}>
                <option>Random</option>
                <option>Affirmative</option>
                <option>Negative</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition w-full mt-4" onClick={() => setSettingsSubmitted(true)}>Start Match</button>
          </div>
        </div>
      ) : !matchOver ? (
        <div className="max-w-2xl w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Debate Started!</h2>
          <div className="flex gap-8 mb-6">
            <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-semibold shadow">You: {playerSide}</div>
            <div className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow">AI: {aiSide}</div>
          </div>
          <button className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-green-600 transition" onClick={() => setMatchOver(true)}>End Match</button>
        </div>
      ) : (
        <div className="max-w-2xl w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Match Over!</h2>
          <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition" onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      )}
    </div>
  );
}
