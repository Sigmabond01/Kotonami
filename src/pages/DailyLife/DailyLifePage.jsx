import { DailyCard } from "./Dailycard";
import { Sidebar } from "../../components/ui/Sidebar";

const daily = [
  {
    slug: "buying-snacks-osaka",
    title: "Buying Snacks in Osaka",
    thumbnail: "https://i.ytimg.com/vi/UJyBgOdh9IA/hqdefault.jpg",
    description: "Explore local snacks in Osaka’s vibrant streets.",
  },
  {
    slug: "tokyo-morning-routine",
    title: "Tokyo Morning Routine",
    thumbnail: "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg",
    description: "A relaxing daily morning routine in Tokyo.",
  },
  // add more
];

export default function DailyLifePage() {
  return (
    <div className="flex min-h-screen bg-[#0e2a1d] text-white">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-60 p-6">
        <h1 className="text-3xl font-bold mb-6">Daily Life in Japan</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {daily.map((daily) => (
            <DailyCard key={daily.slug} daily={daily} />
          ))}
        </div>
      </main>
    </div>
  );
}
