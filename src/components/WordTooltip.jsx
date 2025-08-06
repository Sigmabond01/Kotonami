export default function WordTooltip({ wordData, onClose }) {
  if (!wordData) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-[#2a3a2a] text-white p-6 rounded-2xl w-full max-w-md border border-green-700 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-4xl font-bold mb-2 text-green-300">{wordData.word}</h3>
        <p className="text-xl text-white/80 mb-4">{wordData.reading}</p>
        <p className="text-lg text-white/60 mb-4">{wordData.romaji}</p>
        <p className="text-lg font-semibold">Meaning:</p>
        <p className="text-lg text-white/90 mb-4">{wordData.meaning}</p>
        {wordData.jlpt && (
          <span className="px-3 py-1 bg-blue-800 text-sm rounded-full">{wordData.jlpt.toUpperCase()}</span>
        )}
      </div>
    </div>
  );
}