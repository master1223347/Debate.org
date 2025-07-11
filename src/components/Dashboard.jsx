import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 shadow-md flex flex-col gap-4">
        <button className="btn">Player vs AI</button>
        <button className="btn">Player vs Player</button>
        <button className="btn">Messages</button>
        <button className="btn" onClick={() => navigate('/learn')}>Learn</button>
        <button className="btn">Spectate</button>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-6 relative bg-gray-100">
        {/* Profile Button */}
        <div className="absolute top-4 right-4">
          <button className="btn">Profile</button>
        </div>

        {/* Lobby Section */}
        <div className="flex justify-center items-center h-full">
          <div className="bg-white p-8 rounded shadow-lg">Lobby</div>
        </div>
      </div>
    </div>
  );
}