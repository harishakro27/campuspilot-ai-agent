import { useState } from 'react';
import { agentAPI } from '../services/api';
import Loading from './Loading';

export default function StudyPlanner() {
  const [formData, setFormData] = useState({
    subject: '',
    deadline: '3 days',
    proficiency: 'beginner'
  });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim()) {
      setError('Subject nahi likha! Pehle subject likho.');
      return;
    }

    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      const response = await agentAPI.generateStudyPlan(
        formData.subject,
        formData.deadline,
        formData.proficiency
      );
      
      if (response.data.success) {
        setPlan(response.data.study_plan);
      } else {
        setError(`Error: ${response.data.message || 'Failed to generate plan'}`);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Network error';
      setError(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Study Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                📖 Subject:
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="e.g., DBMS, OOP, Web Dev"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                ⏰ Deadline:
              </label>
              <select
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="1 day">🔥 1 day</option>
                <option value="3 days">⚡ 3 days</option>
                <option value="1 week">📅 1 week</option>
                <option value="2 weeks">📆 2 weeks</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                📊 Your Level:
              </label>
              <select
                value={formData.proficiency}
                onChange={(e) => setFormData({...formData, proficiency: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="beginner">🌱 Beginner</option>
                <option value="intermediate">📈 Intermediate</option>
                <option value="advanced">🚀 Advanced</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 font-semibold transition mt-6 text-sm"
            >
              {loading ? '⏳ Generating...' : '✨ Generate Plan'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Result Section */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden flex flex-col">
        <div className="max-h-[500px] overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loading />
            </div>
          ) : plan ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  📚 {formData.subject} Study Plan ({formData.deadline})
                </h3>
              </div>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {plan}
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                ✅ Plan generated! Ab tum isko follow karo aur study karo! 🎯
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <div className="text-5xl mb-2">📝</div>
              <p className="text-center">Subject likho aur plan generate karo!</p>
              <p className="text-xs mt-2">Plan yahan appear hoga...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
