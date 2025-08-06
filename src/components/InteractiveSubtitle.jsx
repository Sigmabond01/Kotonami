import { useState, useEffect } from "react";
import axios from "axios";
import WordTooltip from "./WordTooltip";

export default function InteractiveSubtitle({ text }) {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const parseText = async () => {
      if (!text) {
        setWords([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3001/api/parse-japanese-text", { sentence: text });
        setWords(response.data);
      } catch (error) {
        console.error("Failed to parse sentence:", error);
        setWords([{ word: text, reading: '', romaji: '', meaning: 'Could not parse.' }]);
      } finally {
        setLoading(false);
      }
    };
    parseText();
  }, [text]);

  return (
    <div className="bg-black/20 rounded-lg p-4 min-h-[120px] flex flex-col justify-center text-center">
      {loading ? (
        <p className="text-2xl text-white/50">...</p>
      ) : (
        <div className="text-3xl text-white font-bold tracking-wider">
          {words.map((wordData, index) => (
            <span
              key={index}
              className="cursor-pointer hover:bg-green-800 rounded px-1 py-1 transition-colors duration-200"
              onClick={() => setSelectedWord(wordData)}
            >
              {wordData.word}
            </span>
          ))}
        </div>
      )}
      <WordTooltip wordData={selectedWord} onClose={() => setSelectedWord(null)} />
    </div>
  );
}