
export function Seriescard({ Series }) {
  return (
    <div className="bg-white/5 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 w-full">
      <img
        src={Series.image}
        alt={Series.title}
        className="w-full h-[320px] object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg text-white truncate">
          {Series.title}
        </h3>
        <span className="text-xs px-2 py-1 bg-green-700 rounded-full w-fit text-white">
          {Series.level}
        </span>
        <p className="text-xs text-white/70">
          Subs: {Series.subtitles.join(", ")}
        </p>
      </div>
    </div>
  );
}
