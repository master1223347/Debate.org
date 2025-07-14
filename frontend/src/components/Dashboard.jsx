import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Dashboard({ pvpMatches, handleMatchCreate, acceptMatch }) {
  const navigate = useNavigate();


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 shadow-md flex flex-col gap-4">
        <button className="btn" onClick={() => navigate('/ai')}>Player vs AI</button>
        <button className="btn" onClick={() => navigate('/pvp')}>Player vs Player</button>
        <button className="btn" onClick={() => navigate('/messages')}>Messages</button>
        <button className="btn" onClick={() => navigate('/learn')}>Learn</button>
        <button className="btn" onClick={() => navigate('/spectate')}>Spectate</button>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-6 relative bg-gray-100">
        {/* Profile Button */}
        <div className="absolute top-4 right-4">
          <button className="btn" onClick={() => navigate('/profile')}>Profile</button>
        </div>

        {/* Lobby Section */}
        <div className="h-full">
          <div className="bg-white p-6 rounded shadow-lg mb-4">
            <h2 className="text-2xl font-bold mb-4">Lobby</h2>
            {pvpMatches.length === 0 ? (
              <p className="text-gray-600">No matches yet.</p>
            ) : (
              <ul className="space-y-4">
                {pvpMatches.map(match => (
                  <li key={match.id} className="border rounded p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{match.name} ({match.level}) - {match.school}</p>
                        <p className="text-sm text-gray-600">{match.event} • {match.style} • {match.time} • {match.difficulty}</p>
                      </div>
                      {match.status === 'waiting' ? (
                        <button className="btn" onClick={() => acceptMatch(match.id)}>Accept Match</button>
                      ) : (
                        <span className="text-green-600 font-semibold">Match Accepted</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
