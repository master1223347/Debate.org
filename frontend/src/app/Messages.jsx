import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyConversations = [
  { id: 1, name: 'Wolf', messages: ['Yo', 'Wanna debate later?'] },
  { id: 2, name: 'Mary', messages: ['How was the last round?', 'GG!'] },
  { id: 3, name: 'Roman', messages: ['Let\'s team up', 'I have a new case idea.'] },
  { id: 4, name: 'Whitney', messages: ['Check the new prompt!'] },
  { id: 5, name: 'Jamie', messages: ['Haha nice one', 'You got me.'] },
  { id: 6, name: 'John', messages: ['Meet in the lobby?'] }
];

export default function Messages() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState(dummyConversations);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedId);

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedId
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      )
    );
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full h-[700px] bg-[#060010] rounded-2xl shadow-xl border border-purple-900 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-purple-900 p-4 bg-[#0b0118] flex flex-col">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-sm text-purple-400 hover:text-purple-200 transition"
          >
            ← Back to Dashboard
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="p-3 bg-black text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {/* 👇 ONLY this part scrolls, so layout height remains fixed */}
          <div className="space-y-2 overflow-y-auto flex-1 min-h-[200px]">
            {filteredConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={`w-full text-left p-3 rounded-lg transition ${
                  conv.id === selectedId
                    ? 'bg-purple-900 text-white ring-2 ring-purple-500'
                    : 'hover:bg-purple-800 text-white'
                }`}
              >
                <div className="font-bold">{conv.name}</div>
                <div className="text-sm text-purple-300 truncate">
                  {conv.messages[conv.messages.length - 1]}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-8 flex flex-col justify-between bg-[#060010] text-white">
          <div className="flex flex-col h-full overflow-hidden">
            <h2 className="text-3xl font-extrabold text-purple-300 mb-4">Messages</h2>
            <div className="space-y-2 overflow-y-auto mb-4 flex-1">
              {selectedConv.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <span className={`inline-block px-4 py-2 rounded-lg shadow ${
                    idx % 2 === 0 ? 'bg-purple-800 text-white' : 'bg-gray-700 text-white'
                  }`}>
                    {msg}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                className="flex-1 p-3 bg-black text-white border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Type a message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button
                className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
