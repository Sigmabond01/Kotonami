import { Search, SearchIcon } from "lucide-react";

export default function Searchbar() {
    return (
        <div className="flex justify-center mb-8">
            <div className="flex items-center px-6 py-3 transition-all duration-300 rounded-lg bg-white/10 w-[90%]">
            <SearchIcon className="mr-3" />
            <input
        type="text"
        placeholder="Search here..."
        className="bg-transparent w-[90%]"
      />
      </div>
      </div>
    );
}