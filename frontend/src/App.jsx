import { useState } from 'react';
import Header from './components/Header';
import Chat from './components/Chat';
import StudyPlanner from './components/StudyPlanner';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            💬 Chat with AI
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
              activeTab === 'planner'
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            📚 Study Planner
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {activeTab === 'chat' && <Chat />}
          {activeTab === 'planner' && <StudyPlanner />}
        </div>
      </div>
    </div>
  );
}
