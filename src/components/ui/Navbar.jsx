import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    const location = useLocation();

    const links = [
        { name: "Home", to: "/" },
        { name: "Anime", to: "/anime" },
        { name: "Daily Life", to: "/dailylife" },
        { name: "Interviews", to: "/interviews" },
        { name: "Podcasts", to: "/podcasts" },
        { name: "Audiobooks", to: "/audiobooks" },
    ];

    // Always sync active link to the URL
    useEffect(() => {
        const currentPath = location.pathname;
        const foundLink = links.find(link => link.to === currentPath);
        if (foundLink) {
            setActiveLink(foundLink.name);
        }
    }, [location.pathname]);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        setIsOpen(false);
    };

    return (
        <nav className="
            absolute top-6 left-1/2 transform -translate-x-1/2 z-50
            w-[100%] max-w-7xl py-2
            transition-all duration-300 lg:max-w-8xl
        ">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Logo />
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center space-x-12">
                    {links.map(link => (
                        <li key={link.name}>
                            <Link 
                                to={link.to}
                                onClick={() => handleLinkClick(link.name)}
                                className={`relative text-white font-medium transition-all duration-300 hover:text-[#8aadc2] group ${
                                    activeLink === link.name ? "text-white" : ""
                                }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 transform transition-transform duration-300 ${
                                    activeLink === link.name ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                }`}></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-8 font-extrabold">
                    <Link to="/login" className="text-white/80 hover:text-white transition duration-300 p-2 rounded-xl hover:bg-white/10 bg-blue-950/80 px-6 py-2">
                        Login
                    </Link>
                    <a href="https://linktr.ee/Sigmabond01" target="_blank" className="text-white/80 hover:text-white transition duration-300 p-2 rounded-xl hover:bg-white/10 bg-blue-950/80 px-6 py-2">
                        Socials
                    </a>
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
