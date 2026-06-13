export default function Loading() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-1 bg-white rounded-full"></div>
      </div>
      <span className="ml-3 text-gray-600 font-semibold">🤔 Soch raha hoon...</span>
    </div>
  );
}
