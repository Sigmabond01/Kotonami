import Sidebar from "../components/ui/Sidebar";
import Searchbar from "../components/ui/Searchbar";

export default function Movies() {
  return (
    <div className="flex bg-gradient-to-r from-[#23381e]  to-[#0d7012] min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-60 p-8">
        <Searchbar />
        <h1 className="text-3xl font-bold mb-4">Movies Page</h1>
        <p className="text-zinc-300">
          Browse all the Japanese movies with dual subtitles and full immersion.
        </p>
      </div>
    </div>
  );
}
