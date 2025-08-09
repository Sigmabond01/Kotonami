import { Sidebar } from "../../components/ui/Sidebar";
import { PodcastCard } from "./PodcastCard";

    const podcast = [
      {
  slug: "takashii-from-japan-goldrush",
  title: "TakashiiFromJapan on How Foreigners View Japan – Goldrush Podcast Ep.96",
  thumbnail: "https://img.youtube.com/vi/_GO1RJA-hvM/maxresdefault.jpg",
  description: "Popular Japanese YouTuber TakashiiFromJapan joins the Goldrush podcast to discuss how Japan is seen through foreign eyes.",
},
{
  slug: "nativepodcast-hometown-ep1",
  title: "Real Native Japanese Podcast: About My Hometown | Ep.1",
  thumbnail: "https://img.youtube.com/vi/we6eAG5TfBw/maxresdefault.jpg",
  description: "In this first episode, the host talks naturally in Japanese about their hometown. Great for intermediate learners aiming to hear native speed and style."
},
{
  slug: "kole-goldnrush",
  title: "KOLE: The Rising Star of J-HipHop – GOLDNRUSH Ep.74",
  thumbnail: "https://img.youtube.com/vi/y9rAlKEzBzM/maxresdefault.jpg",
  description: "KOLE joins GOLDNRUSH to share his journey from Atlanta to Kawasaki and his rise in the J-HIPHOP scene.",
},
{
  slug: "hokkaido-guide",
  title: "Hokkaido – Japanese Prefecture Podcast #1",
  thumbnail: "https://img.youtube.com/vi/f5pNIwgCVVE/maxresdefault.jpg",
  description: "A relaxed Japanese podcast introducing Hokkaido – ideal for learners picking up regional vocabulary and casual speech."
},
{
  slug: "inaka-kaso",
  title: "Rural Japan’s Depopulation Problem – Native Japanese Listening",
  thumbnail: "https://img.youtube.com/vi/d1bLBtBySGY/maxresdefault.jpg",
  description: "Explore the beauty and struggles of Japan’s countryside as the podcast dives into the issue of depopulation (過疎). Great for JLPT N3+ listening."
},
     {
  slug: "nishida-rise",
  title: "Ace Spiker Yuji Nishida on Growth, YouTube & Marriage – GOLDNRUSH Ep.110",
  thumbnail: "https://img.youtube.com/vi/5eCWPY7k0Z4/maxresdefault.jpg",
  description: "Japan's volleyball ace Nishida Yuji shares his philosophy on getting better at anything—by not trying too hard."
},
{
  slug: "yuyu-happiness",
  title: "Happiness – Japanese Conversation (N5-N3)",
  thumbnail: "https://img.youtube.com/vi/GQXqpBh8_kc/maxresdefault.jpg",
  description: "Beginner-friendly episode exploring the meaning of happiness in simple Japanese. Great for N5–N3 learners."
},
{
  slug: "regions-of-japan-56",
  title: "1-Hour Japanese Listening – Regions of Japan #56",
  thumbnail: "https://img.youtube.com/vi/Jvid5ttib-4/maxresdefault.jpg",
  description: "Listen to 1 hour of slow, natural Japanese while learning about the 8 regions of Japan through personal stories and memories."
},
{
  slug: "wasabi-long-5",
  title: "1 Hour Random Japanese Talk | Coffee chat | 雑談 自然な話し方 | Wasabi Podcast LONG #5",
  thumbnail: "https://img.youtube.com/vi/nRuEzDxY2Zc/maxresdefault.jpg",
  description: "A 1-hour casual Japanese conversation—ideal for immersion, listening, and shadowing practice. No scripts, just natural flow."
},
{
  slug: "goldnrush-dan-ep89",
  title: "Say 'Yes' to Everything — Dan on Creativity | GOLDNRUSH PODCAST Ep.89",
  thumbnail: "https://img.youtube.com/vi/w5KPdk2gYKg/maxresdefault.jpg",
  description: "Dan, a multi-creator who rarely says 'no', dives into creativity, mindset, and collaboration in this GOLDNRUSH Podcast episode."
},
{
  slug: "slowjp-conbini-ep1",
  title: "Convenience Stores in Japan | My Slow Japanese Podcast #1",
  thumbnail: "https://img.youtube.com/vi/JRs2vrM_f78/maxresdefault.jpg",
  description: "Episode 1 of the Slow Japanese Podcast explores the culture of convenience stores in Japan with clear and slow narration for learners."
},
{
  slug: "goldnrush-tsunoda-ep105",
  title: "Inside the Mind of Japan’s Youngest F1 Driver | GOLDNRUSH Ep.105",
  thumbnail: "https://img.youtube.com/vi/Qj1dkCZfcRc/maxresdefault.jpg",
  description: "Yuki Tsunoda talks about controlling over 1000 buttons in an F1 car, life behind the scenes, and his journey as Japan’s youngest F1 driver."
},
    ];

    export default function PodcastPage() {
      return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#0f172a]  to-[#334155] text-white">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-60 p-6">
            <h1 className="text-3xl font-bold mb-6">Daily Life in Japan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {podcast.map((podcast) => (
                <PodcastCard key={podcast.slug} podcast={podcast} />
              ))}
            </div>
          </main>
        </div>
      );
    }
    