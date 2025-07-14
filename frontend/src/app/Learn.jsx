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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8">Learn & Practice</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {practiceModes.map(mode => (
            <button
              key={mode}
              className={`bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-4 px-6 rounded-xl shadow transition border border-blue-200 ${selectedMode === mode ? 'ring-2 ring-blue-400' : ''}`}
              onClick={() => setSelectedMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
        {selectedMode && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{selectedMode} Prompts</h2>
            <ul className="space-y-4">
              {promptOptions[selectedMode].map((prompt, idx) => (
                <li key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow hover:shadow-md transition">
                  <span className="text-gray-700">{prompt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
