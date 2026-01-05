import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Film, Tv, MonitorPlay, Menu, X, ChevronRight, Tv2, Mic, Mic2 } from "lucide-react";
import Logo from "./Logo";

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navItems = [
    {name: "Home", icon: <Home size={20} />, to: "/"},
    {name: "Anime", icon: <Film size={20} />, to: "/anime"},
    {name: "Daily Life", icon: <Tv size={20} />, to: "/dailylife"},
    {name: "Interviews", icon: <Mic2 size={20} />, to: "/interviews"},
    {name: "Podcasts", icon: <Mic size={20} />, to: "/podcasts"},
    {name: "Audiobooks", icon: <MonitorPlay size={20} />, to: "/audiobooks"},
  ]

  return (
    <>
    {open && (
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      onClick={() => setOpen(false)}></div>
    )}
    <div className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl z-50 transition-all font-mincho duration-300 border-r border-slate-700/50 ${open ? "w-60" : "w-16"}`}>
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700/50 bg-slate-800/30">
        <span className={`text-xl font-bold transition-all ${open ? "opacity-100" : "opacity-0 w-0"}`}><Logo /></span>
        <button
        onClick={() => setOpen(!open)}
        className="text-white p-2  transition-all duration-200 hover:scale-105">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <nav className="mt-6 flex flex-col space-y-2 px-2">
        {navItems.map(item => (
          <Link
          key={item.name}
          to={item.to}
          className={`group relative flex items-center ${open ? 'space-x-4' : 'justify-center'} py-3 px-3 rounded-xl transition-all duration-200 hover:translate-x-1 ${
            location.pathname === item.to
            ? "bg-gradient-to-t from-blue-950 to-blue-700 text-white shadow-lg shadow-blue-500/50"
            : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
          }`}>
            {location.pathname === item.to && (
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-r-full" />
            )}
            <span className={`transition-colors duration-200 ${
              location.pathname === item.to ? 'text-white' : 'text-slate-400 group-hover:text-white'
            }`}>{item.icon}</span>
            {open && (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium tracking-wide">{item.name}</span>
                <ChevronRight size={14}
                className={`transition-all duration-200 ${
                  location.pathname === item.to
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`} />
              </div>
            )}
            {!open && (
              <div className="absolute left-16 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-slate-600">
                {item.name}
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-600" />
              </div>
            )}
          </Link>
        ))}
      </nav>
      {/* Footer info */}
      {open && (
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <div className="text-xs text-slate-400 text-center">
            <div className="font-medium text-slate-300">To Give us a Star on Github!! Click below</div>
            <div className="mt-4 tracking-wide text-4xl"><a href="https://github.com/Sigmabond01/Kotonami" target="_blank">琴波</a></div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 pointer-events-none" />
    </div>
    </>
  );
}