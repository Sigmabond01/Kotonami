    import { DailyCard } from "./Dailycard";
    import { Sidebar } from "../../components/ui/Sidebar";

    const daily = [
      {
  slug: "what-a-small-town-in-japan-is-like",
  title: "What a Small Town in Japan Is Like – Life Where I'm From",
  thumbnail: "https://img.youtube.com/vi/IiU3Nk16BLQ/maxresdefault.jpg",
  description: "Welcome to Kofu, Tottori (pop. 2,500): a peaceful look at daily life in a tiny Japanese town."
},
{
  slug: "what-owning-ramen-restaurant-japan",
  title: "What Owning a Ramen Restaurant in Japan Is Like",
  thumbnail: "https://img.youtube.com/vi/gmIwxqdwgrI/maxresdefault.jpg",
  description: "Go behind the scenes with an independent ramen shop owner—15-hour days, broth from scratch, and the passion that drives it all."
},
      {
        slug: "jp-shopping",
        title: "Let's Go Shopping",
        thumbnail: "https://i.ytimg.com/vi/UJyBgOdh9IA/hqdefault.jpg",
        description: "You can listen to the conversation to enhance your Japanese speaking and comprehension skills! ",
      },
      {
  slug: "feeding-2200-japanese-students",
  title: "Feeding 2,200 Hungry Japanese Students – School Lunch Prep",
  thumbnail: "https://img.youtube.com/vi/gBHZxcQcYgg/maxresdefault.jpg",
  description: "Witness the scale and precision as thousands of Japanese school lunches are prepared and served with care—immersion-level listening and cultural insight."
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
  slug: "24h-japanese-vending-eats",
  title: "Eating at 24-Hour Japanese Vending Machines",
  thumbnail: "https://img.youtube.com/vi/pP8zmVly9e0/maxresdefault.jpg",
  description: "Late-night comfort food from Japanese vending machines—no restaurant, just hot meals and quiet Tokyo ambiance."
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
{
  slug: "working-japanese-man-recharge",
  title: "Recharge After Work: Japanese Salaryman & Comfort Food",
  thumbnail: "https://img.youtube.com/vi/hcafMhQLZW0/hqdefault.jpg",
  description: "A Japanese salaryman unwinds after a long workday by enjoying hearty, delicious comfort food—real-life listening practice for intermediate learners."
},
{
  slug: "kyoto-in-the-rain-vlog",
  title: "KYOTO in the Rain – Temples, Gardens & Cozy Cafés",
  thumbnail: "https://img.youtube.com/vi/xVVVQjaD-pg/hqdefault.jpg",
  description: "Stroll through Kyoto’s temple gardens and relax in dreamy cafés under the rain—perfect ambient Japanese listening."
},
{
  slug: "instant-noodle-cafe-24h",
  title: "Eating at a 24-Hour Instant Noodle Café",
  thumbnail: "https://img.youtube.com/vi/K5Uk0ZnlVqc/hqdefault.jpg",
  description: "Inside a 24-hour instant noodle café—vending machines, DIY cooking, and late-night noodle cravings captured in natural Japanese."
},
{
  slug: "one-man-ramen-kitchen",
  title: "One-Person Ramen Shop & Wok Mastery",
  thumbnail: "https://img.youtube.com/vi/zmmDBLBaCc8/maxresdefault.jpg",
  description: "A solo ramen chef manages every step—noodles, broth, and wok cooking—all in one seamless flow."
},
{
  slug: "why-learn-a-foreign-language-146",
  title: "Why Learn a Foreign Language? | 25-Min Japanese Listening Practice",
  thumbnail: "https://img.youtube.com/vi/l7ufokPMyM0/maxresdefault.jpg",
  description: "25 minutes of easy-to-follow Japanese exploring motivation behind learning a foreign language.",
},
{
  slug: "visiting-maid-cafe-akh",
  title: "Visiting a Japanese Maid Café in Akihabara — ASMR Experience",
  thumbnail: "https://img.youtube.com/vi/u90AN5QpbXE/maxresdefault.jpg",
  description: "Step inside Akihabara’s iconic @Home Café with Premium Maid Mizukin in this ASMR-style visit—mitsumete immersive Japanese listening."
},
{
  slug: "visiting-butler-cafe-swallowtail",
  title: "Visiting a Japanese Butler Café – Swallowtail & Tailored Tea",
  thumbnail: "https://img.youtube.com/vi/b6lX96wONF4/maxresdefault.jpg",
  description: "Inside Tokyo’s elegant Swallowtail Butler Café—tailored tea, Swan-tail service, and the refined language of hospitality."
},
{
  slug: "imaya-hotdog-grandpa",
  title: "A Day in the Life of Japan’s Most Famous Grandpa’s Hot Dog Shop",
  thumbnail: "https://img.youtube.com/vi/VHkwt6yxVWk/maxresdefault.jpg",
  description: "Watch a 78-year-old grandpa run his legendary hot-dog stall—50 years strong, always with long lines and heartfelt service."
},
    ];

    export default function DailyLifePage() {
      return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#0f172a]  to-[#334155] text-white">
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
    