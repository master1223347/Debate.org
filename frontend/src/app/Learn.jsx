import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const practiceModes = [
  'Summary Practice',
  'Impact Practice',
  'Fallacy Finder',
  'Refutation Practice',
  'Idea Construction',
  'Rhetoric Writing',
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
  ],
};

export default function Learn() {
  const navigate = useNavigate();
  const { mode, promptId } = useParams();
  const [input, setInput] = useState('');

  const readableMode = practiceModes.find(
    m => m.toLowerCase().replace(/\s+/g, '-') === mode
  );

  const prompts = readableMode ? promptOptions[readableMode] : [];

  const decodedPrompt = promptId ? decodeURIComponent(promptId) : null;

  const handleSubmit = () => {
    if (!decodedPrompt || !input.trim()) return;
    alert(`${readableMode}:\nPrompt: ${decodedPrompt}\nResponse:\n${input}`);
    setInput('');
    navigate(`/learn/${mode}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-[#0b0118] p-8 rounded-2xl shadow-xl border border-purple-800">
        {/* 🡨 Back Buttons */}
        <button
          onClick={() =>
            promptId
              ? navigate(`/learn/${mode}`)
              : mode
              ? navigate('/learn')
              : navigate('/')
          }
          className="mb-6 text-sm text-purple-400 hover:text-purple-200 transition"
        >
          ← {promptId ? 'Back to Prompts' : mode ? 'Back to Practice Modes' : 'Back to Dashboard'}
        </button>

        {/* 🎯 Page 1: Practice Mode Selection */}
        {!mode && (
          <>
            <h1 className="text-4xl font-extrabold text-purple-300 mb-8">Learn & Practice</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceModes.map((m) => (
                <button
                  key={m}
                  onClick={() =>
                    navigate(`/learn/${m.toLowerCase().replace(/\s+/g, '-')}`)
                  }
                  className="p-4 rounded-xl border border-purple-700 text-white hover:bg-purple-800 transition font-semibold shadow"
                >
                  {m}
                </button>
              ))}
            </div>
          </>
        )}

        {/* 📋 Page 2: Prompt Selection */}
        {mode && readableMode && !promptId && (
          <>
            <h2 className="text-2xl font-bold text-purple-300 mb-4">
              {readableMode} Prompts
            </h2>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    navigate(`/learn/${mode}/${encodeURIComponent(prompt)}`)
                  }
                  className="text-left p-4 rounded-lg border border-purple-700 text-purple-100 hover:bg-purple-900 transition shadow"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </>
        )}

        {/* 📝 Page 3: Prompt Response Page */}
        {promptId && decodedPrompt && (
          <>
            <h2 className="text-2xl font-bold text-purple-300 mb-6">
              {readableMode}
            </h2>
            <p className="text-purple-200 mb-4 bg-black p-4 border border-purple-700 rounded-lg shadow">
              {decodedPrompt}
            </p>
            <textarea
              placeholder="Write your response here..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full min-h-[120px] p-4 bg-black text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow"
            >
              Submit Practice
            </button>
          </>
        )}
      </div>
    </div>
  );
}
