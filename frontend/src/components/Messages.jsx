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
    <div className="flex h-screen bg-gray-100">
      {/* Conversations List */}
      <div className="w-64 border-r bg-white flex flex-col">
        <input
          type="text"
          placeholder="Search..."
          className="m-2 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-y-auto flex-1">
          {filteredConversations.map(conv => (
            <button
              key={conv.id}
              className={`w-full text-left p-4 border-b hover:bg-gray-100 ${conv.id === selectedId ? 'bg-blue-100' : ''}`}
              onClick={() => setSelectedId(conv.id)}
            >
              <div className="font-semibold">{conv.name}</div>
              <div className="text-sm text-gray-600 truncate">{conv.messages[conv.messages.length - 1]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Window */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="border-b p-4 bg-white font-bold text-lg shadow flex justify-between items-center">
          <span>{selectedConv.name}</span>
          <button className="btn" onClick={() => navigate('/')}>Home</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {selectedConv.messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded max-w-md ${index % 2 === 0 ? 'bg-blue-100 self-start' : 'bg-gray-300 self-end'}`}
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type..."
            className="flex-1 p-2 border rounded mr-2"
          />
          <button className="btn" onClick={() => {
            if (newMessage.trim()) {
              selectedConv.messages.push(newMessage);
              setNewMessage('');
            }
          }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
