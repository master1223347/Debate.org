import React, { useState } from 'react';

export default function Learn() {
  const [showRefutationInput, setShowRefutationInput] = useState(false);
  const [refutation, setRefutation] = useState("");

  const handleSubmitRefutation = () => {
    alert("Refutation submitted:\n" + refutation);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Learn & Train</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Refutation Drill</h2>
          <p className="mb-4">"The government should ban all private vehicles to combat climate change."</p>
          {!showRefutationInput ? (
            <button className="btn" onClick={() => setShowRefutationInput(true)}>
              Write Refutation
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <textarea
                className="w-full border rounded p-2"
                rows="4"
                placeholder="Type your refutation here..."
                value={refutation}
                onChange={(e) => setRefutation(e.target.value)}
              />
              <button className="btn" onClick={handleSubmitRefutation}>Submit</button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Impact Weighing</h2>
          <p className="mb-4">"Nuclear war vs Global Warming — which is more urgent and why?"</p>
          <button className="btn">Weigh Arguments</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Fallacy Finder</h2>
          <p className="mb-4">"If we don’t increase the defense budget, aliens will invade us."</p>
          <button className="btn">Identify Fallacy</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Summary Challenge</h2>
          <p className="mb-4">Summarize a round between an aff case on space exploration and neg case on economic justice.</p>
          <button className="btn">Write Summary</button>
        </div>
      </div>
    </div>
  );
}