import { cn } from "../lib/utils";
import {
  IconMovie,
  IconLanguageKatakana,
  IconSubtask,
  IconLayoutSidebarLeftCollapse,
  IconPlaylistAdd,
  IconVocabulary,
  IconCloudUpload,
  IconBookmark,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Stream Japanese Dramas",
      description: "Enjoy an ever-growing collection of J-dramas and anime — legally and freely.",
      icon: <IconMovie />,
    },
    {
      title: "Dual Subtitles",
      description: "Watch with both Japanese and English subtitles to boost comprehension.",
      icon: <IconSubtask />,
    },
    {
      title: "Word Meanings in Real Time",
      description: "Click on Japanese words in the subtitles to instantly get definitions and readings.",
      icon: <IconVocabulary />,
    },
    {
      title: "Grammar & Vocab Highlights",
      description: "Contextual grammar points and vocabulary notes appear as you watch.",
      icon: <IconLanguageKatakana />,
    },
    {
      title: "Scene-by-Scene Playback",
      description: "Break episodes into scenes to replay tricky dialogues until they’re second nature.",
      icon: <IconLayoutSidebarLeftCollapse />,
    },
    {
      title: "Curated Watchlists",
      description: "Choose from JLPT-based lists or genre-based recommendations.",
      icon: <IconPlaylistAdd />,
    },
    {
      title: "Progress Sync",
      description: "Keep your learning journey synced across devices — no data loss.",
      icon: <IconCloudUpload />,
    },
    {
      title: "Save & Rewatch",
      description: "Bookmark your favorite scenes, words, or episodes for targeted review.",
      icon: <IconBookmark />,
    },
  ];

  return (
    <section className="relative bg-[url('./bg4.jpg')] bg-contain bg-no-repeat dark:bg-[#1a271a] py-11">
      <div className="absolute inset-0 bg-black/50 z-0 backdrop-blur-sm" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-mincho font-semibold text-center text-green-200 dark:text-green-200 mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 ? (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#728a57] dark:from-[#2b3d2b] to-transparent pointer-events-none" />
      ) : (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#728a57] dark:from-[#2b3d2b] to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-green-200 dark:text-green-200">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-green-400 dark:bg-green-600 group-hover/feature:bg-green-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-green-200 dark:text-green-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-green-400 dark:text-green-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
