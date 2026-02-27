import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./themeContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/#about" },
        { name: "Services", path: "/#services" },
        { name: "Contact", path: "/#contact" },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400;500&display=swap');

                .nav-link {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.8rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: var(--nav-link-color, #888888);
                    text-decoration: none;
                    position: relative;
                    transition: color 0.3s ease;
                    padding-bottom: 2px;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: #b91c1c;
                    transition: width 0.3s ease;
                }
                .nav-link:hover { color: var(--nav-link-hover, #f0f0f0); }
                .nav-link:hover::after { width: 100%; }

                .nav-logo-text {
                    font-family: 'Bebas Neue', sans-serif;
                    letter-spacing: 0.08em;
                    font-size: 1.5rem;
                    color: #f0f0f0;
                    line-height: 1;
                }
                .nav-logo-accent { color: #b91c1c; }

                .nav-cta {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.75rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    background: #9b6c3a;
                    color: #f0f0f0;
                    padding: 10px 22px;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-block;
                    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
                    transition: background 0.3s ease;
                }
                .nav-cta:hover { background: #9b6c3a; }

                .mobile-nav-link {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 1.3rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--nav-link-color, #888888);
                    padding: 14px 16px;
                    border-bottom: 1px solid var(--mobile-nav-border, #1a1a1a);
                    display: block;
                    text-decoration: none;
                    transition: color 0.2s, padding-left 0.3s;
                }
                .mobile-nav-link:hover {
                    color: var(--nav-link-hover, #f0f0f0);
                    padding-left: 24px;
                }

                .hamburger-btn {
                    background: none;
                    border: 1px solid var(--hamburger-border, #252525);
                    padding: 8px;
                    cursor: pointer;
                    color: #888;
                    transition: border-color 0.3s, color 0.3s;
                }
                .hamburger-btn:hover {
                    border-color: #b91c1c;
                    color: #f0f0f0;
                }

                /* Theme toggle */
                .theme-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    background: none;
                    border: 1px solid var(--toggle-border, #252525);
                    cursor: pointer;
                    color: var(--toggle-icon, #888);
                    transition: all 0.3s ease;
                    clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
                    position: relative;
                    overflow: hidden;
                }
                .theme-toggle:hover {
                    border-color: #b91c1c;
                    color: #b91c1c;
                    background: rgba(185,28,28,0.06);
                }

                /* Light mode nav overrides */
                [data-theme="light"] .nav-link { color: #5a4a3a; }
                [data-theme="light"] .nav-link:hover { color: #1a0f08; }
                [data-theme="light"] .mobile-nav-link { color: #5a4a3a; }
                [data-theme="light"] .mobile-nav-link:hover { color: #1a0f08; }
                [data-theme="light"] .hamburger-btn { border-color: #d4c9b8; color: #5a4a3a; }
                [data-theme="light"] .theme-toggle { border-color: #d4c9b8; color: #5a4a3a; }
                [data-theme="light"] .theme-toggle:hover { border-color: #b91c1c; color: #b91c1c; }
            `}</style>

            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 50,
                    transition: 'all 0.4s ease',
                    background: isScrolled
                        ? (theme === 'dark' ? 'rgba(8,8,8,0.95)' : 'rgba(248,245,240,0.95)')
                        : 'transparent',
                    backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                    borderBottom: isScrolled
                        ? `1px solid ${theme === 'dark' ? '#1a1a1a' : '#e0d6c8'}`
                        : '1px solid transparent',
                }}
            >                    {/* Outer row — keep justifyContent: 'space-between' */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px', padding: '0 2rem' }}>

                    {/* Logo — left */}
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-end', marginTop: '20px', marginBottom: '10px' }}>
                        <img
                            src="/Company_Logo.png"
                            alt="NG Consultant"
                            style={{ height: '100px', objectFit: 'contain', transition: 'filter 0.4s ease' }}
                        />
                    </Link>

                    {/* Right group — no marginLeft needed, space-between handles it */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>

                        {/* Desktop links */}
                        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2.5rem' }}>
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.path} className="nav-link">{link.name}</a>
                            ))}
                            <div style={{ width: 1, height: 20, background: theme === 'dark' ? '#252525' : '#d4c9b8' }} />
                            <Link to="/login" className="nav-cta">Client Login</Link>
                        </div>

                        {/* Theme toggle + hamburger */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button className="theme-toggle" onClick={toggleTheme}
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                                <AnimatePresence mode="wait">
                                    {theme === 'dark' ? (
                                        <motion.div key="sun"
                                            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                            transition={{ duration: 0.2 }}>
                                            <Sun size={15} />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="moon"
                                            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                            transition={{ duration: 0.2 }}>
                                            <Moon size={15} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                            <button className="hamburger-btn md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                                {isOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                </div>
                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                background: theme === 'dark' ? '#0a0a0a' : '#f2ede6',
                                borderBottom: `1px solid ${theme === 'dark' ? '#1a1a1a' : '#e0d6c8'}`,
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ padding: '8px 0 20px' }}>
                                {navLinks.map((link) => (
                                    <a key={link.name} href={link.path} className="mobile-nav-link">{link.name}</a>
                                ))}
                                <div style={{ padding: '16px 16px 0' }}>
                                    <Link to="/login" className="nav-cta" style={{ display: 'block', textAlign: 'center', padding: '14px' }}>
                                        Client Login
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav >
        </>
    );
};

export default Navbar;