import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, FilmIcon, TvIcon, MonitorPlayIcon, Menu, X } from "lucide-react";
import Logo from "./Logo";

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navItems = [
    { name: "Home", icon: <HomeIcon size={20} />, to: "/" },
    { name: "Anime", icon: <FilmIcon size={20} />, to: "/anime" },
    { name: "Daily Life", icon: <FilmIcon size={20} />, to: "/dailylife" },
    { name: "Interviews", icon: <TvIcon size={20} />, to: "/interviews" },
    { name: "Podcasts", icon: <MonitorPlayIcon size={20} />, to: "/podcasts" },
    { name: "Audiobooks", icon: <MonitorPlayIcon size={20} />, to: "/audiobooks" },
  ]

  return (
    <div className={`fixed top-0 left-0 h-full bg-lime-800 text-white shadow-lg z-50 transition-all font-mincho duration-300 ${open ? "w-60" : "w-16"}`}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <span className={`text-xl font-bold transition-all ${open ? "opacity-100" : "opacity-0 w-0"}`}><Logo /></span>
        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav className="mt-6 flex flex-col space-y-2 px-2">
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center space-x-4 py-2 px-3 rounded-lg transition-all hover:bg-zinc-700${
             location.pathname === item.to ? "bg-green-600 text-white" : ""
            }`}
          >
            <span>{item.icon}</span>
            {open && <span className="text-sm font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}
