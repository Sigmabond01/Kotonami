import Sidebar from "../../components/ui/Sidebar";
import Searchbar from "../../components/ui/Searchbar";
import { Seriescard } from "./Seriescard";
import { Series } from "./Seriesdata";

export default function TVSeries() {
  return (
    <div className="flex bg-gradient-to-r from-[#182c18]  to-[#012903] min-h-screen text-white font-mincho">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-60 p-8">
        <Searchbar />
        <div className="w-full max-w-[1280px] mx-auto px-4">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {Series.map((Series) => (
      <Seriescard key={Series.id} Series={Series} />
    ))}
  </div>
</div>
      </div>
    </div>
  );
}
