export default function AnimeModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-[#1e1e1e] text-white p-6 rounded-2xl w-full max-w-[600px] relative">
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-white hover:text-red-500"
          onClick={onClose}
        >
          ×
        </button>

        <img src={item.image} alt={item.title} className="rounded-xl mb-4 w-full h-64 object-cover" />
        <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
        <p className="mb-2"><span className="font-semibold">Level:</span> {item.level}</p>
        <p><span className="font-semibold">Subtitles:</span> {item.subtitles.join(", ")}</p>
      </div>
    </div>
  );
}
