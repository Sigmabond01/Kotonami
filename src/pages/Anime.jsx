import Sidebar from "../components/ui/Sidebar";

export default function Anime() {
  return (
      <div className="flex bg-black min-h-screen text-white">
        <Sidebar />
  
        <div className="flex-1 ml-16 md:ml-60 p-8">
          <h1 className="text-3xl font-bold mb-4">Anime Page</h1>
          <p className="text-zinc-300">
            Browse all the Japanese movies with anime subtitles and full immersion.
          </p>
        </div>
      </div>
    );
}
