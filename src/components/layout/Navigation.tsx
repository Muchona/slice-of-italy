import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, X } from 'lucide-react' -- REMOVED due to runtime crash
import logo from '/assets/logo.jpg'

interface NavigationProps {
    onOpenOrder: () => void;
    onNavigate: (view: 'home' | 'reviews' | 'gallery') => void;
}

const NavbarItem = ({ link, onClick }: { link: { name: string; href: string }, onClick: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Determine face expression based on link name
    const getFace = () => {
        switch (link.name) {
            case "Menu": // Hungry / Tongue out
                return (
                    <>
                        <div className="flex gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        </div>
                        <div className="w-3 h-1.5 rounded-b-full bg-red-500" />
                    </>
                );
            case "Location": // Looking around
                return (
                    <>
                        <div className="flex gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-black rounded-full translate-x-0.5" />
                            <div className="w-1.5 h-1.5 bg-black rounded-full translate-x-0.5" />
                        </div>
                        <div className="w-2 h-1 border-b-[1.5px] border-black rounded-full" />
                    </>
                );
            case "Gallery": // Starry Eyes
                return (
                    <>
                        <div className="flex gap-2 mb-0.5 text-[8px] leading-none text-black">
                            <span>★</span><span>★</span>
                        </div>
                        <div className="w-2 h-2 rounded-full border-2 border-black clip-path-half-circle mt-0.5" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)' }} />
                    </>
                );
            case "Feedback": // Big Grin
                return (
                    <>
                        <div className="flex gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        </div>
                        <div className="w-3 h-1.5 bg-black rounded-b-full" />
                    </>
                );
            default: // Standard Smile
                return (
                    <>
                        <div className="flex gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        </div>
                        <div className="w-3 h-1.5 border-b-2 border-black rounded-full" />
                    </>
                );
        }
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative px-5 py-2 group"
        >
            <span className={`relative z-10 text-xs font-body uppercase tracking-widest font-bold transition-colors duration-300 ${isHovered ? 'text-alabaster' : 'text-alabaster/70'}`}>
                {link.name}
            </span>
            {isHovered && (
                <>
                    {/* Hover Pill Background */}
                    <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                        }}
                    />

                    {/* Pizza Character */}
                    <motion.div
                        layoutId="nav-character"
                        className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Pizza Slice Body */}
                        <div className="relative w-12 h-14 drop-shadow-xl filter rotate-45">
                            {/* SVG Pizza Shape */}
                            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">
                                {/* Crust & Cheese */}
                                <path d="M10,10 Q50,-10 90,10 L50,110 Z" fill="#F4D03F" stroke="#E67E22" strokeWidth="4" />
                                {/* Crust Top */}
                                <path d="M10,10 Q50,-10 90,10" fill="none" stroke="#D35400" strokeWidth="8" strokeLinecap="round" />
                                {/* Pepperoni Details */}
                                <circle cx="45" cy="40" r="6" fill="#C0392B" opacity="0.8" />
                                <circle cx="65" cy="60" r="5" fill="#C0392B" opacity="0.8" />
                                <circle cx="35" cy="80" r="4" fill="#C0392B" opacity="0.8" />
                            </svg>

                            {/* Face Container */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                {getFace()}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </button>
    );
};

const Navigation = ({ onOpenOrder, onNavigate }: NavigationProps) => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: "Menu", href: "#menu" },
        { name: "Location", href: "#location" },
    ]

    const handleNavigate = (view: 'home' | 'reviews' | 'gallery') => {
        onNavigate(view);
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const scrollToSection = (id: string) => {
        onNavigate('home');
        setTimeout(() => {
            const element = document.getElementById(id.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
        setMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={`fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 transition-all duration-300 ${scrolled ? 'pt-4 md:pt-14' : 'pt-8 md:pt-20'}`}
            >
                {/* Floating Glass Capsule */}
                <div className={`
                    relative flex items-center justify-between 
                    w-full max-w-5xl 
                    px-6 py-2 
                    rounded-full 
                    border border-white/10
                    transition-all duration-500
                    ${scrolled
                        ? 'bg-[#1E1B18]/80 backdrop-blur-xl shadow-lg border-terracotta/20'
                        : 'bg-white/5 backdrop-blur-md shadow-sm'
                    }
                `}>
                    {/* Logo (Circular Crop) */}
                    <button onClick={() => handleNavigate('home')} className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-terracotta/50 transition-colors">
                            <img src={logo} alt="Slice of Italy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <span className={`font-display text-lg tracking-wide transition-colors ${scrolled ? 'text-alabaster' : 'text-alabaster'}`}>
                            SLICE OF <span className="text-terracotta">ITALY</span>
                        </span>
                    </button>

                    {/* Desktop Links - Anime Style */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, i) => (
                            <NavbarItem
                                key={i}
                                link={link}
                                onClick={() => scrollToSection(link.href)}
                            />
                        ))}
                        <NavbarItem
                            link={{ name: "Gallery", href: "gallery" }}
                            onClick={() => handleNavigate('gallery')}
                        />
                        <NavbarItem
                            link={{ name: "Feedback", href: "reviews" }}
                            onClick={() => handleNavigate('reviews')}
                        />
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={onOpenOrder}
                            className="relative px-6 py-2 bg-terracotta text-alabaster font-body text-xs font-bold uppercase tracking-widest rounded-full overflow-hidden group hover:bg-white hover:text-terracotta transition-colors shadow-lg shadow-terracotta/20"
                        >
                            Order Now
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-alabaster p-2 hover:text-terracotta transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="18" x2="20" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-[#1E1B18]/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-y-auto"
                    >
                        <button
                            className="absolute top-8 right-8 text-alabaster/50 hover:text-terracotta transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="flex flex-col items-center gap-10">
                            {navLinks.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToSection(link.href)}
                                    className="font-display text-4xl text-alabaster hover:text-terracotta transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNavigate('gallery')}
                                className="font-display text-4xl text-alabaster hover:text-terracotta transition-colors"
                            >
                                Gallery
                            </button>
                            <button
                                onClick={() => handleNavigate('reviews')}
                                className="font-display text-4xl text-alabaster hover:text-terracotta transition-colors"
                            >
                                Feedback
                            </button>
                            <button
                                onClick={() => {
                                    onOpenOrder();
                                    setMobileMenuOpen(false);
                                }}
                                className="px-8 py-3 bg-terracotta text-alabaster font-body font-bold uppercase tracking-widest rounded-full"
                            >
                                Order Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navigation
