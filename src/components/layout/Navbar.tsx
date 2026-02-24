import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/#about" },
        { name: "Services", path: "/#services" },
        { name: "Contact", path: "/#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500",
                isScrolled
                    ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.3)]"
                    : "bg-transparent py-2"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            NG <span className="text-primary">CONSULTANT</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <ThemeToggle />
                        <Link
                            to="/login"
                            className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                        >
                            Client Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                        className="md:hidden bg-background/98 backdrop-blur-2xl border-b border-border shadow-2xl overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="block px-3 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 px-3">
                                <Link
                                    to="/login"
                                    className="w-full flex items-center justify-center px-5 py-3 text-base font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Client Login
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
