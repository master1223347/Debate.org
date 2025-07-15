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
    side: 'Random',
  });

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const assignSides = () => {
    if (settings.side === 'Random') {
      const sides = ['Affirmative', 'Negative'];
      return sides[Math.floor(Math.random() * 2)];
    }
    return settings.side;
  };

  const playerSide = assignSides();
  const aiSide = playerSide === 'Affirmative' ? 'Negative' : 'Affirmative';

  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center text-white">
      {!settingsSubmitted ? (
        <div className="max-w-2xl w-full bg-[#0b0118] p-8 rounded-2xl shadow-xl border border-purple-800">
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-sm text-purple-400 hover:text-purple-200 transition"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-extrabold text-purple-300 mb-6">Create AI Match</h1>
          <div className="space-y-6">
            {[
              { label: 'Debate Event', field: 'event', options: ['Public Forum', 'Lincoln Douglas', 'Congress', 'Policy'] },
              { label: 'Prep Time', field: 'time', options: ['3 min', '5 min', '10 min'] },
              { label: 'Style', field: 'style', options: ['Traditional', 'Progressive'] },
              { label: 'Difficulty', field: 'difficulty', options: ['Beginner', 'Intermediate', 'Advanced'] },
              { label: 'Side', field: 'side', options: ['Random', 'Affirmative', 'Negative'] },
            ].map(({ label, field, options }) => (
              <div key={field}>
                <label className="block mb-1 text-purple-400 font-semibold">{label}</label>
                <select
                  className="w-full p-3 bg-black text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={settings[field]}
                  onChange={e => handleSettingChange(field, e.target.value)}
                >
                  {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            ))}
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 px-6 rounded-lg shadow"
              onClick={() => setSettingsSubmitted(true)}
            >
              Start Match
            </button>
          </div>
        </div>
      ) : !matchOver ? (
        <div className="max-w-2xl w-full bg-[#0b0118] p-8 rounded-2xl shadow-xl border border-purple-800 text-center">
          <h2 className="text-2xl font-bold text-purple-300 mb-6">Debate Started!</h2>
          <div className="flex justify-center gap-8 mb-6">
            <div className="bg-purple-800 px-6 py-3 rounded-lg font-semibold">You: {playerSide}</div>
            <div className="bg-gray-700 px-6 py-3 rounded-lg font-semibold">AI: {aiSide}</div>
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
            onClick={() => setMatchOver(true)}
          >
            End Match
          </button>
        </div>
      ) : (
        <div className="max-w-2xl w-full bg-[#0b0118] p-8 rounded-2xl shadow-xl border border-purple-800 text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-6">Match Over!</h2>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
            onClick={() => navigate('/')}
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
