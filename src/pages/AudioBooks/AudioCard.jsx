    import { Link } from "react-router-dom";

    export function AudioCard({ audio }) {
      return (
        <Link to={`/audiobooks/${audio.slug}`}>
          <div className="bg-white/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <img
              src={audio.thumbnail}
              alt={audio.title}
              className="w-full h-[225px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{audio.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{audio.description}</p>
            </div>
          </div>
        </Link>
      );
    }
    