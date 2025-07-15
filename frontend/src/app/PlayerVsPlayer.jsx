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
    difficulty: 'Intermediate',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const match = {
      ...formData,
      id: Date.now(),
      status: 'waiting',
    };
    if (onMatchCreate) onMatchCreate(match);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center text-white">
      <div className="max-w-2xl w-full bg-[#0b0118] p-8 rounded-2xl shadow-xl border border-purple-800">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-sm text-purple-400 hover:text-purple-200 transition"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-extrabold text-purple-300 mb-6">Create PVP Match</h1>
        <div className="space-y-6">
          {[
            { label: 'Name', field: 'name', type: 'text' },
            { label: 'School', field: 'school', type: 'text' },
            { label: 'Grade', field: 'grade', type: 'text' },
          ].map(({ label, field, type }) => (
            <input
              key={field}
              type={type}
              placeholder={label}
              value={formData[field]}
              onChange={e => handleChange(field, e.target.value)}
              className="w-full p-3 bg-black text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}

          {[
            { label: 'Level', field: 'level', options: ['Varsity', 'JV', 'Novice'] },
            { label: 'Debate Event', field: 'event', options: ['Public Forum', 'Lincoln Douglas', 'Congress', 'Policy'] },
            { label: 'Prep Time', field: 'time', options: ['3 min', '5 min', '10 min'] },
            { label: 'Style', field: 'style', options: ['Traditional', 'Progressive'] },
            { label: 'Difficulty', field: 'difficulty', options: ['Beginner', 'Intermediate', 'Advanced'] },
          ].map(({ label, field, options }) => (
            <div key={field}>
              <label className="block mb-1 text-purple-400 font-semibold">{label}</label>
              <select
                className="w-full p-3 bg-black text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData[field]}
                onChange={e => handleChange(field, e.target.value)}
              >
                {options.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          ))}

          <button
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
            onClick={handleSubmit}
          >
            Create Match
          </button>
        </div>
      </div>
    </div>
  );
}
