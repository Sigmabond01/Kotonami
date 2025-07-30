import { Sidebar } from "../../components/ui/Sidebar";
import { InterviewCard } from "./interviewCard";

    const interview = [
{
  slug: "easyjp-what-did-you-do-today",
  title: "What Did You Do Today? | Easy Japanese Interview (N5–N4)",
  thumbnail: "https://img.youtube.com/vi/QaExGOtWbac/maxresdefault.jpg",
  description: "Beginner-friendly Japanese interview focused on daily activities. Ideal for N5–N4 learners looking to improve listening with simple questions and natural responses."
},
{
  slug: "why-japan-so-cheap",
  title: "Why Is Japan So Cheap Now? | Japanese Interview",
  thumbnail: "https://img.youtube.com/vi/C0FSpSe50m0/maxresdefault.jpg",
  description: "A native Japanese interview discussing Japan's current economic situation and why prices feel lower compared to other countries. Great for intermediate listeners looking to pick up real-world vocabulary and insights."
},
{
  slug: "japanese-elders-foreigners",
  title: "Do Japanese Elders Like Foreigners in Japan? | Street Interview",
  thumbnail: "https://img.youtube.com/vi/TbqtCm8q_G4/maxresdefault.jpg",
  description: "Street interviews with elderly Japanese citizens sharing their honest thoughts about foreigners in Japan. Candid opinions, cultural insights, and real-life Japanese listening practice."
},
{
  slug: "ex-yakuza-confession",
  title: "Confessions of Ex-Yakuza Leader [ENG CC]",
  thumbnail: "https://img.youtube.com/vi/Fd4nlMmda_I/maxresdefault.jpg",
  description: "A rare interview with a former Yakuza boss. He opens up about his criminal past, the code of the Yakuza, and life after leaving the organization."
},
{
  slug: "things-foreigners-shouldnt-do",
  title: "Things Foreigners Should NEVER Do - Japanese Interview",
  thumbnail: "https://img.youtube.com/vi/tTBzNtEq47U/maxresdefault.jpg",
  description: "Japanese locals share candid opinions on what behaviors foreigners should avoid in Japan. A cultural reality check for visitors and expats."
},
{
  slug: "bald-man-dating-japan",
  title: "Would You Date a Bald Man? - Japanese Interview",
  thumbnail: "https://img.youtube.com/vi/t63dNVP08gs/maxresdefault.jpg",
  description: "A lighthearted Japanese street interview asking locals if they'd date a bald guy. Surprising answers reveal cultural views on appearance and romance."
},
{
  slug: "japanese-elders-regrets",
  title: "Japanese Elders Tell Us Their Biggest Regrets",
  thumbnail: "https://img.youtube.com/vi/PAzHMt77tjk/maxresdefault.jpg",
  description: "Japanese seniors open up about their deepest regrets in life. A reflective and emotional street interview exploring lessons from the past."
},
{
  slug: "japan-tourist-warnings",
  title: "\"Tourists, please don’t do this here\" from Japanese locals",
  thumbnail: "https://img.youtube.com/vi/fXV89VQ5dJQ/maxresdefault.jpg",
  description: "Locals in Japan share what tourists often do wrong—etiquette tips straight from the streets of Japan."
},
{
  slug: "japan-confess-crush",
  title: "Asking Strangers in Japan to Confess to Their CRUSH",
  thumbnail: "https://img.youtube.com/vi/VPgvmzeQFq8/maxresdefault.jpg",
  description: "Would you confess your feelings on camera? Japanese strangers open up about their secret crushes in this bold street interview."
},
{
  slug: "morning-routine-easy-jp",
  title: "Easy Japanese Interview - Morning Routine (N5-N4)",
  thumbnail: "https://img.youtube.com/vi/8kQCtx9Ff0A/maxresdefault.jpg",
  description: "Simple Japanese interview about daily morning routines. Great for N5–N4 learners to build listening and vocab."
},
{
  slug: "why-jp-salarymen-work-hard",
  title: "Why Japanese Salarymen Work So Hard",
  thumbnail: "https://img.youtube.com/vi/25kp8rvWNJM/sddefault.jpg",
  description: "Street interview digging into the work culture of Japanese salarymen. Insights on mindset, routine, and expectations."
},
{
  slug: "do-japanese-people-think-japanese-is-difficult",
  title: "Do Japanese People Think Japanese is Difficult? (Interview)",
  thumbnail: "https://img.youtube.com/vi/QK400iXefwg/hqdefault.jpg",
  description: "A Japanese street interview exploring what native speakers think about the difficulty of their own language."
},
    ];

    export default function InterviewPage() {
      return (
        <div className="flex min-h-screen bg-[#344532] text-white">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-60 p-6">
            <h1 className="text-3xl font-bold mb-6">Daily Life in Japan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {interview.map((interview) => (
                <InterviewCard key={interview.slug} interview={interview} />
              ))}
            </div>
          </main>
        </div>
      );
    }
    