import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto mt-4 mb-4 px-6 text-center">
      <div className="inline-flex items-start space-x-3 bg-amber-900/20 border border-amber-700/50 rounded-2xl px-5 py-4 shadow-lg">
        <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
        <p className="text-sm text-amber-200/90 leading-relaxed text-left">
          <span className="font-semibold text-amber-300">Heads up:</span>{" "}
          Kotonami is built with care, but <span className="underline">auto-generated YouTube subtitles aren’t perfect</span>.  
          Some words may be inaccurate so please double-check before relying on them.
        </p>
      </div>
    </div>
  );
}
