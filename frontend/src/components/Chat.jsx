import { useState, useRef, useEffect } from 'react';
import { assistantAPI } from '../services/api';
import Loading from './Loading';

export default function Chat() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Namaste! 🙏 Main tumhara AI Assistant hoon. Kuch bhi poocho - OOP, DBMS, Web Dev, Algorithms, ya kuch aur! 📚\n\nJab main sochta hoon, tum wait karna. Main 2-3 seconds mein reply de dunga! ⚡' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const response = await assistantAPI.ask(userMessage);
      if (response.data.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.data.response
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `❌ Error: ${response.data.message || 'Failed to get response'}`
        }]);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Network error';
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Error: ${errorMsg}. Pehle check karo ke backend running hai (port 5000 par) aur GEMINI_API_KEY set hai .env mein!`
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen md:h-[600px]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg text-sm md:text-base break-words ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow'
                : 'bg-gray-200 text-gray-800 rounded-bl-none shadow'
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && <Loading />}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Apna question likho... e.g., 'Explain OOP'"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 font-semibold transition text-sm"
        >
          {loading ? '⏳' : '📤'}
        </button>
      </form>
    </div>
  );
}
