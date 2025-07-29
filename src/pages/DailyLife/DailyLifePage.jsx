    import { DailyCard } from "./Dailycard";
    import { Sidebar } from "../../components/ui/Sidebar";

    const daily = [
      {
        slug: "jp-shopping",
        title: "Let's Go Shopping",
        thumbnail: "https://i.ytimg.com/vi/UJyBgOdh9IA/hqdefault.jpg",
        description: "You can listen to the conversation to enhance your Japanese speaking and comprehension skills! ",
      },
      {
        slug: "night-walk",
        title: "Night Walk in Nagoya",
        thumbnail: "https://img.youtube.com/vi/y7voh2JGmV0/maxresdefault.jpg",
        description: "Comprehensible Japanese Listening Practice! Listen to the conversation for your Japanese immersion!",
      },
      {
        slug: "kyoto-town",
        title: "Exploring an old town in Kyoto",
        thumbnail: "https://img.youtube.com/vi/2rf0xpYwdEs/maxresdefault.jpg",
        description: "Comprehensible Japanese Listening Practice! Listen to the conversation for your Japanese immersion!",
      },
      {
        slug: "kyoto-family",
        title: "Exploring Kyoto with Family – Casual Japanese Listening Practice",
        thumbnail: "https://img.youtube.com/vi/PfW2R1Ejwuo/maxresdefault.jpg",
        description: "Follow a casual family trip through Kyoto and absorb natural Japanese in a relaxed setting. Perfect for JLPT N4–N3 learners.",
      },
      {
  slug: "shopping-street",
  title: "Walking Through a Japanese Shopping Street – Daily Life & Culture",
  thumbnail: "https://img.youtube.com/vi/RA_VosefCG4/maxresdefault.jpg",
  description: "Explore a Japanese shopping street filled with vending machines, local food, and casual conversations. Ideal for JLPT N4–N3 listening practice."
},
{
  slug: "osaka-walk-talk",
  title: "Osaka Walk‑and‑Talk / Real Life Japanese Practice",
  thumbnail: "https://img.youtube.com/vi/OPJlI65cPGE/maxresdefault.jpg",
  description: "Wander Osaka's riverside with casual chat about food and local life. Great listening practice for JLPT N4–N3 learners."
},
{
  slug: "park-conversation",
  title: "Let's Learn Japanese in the Park – Beginner Listening Practice",
  thumbnail: "https://img.youtube.com/vi/rjmKQ-fjnyQ/maxresdefault.jpg",
  description: "Casual beginner Japanese dialogue in a tranquil park settin it is ideal for N5–N4 listening practice."
},
{
  slug: "dentist-visit",
  title: "Going to the Dentist – Comprehensible Japanese Vlog (EP.1)",
  thumbnail: "https://img.youtube.com/vi/Bz6oOeNgqGQ/maxresdefault.jpg",
  description: "Follow a calm day-in-the-life vlog with clear Japanese as the speaker visits the dentist. Perfect for N5–N4 learners."
},
{
  slug: "saturday-in-japan",
  title: "Japanese Listening Practice | A Saturday in Japan",
  thumbnail: "https://img.youtube.com/vi/r9EA4CpLUJo/maxresdefault.jpg",
  description: "Spend a typical Saturday in Japan with this beginner-friendly Japanese listening practice video. Great for immersive learning."
},
    ];

    export default function DailyLifePage() {
      return (
        <div className="flex min-h-screen bg-[#344532] text-white">
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
    