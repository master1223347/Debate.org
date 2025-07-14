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
    <div className="min-h-screen p-6 bg-gray-100">
      {!settingsSubmitted ? (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Create AI Match</h1>
          <div className="space-y-4">
            <div>
              <label className="font-semibold">Debate Event</label>
              <select className="w-full p-2 border rounded" value={settings.event} onChange={e => handleSettingChange('event', e.target.value)}>
                <option>Public Forum</option>
                <option>Lincoln Douglas</option>
                <option>Congress</option>
                <option>Policy</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">Time Control</label>
              <select className="w-full p-2 border rounded" value={settings.time} onChange={e => handleSettingChange('time', e.target.value)}>
                <option>3 min</option>
                <option>4 min</option>
                <option>5 min</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">Format Style</label>
              <select className="w-full p-2 border rounded" value={settings.style} onChange={e => handleSettingChange('style', e.target.value)}>
                <option>Traditional</option>
                <option>Progressive</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">Difficulty Level</label>
              <select className="w-full p-2 border rounded" value={settings.difficulty} onChange={e => handleSettingChange('difficulty', e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label className="font-semibold">Choose Your Side</label>
              <select className="w-full p-2 border rounded" value={settings.side} onChange={e => handleSettingChange('side', e.target.value)}>
                <option>Affirmative</option>
                <option>Negative</option>
                <option>Random</option>
              </select>
            </div>
            <button className="btn w-full mt-4" onClick={() => setSettingsSubmitted(true)}>Start Match</button>
          </div>
        </div>
      ) : !matchOver ? (
        <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Debate Round</h2>
            <button className="btn bg-red-500 hover:bg-red-600" onClick={() => setMatchOver(true)}>End Match</button>
          </div>
          <p className="mb-4">You: <strong>{playerSide}</strong> | AI: <strong>{aiSide}</strong></p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="font-semibold mb-2">You</h3>
              <textarea className="w-full p-2 border rounded mb-2" rows="4" placeholder="Your argument..." />
              <button className="btn">Submit Turn</button>
            </div>
            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="font-semibold mb-2">AI</h3>
              <div className="p-2 bg-white rounded border">AI response will appear here.</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Match Summary</h2>
          <p className="mb-2 text-gray-700">Event: {settings.event}</p>
          <p className="mb-2 text-gray-700">Side: {playerSide}</p>
          <p className="mb-2 text-gray-700">Format: {settings.style} | Time: {settings.time} | Difficulty: {settings.difficulty}</p>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h3 className="font-semibold">Summary:</h3>
            <p className="text-gray-600">You argued strongly on economic viability. The AI focused on ethics. You used stronger evidence and cross-application.</p>
          </div>
          <div className="text-xl font-bold text-green-600">🏆 Winner: You</div>
          <div className="mt-6">
            <button className="btn mr-2" onClick={() => setSettingsSubmitted(false)}>New Match</button>
            <button className="btn" onClick={() => navigate('/')}>Home</button>
          </div>
        </div>
      )}
    </div>
  );
}
