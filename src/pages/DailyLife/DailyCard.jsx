    import { Link } from "react-router-dom";

    export function DailyCard({ daily }) {
      return (
        <Link to={`/dailylife/${daily.slug}`}>
          <div className="bg-white/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <img
              src={daily.thumbnail}
              alt={daily.title}
              className="w-full h-[220px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{daily.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{daily.description}</p>
            </div>
          </div>
        </Link>
      );
    }
    