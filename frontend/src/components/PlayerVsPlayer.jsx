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
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Create PVP Match</h1>
        <div className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="School" value={formData.school} onChange={e => handleChange('school', e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Grade" value={formData.grade} onChange={e => handleChange('grade', e.target.value)} />

          <div>
            <label className="font-semibold">Level</label>
            <select className="w-full p-2 border rounded" value={formData.level} onChange={e => handleChange('level', e.target.value)}>
              <option>Varsity</option>
              <option>JV</option>
              <option>Novice</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Debate Event</label>
            <select className="w-full p-2 border rounded" value={formData.event} onChange={e => handleChange('event', e.target.value)}>
              <option>Public Forum</option>
              <option>Lincoln Douglas</option>
              <option>Congress</option>
              <option>Policy</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Time Control</label>
            <select className="w-full p-2 border rounded" value={formData.time} onChange={e => handleChange('time', e.target.value)}>
              <option>3 min</option>
              <option>4 min</option>
              <option>5 min</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Format Style</label>
            <select className="w-full p-2 border rounded" value={formData.style} onChange={e => handleChange('style', e.target.value)}>
              <option>Traditional</option>
              <option>Progressive</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Difficulty Level</label>
            <select className="w-full p-2 border rounded" value={formData.difficulty} onChange={e => handleChange('difficulty', e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <button className="btn w-full mt-4" onClick={handleSubmit}>Create Match</button>
        </div>
      </div>
    </div>
  );
}
