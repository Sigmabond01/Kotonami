import { Link } from "react-router-dom";
import { FaXTwitter, FaGithub, FaEnvelope, FaHeart } from "react-icons/fa6";
import Logo from "./ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 backdrop-blur-lg text-sm mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-6 text-white/50 text-sm leading-relaxed">
            Immersive Japanese learning through anime, daily life videos, interviews, 
            podcasts, and more - powered by real-world content and instant subtitle breakdowns.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Content</h3>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/anime" className="hover:text-blue-400 transition-colors duration-200">
                Anime
              </Link>
            </li>
            <li>
              <Link to="/dailylife" className="hover:text-blue-400 transition-colors duration-200">
                Daily Life
              </Link>
            </li>
            <li>
              <Link to="/interviews" className="hover:text-blue-400 transition-colors duration-200">
                Interviews
              </Link>
            </li>
            <li>
              <Link to="/podcasts" className="hover:text-blue-400 transition-colors duration-200">
                Podcasts
              </Link>
            </li>
            <li>
              <Link to="/audiobooks" className="hover:text-blue-400 transition-colors duration-200">
                Audiobooks
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>
              <a href="https://kiban-one.vercel.app" target="_blank" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
                KIBAN
              </a>
            </li>
            <li>
              <a href="https://x.com/Sigmabond01" 
              target="_blank" className="hover:text-blue-400 transition-colors duration-200">
                Send Feedback
              </a>
            </li>
            <li>
              <a href="https://x.com/Sigmabond01" 
              target="_blank" className="hover:text-blue-400 transition-colors duration-200">
                Report Bug
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
          <div className="flex space-x-4 mb-6">
            <a 
              href="https://x.com/Sigmabond01" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-blue-400 transition-colors duration-200 text-xl p-2 rounded-lg hover:bg-white/5"
              aria-label="Follow us on X (Twitter)"
            >
              <FaXTwitter />
            </a>
            <a 
              href="https://github.com/Sigmabond01" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-blue-400 transition-colors duration-200 text-xl p-2 rounded-lg hover:bg-white/5"
              aria-label="View our GitHub"
            >
              <FaGithub />
            </a>
            <a 
                href="mailto:smdnoor4966@gmail.com" 
                className="text-white/70 hover:text-blue-400 transition-colors duration-200 text-xl p-2 rounded-lg hover:bg-white/5"
              >
                <FaEnvelope />
              </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/50 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Kotonami. All rights reserved.
          </div>
          <div className="flex space-x-6 text-white/50 text-xs">
            Made with <FaHeart className="text-red-400 mx-1 text-xs" aria-label="love" /> for Japanese learners.
          </div>
        </div>
      </div>
    </footer>
  );
}