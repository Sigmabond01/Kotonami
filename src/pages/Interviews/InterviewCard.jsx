    import { Link } from "react-router-dom";

    export function InterviewCard({ interview }) {
      return (
        <Link to={`/interviews/${interview.slug}`}>
          <div className="bg-white/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <img
              src={interview.thumbnail}
              alt={interview.title}
              className="w-full h-[225px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{interview.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{interview.description}</p>
            </div>
          </div>
        </Link>
      );
    }