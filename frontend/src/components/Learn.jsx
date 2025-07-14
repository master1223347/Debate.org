import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const practiceModes = [
  'Summary Practice',
  'Impact Practice',
  'Fallacy Finder',
  'Refutation Practice',
  'Idea Construction',
  'Rhetoric Writing'
];

const promptOptions = {
  'Summary Practice': [
    'Summarize a round between an aff case on space exploration and neg case on economic justice.',
    'Summarize a debate between universal healthcare and private insurance.',
    'Summarize a round on free college vs economic strain.',
    'Summarize a debate over AI in warfare and human rights.',
  ],
  'Impact Practice': [
    'Nuclear war vs Global Warming — which is more urgent and why?',
    'AI takeover vs Economic collapse — which has greater impact?',
    'Pandemic vs Climate Change — which is more pressing globally?',
    'Government surveillance vs Civil liberty loss — weigh the impacts.',
  ],
  'Fallacy Finder': [
    'If we don’t increase the defense budget, aliens will invade us.',
    'Everyone cheats, so it must be okay.',
    'We shouldn’t listen to her; she’s never debated before.',
    'Either we ban social media or society collapses.',
  ],
  'Refutation Practice': [
    'The government should ban all private vehicles to combat climate change.',
    'Homework should be eliminated from all schools.',
    'Jury duty should be optional, not mandatory.',
    'Zoos should be abolished to protect animal rights.',
  ],
  'Idea Construction': [
    'Resolved: The United States should adopt a universal basic income.',
    'Resolved: Developed nations have a moral obligation to mitigate climate change.',
    'Resolved: Social media does more harm than good.',
    'Resolved: Artificial intelligence poses a greater threat than benefit.',
    'Resolved: The United States should ban the death penalty.'
  ],
  'Rhetoric Writing': [
    'Write a rhetorical argument about the importance of civic duty.',
    'Explain the value of dissent in a democracy.',
    'Argue for or against the use of emotional appeals in debate.',
    'Compose a rhetorical analysis on the concept of justice.',
  ]
};

export default function Learn() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    alert(`${selectedMode} submitted:\n` + input);
    setInput('');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Learn & Train</h1>
        {!selectedMode ? (
          <button className="btn" onClick={() => navigate('/')}>Home</button>
        ) : (
          <button className="btn bg-red-500 hover:bg-red-600" onClick={() => {
            selectedPrompt ? setSelectedPrompt(null) : setSelectedMode(null);
          }}>
            Back
          </button>
        )}
      </div>

      {!selectedMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {practiceModes.map(mode => (
            <button
              key={mode}
              className="btn text-left bg-white shadow-md p-6 rounded h-40 w-full flex items-center justify-center text-xl font-semibold"
              onClick={() => setSelectedMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      ) : !selectedPrompt ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {promptOptions[selectedMode].map((prompt, idx) => (
            <button
              key={idx}
              className="btn text-left bg-white shadow-md p-4 rounded h-40 w-full"
              onClick={() => setSelectedPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">{selectedMode}</h2>
          <p className="mb-4">{selectedPrompt}</p>
          <textarea
            className="w-full border rounded p-2 mb-4"
            rows="5"
            placeholder="Type your response here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="btn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}
