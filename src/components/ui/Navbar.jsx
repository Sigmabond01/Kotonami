import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X, Search, User, Bell } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");

    const links = [
        { name: "Home", href: "#home" },
        { name: "Movies", href: "#movies" },
        { name: "TV Series", href: "#tv-series" },
        { name: "Anime", href: "#anime" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        setIsOpen(false);
    };

    return (
        <nav className="w-full z-50 fixed top-0 left-0 transition-all duration-300 bg-black/20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Logo />
                </div>
                <ul className="hidden md:flex items-center space-x-8">
                    {links.map(link => (
                        <li key={link.name}>
                            <a 
                                href={link.href} 
                                onClick={() => handleLinkClick(link.name)}
                                className={`relative text-white font-medium transition-all duration-300 hover:text-green-400 group ${
                                    activeLink === link.name ? "text-green-400" : ""
                                }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 transform transition-transform duration-300 ${
                                    activeLink === link.name ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                }`}></span>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="hidden md:flex items-center space-x-4">
                    <button className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10">
                        Login
                    </button>
                    <button className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10 relative">
                        Register
                    </button>
                </div>
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}>
                <div className="px-6 py-4 bg-black/95 backdrop-blur-lg border-t border-white/10">
                    <ul className="flex flex-col space-y-4">
                        {links.map(link => (
                            <li key={link.name}>
                                <a 
                                    href={link.href} 
                                    onClick={() => handleLinkClick(link.name)}
                                    className={`block text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-green-400 ${
                                        activeLink === link.name ? "text-green-400 bg-white/5" : ""
                                    }`}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-white/10">
                        <button className="text-white/80 hover:text-white transition-colors duration-200 p-3 rounded-full hover:bg-white/10">
                            Login
                        </button>
                        <button className="text-white/80 hover:text-white transition-colors duration-200 p-3 rounded-full hover:bg-white/10 relative">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}