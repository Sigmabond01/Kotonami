import { BookOpen, Target, Brain, GraduationCap } from "lucide-react";

export function About() {
  return (
    <section className="font-mincho min-h-screen bg-[url('./bg2.jpg')]  bg-cover bg-no-repeat bg-bottom relative text-white">
      <div className="absolute inset-0 bg-black/50 z-0 backdrop-blur-sm " />
      <div className="z-10 relative">
        <h1 className="flex justify-center text-7xl pt-16">ABOUT</h1>
        <div className="max-w-6xl mx-auto font-medium pt-8 px-4">
          <p className="text-2xl">
            <strong>KOTONAMI</strong> is a Japanese learning platform built for learners who want more than flashcards and grammar drills.
            We break down real spoken Japanese through curated video clips with dual subtitles, instant word meanings, and structured JLPT progression.
            Write your own blogs, track your growth, and immerse yourself in the language the way natives use it—without relying on anime or dramas.
            </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8 px-4">
          {[
            {
              icon: BookOpen,
              title: "Dual Subtitles",
              desc: "Catch every phrase, idiom, and nuance without pausing. Ideal for immersion beginners and intermediate learners alike. Toggle them anytime—you're in control.",
              accent: "from-blue-400 to-blue-600",
            },
            {
              icon: Target,
              title: "Word Meanings on Tap",
              desc: "Every word is clickable. Get native meanings, pitch accents, grammar forms—all without leaving the video. No more 'what does that mean?' slowing you down.",
              accent: "from-red-400 to-red-600",
            },
            {
              icon: Brain,
              title: "Real Videos. Real Language.",
              desc: "No slow, robotic learning content. Just real, native media so you learn how Japanese is actually spoken in different contexts—from casual slang to formal speech.",
              accent: "from-purple-400 to-purple-600",
            },
            {
              icon: GraduationCap,
              title: "Progress Without Burnout",
              desc: "No guilt. No study timers. Just get better every time you watch. Track your vocab, review contextually, and let natural repetition do the rest.",
              accent: "from-green-400 to-green-600",
            },
          ].map(({ icon: Icon, title, desc, accent }, idx) => (
            <Card
              key={idx}
              className="group bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-orange-400/30"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {Icon && <Icon className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);
