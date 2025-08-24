import { Link } from "react-router-dom";

export function ContentCard({ slugBase, item }) {
  return (
    <Link to={`/${slugBase}/${item.slug}`}>
      <div className="bg-gradient-to-br font-mincho from-slate-800 to-blue-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-900/25 transition-all duration-300 hover:border-blue-600/40 group h-100 flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-[225px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5 bg-gradient-to-b from-slate-800 to-slate-900 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors duration-200 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-blue-300/80 mt-2 leading-relaxed group-hover:text-blue-200/90 transition-colors duration-200 line-clamp-3 flex-1">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
}