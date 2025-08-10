export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#0f172a] to-[#334155] text-white font-mincho">
      <div className="text-4xl font-light tracking-widest mb-2">
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "2s" }}
        >
          琴
        </span>
        <span
          className="inline-block animate-bounce"
          style={{ animationDelay: "0.2s", animationDuration: "2s" }}
        >
          波
        </span>
      </div>
      <div className="relative overflow-hidden">
        <div className="text-xs tracking-wider border-t border-blue-500 pt-2 animate-fade-in">
          KOTONAMI
        </div>
      </div>
      <div className="flex space-x-1 mt-4">
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: "0.6s" }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
