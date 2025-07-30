import { Sidebar } from "../../components/ui/Sidebar";
import { AudioCard } from "./AudioCard";

    const audio = [
        {
  slug: "your-name-n5-audiobook",
  title: "Your Name Audiobook (JLPT N4/N5) | Learn Easy Japanese with Stories",
  thumbnail: "https://img.youtube.com/vi/somEzKcCDVE/hqdefault.jpg",
  description: "A simplified audiobook version of 'Your Name' designed for JLPT N4/N5 learners. Great for listening practice and immersion."
},
{
  slug: "spirited-away-n5",
  title: "Spirited Away Audiobook (JLPT N4/N5) | Learn Easy Japanese with Stories",
  thumbnail: "https://img.youtube.com/vi/tEoRxBLOMqg/hqdefault.jpg",
  description: "An N4/N5-friendly audiobook version of Spirited Away designed for easy Japanese learning through engaging stories."
},
{
  slug: "ogura-hyakunin-isshu-audiobook",
  title: "Ogura Hyakunin Isshu (Free Audio Book in Japanese)",
  thumbnail: "https://img.youtube.com/vi/a94d3HlK_Cc/hqdefault.jpg",
  description: "Classic Japanese poetry collection read aloud in native Japanese. A traditional audio immersion experience."
},
{
  slug: "howls-moving-castle-n5-part3",
  title: "Howl's Moving Castle: Easy Japanese Reading & Explanation (JLPT N4/N5, Part 3)",
  thumbnail: "https://img.youtube.com/vi/kSZAmW63KC8/hqdefault.jpg",
  description: "Part 3 of an N5/N4-friendly reading of Howl's Moving Castle with vocabulary breakdowns and grammar support."
},
{
  slug: "kouyahijiri-audiobook",
  title: "Kouyahijiri by Kyōka Izumi (Full Audiobook)",
  thumbnail: "https://img.youtube.com/vi/hTWxrT6UAxs/hqdefault.jpg",
  description: "A haunting and poetic full audiobook reading of Kyōka Izumi's 'Kouyahijiri'. Classic Japanese literature, perfect for immersion and advanced learners."
},
{
  slug: "kikis-delivery-ghibli",
  title: "Learn Japanese with Ghibli: Kiki's Delivery Service - Scene Description",
  thumbnail: "https://img.youtube.com/vi/ZZHZXpDaV-c/hqdefault.jpg",
  description: "Study Japanese using scenes from Kiki’s Delivery Service with clear explanations and context."
},
{
  slug: "totoro-japanese-audiobook",
  title: "My Neighbor Totoro Audiobook (JLPT N4/N5)",
  thumbnail: "https://img.youtube.com/vi/g4BslkuX6I0/hqdefault.jpg",
  description: "Listen to My Neighbor Totoro in easy Japanese. Great for JLPT N4/N5 learners practicing listening and comprehension."
},
{
  slug: "straw-turnaround-folktale",
  title: "From Straw to a Great Turnaround – Easy Japanese Folktale",
  thumbnail: "https://img.youtube.com/vi/rLwowh9SBa4/hqdefault.jpg",
  description: "Classic Japanese folktale told in slow, easy Japanese. Great for JLPT N5 learners improving listening and vocabulary."
},
{
  slug: "gongitsune-audiobook",
  title: "『ごんぎつね』– Japanese Classical Story Audiobook",
  thumbnail: "https://img.youtube.com/vi/J6KtEUu7fhU/hqdefault.jpg",
  description: "A traditional Japanese short story 'Gongitsune' narrated in native-level Japanese. Ideal for intermediate learners and cultural immersion."
},
{
  slug: "toshisyun-akutagawa",
  title: "Toshisyun by Ryunosuke Akutagawa (Full Audiobook)",
  thumbnail: "https://img.youtube.com/vi/cDPlxiHqcEw/hqdefault.jpg",
  description: "A complete audiobook of Ryunosuke Akutagawa's 'Toshisyun', a philosophical tale of ambition, suffering, and enlightenment. Read in Japanese."
},
{
  slug: "restaurant-of-many-orders",
  title: "『注文の多い料理店』– Kenji Miyazawa Audiobook",
  thumbnail: "https://img.youtube.com/vi/q-o8i-5zSWs/hqdefault.jpg",
  description: "A surreal and darkly humorous short story by Kenji Miyazawa, narrated in native Japanese. Perfect for upper N4–N3 learners looking to level up with literary content."
},
{
  slug: "poverty-god-folktale",
  title: "The One Living in the House Was… the Poverty God｜Japanese Folktale",
  thumbnail: "https://img.youtube.com/vi/aNltAtr0pOE/hqdefault.jpg",
  description: "A beginner-friendly Japanese folktale about the Poverty God living in a man's house. Great for JLPT N5 learners to practice listening through stories."
},
    ];

    export default function AudioPage() {
      return (
        <div className="flex min-h-screen bg-[#344532] text-white">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-60 p-6">
            <h1 className="text-3xl font-bold mb-6">Daily Life in Japan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {audio.map((audio) => (
                <AudioCard key={audio.slug} audio={audio} />
              ))}
            </div>
          </main>
        </div>
      );
    }
    