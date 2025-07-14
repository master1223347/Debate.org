import React from 'react';

export default function Spectate() {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-700">Spectate</h1>
        <div className="bg-blue-50 p-6 rounded-xl shadow border border-blue-200">
          <p className="text-gray-700 text-lg">Live and archived debates will be viewable here soon.</p>
        </div>
      </div>
    </div>
  );
}