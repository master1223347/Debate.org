import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlayerVsPlayer({ onMatchCreate }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    grade: '',
    level: 'Varsity',
    event: 'Public Forum',
    time: '3 min',
    style: 'Traditional',
    difficulty: 'Intermediate'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const match = {
      ...formData,
      id: Date.now(),
      status: 'waiting'
    };
    if (onMatchCreate) onMatchCreate(match);
    navigate('/');
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Create PVP Match</h1>
        <div className="space-y-6">
          <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
          <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="School" value={formData.school} onChange={e => handleChange('school', e.target.value)} />
          <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Grade" value={formData.grade} onChange={e => handleChange('grade', e.target.value)} />

          <div>
            <label className="font-semibold text-blue-700">Level</label>
            <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={formData.level} onChange={e => handleChange('level', e.target.value)}>
              <option>Varsity</option>
              <option>JV</option>
              <option>Novice</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-700">Debate Event</label>
            <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={formData.event} onChange={e => handleChange('event', e.target.value)}>
              <option>Public Forum</option>
              <option>Lincoln Douglas</option>
              <option>Congress</option>
              <option>Policy</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-700">Time Control</label>
            <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={formData.time} onChange={e => handleChange('time', e.target.value)}>
              <option>3 min</option>
              <option>5 min</option>
              <option>10 min</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-700">Style</label>
            <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={formData.style} onChange={e => handleChange('style', e.target.value)}>
              <option>Traditional</option>
              <option>Progressive</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-700">Difficulty</label>
            <select className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={formData.difficulty} onChange={e => handleChange('difficulty', e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition w-full mt-4" onClick={handleSubmit}>Create Match</button>
        </div>
      </div>
    </div>
  );
}
