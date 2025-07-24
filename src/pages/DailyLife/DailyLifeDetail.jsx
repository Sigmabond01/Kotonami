import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/ui/Sidebar";

const videos = {
  "buying-snacks-osaka": {
    title: "Buying Snacks in Osaka",
    embedUrl: "https://www.youtube.com/embed/UJyBgOdh9IA?si=4ZFx0AdyiVTWDaIf",
    description: "Follow a native speaker as they explore snacks in an Osaka konbini. Listen to real-world phrases, accents, and context."
  },
  // add more videos here later...
};

export default function DailyLifeDetail() {
  const { slug } = useParams();
  const video = videos[slug];

  if (!video) {
    return <div className="text-white p-10">Video not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#03240f] text-white">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-60 px-6 py-10">
        <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
        <p className="text-sm text-gray-300 mb-6">{video.description}</p>

        <div className="aspect-w-16 aspect-h-9 w-full max-w-4xl mb-8">
          <iframe
            className="w-full h-full rounded-xl"
            src={video.embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <p className="text-sm text-gray-400">Coming soon: Subtitles, vocabulary breakdown, and listening tools.</p>
      </main>
    </div>
  );
}
