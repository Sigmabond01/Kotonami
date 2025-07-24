import { useState } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");

    const links = [
        { name: "Home", to: "/" },
        { name: "Daily Life", to: "/dailylife" },
        { name: "Interviews", to: "/interviews" },
        { name: "Podcasts", to: "/podcasts" },
        { name: "Audiobooks", to: "/audiobooks" },
    ];
    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        setIsOpen(false);
    };

    return (
        <nav className={`
            absolute top-6 left-1/2 transform -translate-x-1/2 z-50
            w-[90%] max-w-6xl px-6 py-4
            transition-all duration-300
        `}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Logo />
                </div>
                <ul className="hidden md:flex items-center space-x-8">
                    {links.map(link => (
                        <li key={link.name}>
                            <Link 
                                to={link.to}
                                onClick={() => handleLinkClick(link.name)}
                                className={`relative text-white font-medium transition-all duration-300 hover:text-green-400 group ${
                                    activeLink === link.name ? "text-green-400" : ""
                                }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 transform transition-transform duration-300 ${
                                    activeLink === link.name ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                }`}></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-8 font-extrabold">
                    <Link to="/login" className="text-white/80 hover:text-white transition duration-300 p-2 rounded-lg hover:bg-white/10">
                        Login
                    </Link>
                    <Link to="/register" className="text-white/80 hover:text-white transition duration-300 p-2 rounded-lg hover:bg-white/10">
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}>
                <ul className="flex flex-col space-y-4">
                    {links.map(link => (
                        <li key={link.name}>
                            <Link 
                                to={link.to}
                                onClick={() => handleLinkClick(link.name)}
                                className={`block text-white font-medium py-2 px-4 rounded-lg transition hover:bg-white/10 ${
                                    activeLink === link.name ? "text-green-400" : ""
                                }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-white/10">
                    <Link to="/login" className="text-white/80 hover:text-white transition p-3 rounded-full hover:bg-white/10">
                        Login
                    </Link>
                    <Link to="/register" className="text-white/80 hover:text-white transition p-3 rounded-full hover:bg-white/10">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}
