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

  const filteredConversations = dummyConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = dummyConversations.find(conv => conv.id === selectedId);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Conversations List */}
      <div className="w-72 border-r bg-white flex flex-col rounded-r-3xl shadow-lg">
        <input
          type="text"
          placeholder="Search..."
          className="m-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-y-auto flex-1">
          {filteredConversations.map(conv => (
            <button
              key={conv.id}
              className={`w-full text-left p-5 border-b hover:bg-blue-50 transition ${conv.id === selectedId ? 'bg-blue-100 ring-2 ring-blue-400' : ''}`}
              onClick={() => setSelectedId(conv.id)}
            >
              <div className="font-bold text-blue-700">{conv.name}</div>
              <div className="text-sm text-gray-600 truncate">{conv.messages[conv.messages.length - 1]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Window */}
      <div className="flex-1 flex flex-col p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 flex flex-col h-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Messages</h2>
          <div className="flex-1 overflow-y-auto mb-4">
            {selectedConv.messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <span className={`inline-block px-4 py-2 rounded-lg shadow ${idx % 2 === 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}>{msg}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-auto">
            <input
              type="text"
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            />
            <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
