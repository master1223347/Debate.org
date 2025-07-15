import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Lobby({ matches, acceptMatch }) {
  const navigate = useNavigate();

  const openMatches = matches.filter(m => m.status === 'waiting');

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-[#0b0118] p-8 rounded-2xl shadow-xl border border-purple-800">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-sm text-purple-400 hover:text-purple-200 transition"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-4xl font-extrabold text-purple-300 mb-6">Available Matches</h1>

        {openMatches.length === 0 ? (
          <div className="text-purple-300 text-center mt-16">No open match requests yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {openMatches.map((match, idx) => (
              <div
                key={match.id}
                className="bg-black border border-purple-700 rounded-xl p-6 shadow-md"
              >
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-purple-200 mb-2">{match.name} ({match.level})</h2>
                    <p className="text-sm text-purple-300">
                      {match.school} — Grade {match.grade}<br />
                      <span className="text-white font-medium">{match.event}</span> · {match.time} · {match.style} · {match.difficulty}
                    </p>
                  </div>
                  <button
                    onClick={() => acceptMatch(match.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                  >
                    Accept Match
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
