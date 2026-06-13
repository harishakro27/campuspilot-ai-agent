export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-8 shadow-lg">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🎓</span>
          <h1 className="text-4xl font-bold">CampusPilot AI</h1>
        </div>
        <p className="text-blue-100 mt-2 ml-16">
          Your Personal AI Study Assistant & Smart Agent
        </p>
        <div className="mt-4 ml-16 flex gap-4 text-sm text-blue-50">
          <span>✨ Powered by Google Gemini</span>
          <span>•</span>
          <span>⚡ Lightning Fast Responses</span>
          <span>•</span>
          <span>📚 Smart Study Planning</span>
        </div>
      </div>
    </header>
  );
}
