import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight, ShieldCheck, Shield, Briefcase,
    Users, Target, Award,
    Heart, Umbrella, Car, Banknote,
    Quote,
    Mail, Phone, MapPin, ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { useTheme } from "../components/layout/themeContext";

// ─── Global Styles ──────────────────────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300;1,400&family=Barlow+Condensed:wght@700;900&display=swap');

        /* ── Dark mode (default) ── */
        :root,
        [data-theme="dark"] {
            --black: #080808;
            --grey-900: #0f0f0f;
            --grey-800: #1a1a1a;
            --grey-700: #252525;
            --grey-600: #333333;
            --grey-400: #888888;
            --grey-200: #c8c8c8;
            --white: #f0f0f0;
            --accent: #e8e0d0;
            --accent-warm: #c9b99a;
            --accent-blue: #4a6fa5;

            --bg-body: #080808;
            --section-alt: #0f0f0f;
            --input-bg: #0f0f0f;
            --form-bg: #1a1a1a;
            --contact-icon-bg: #1a1a1a;
            --service-row-hover: #0f0f0f;
            --stat-watermark: #1a1a1a;
            --testimonial-bg: #1a1a1a;
            --scrollbar-thumb: #333333;
        }

        /* ── Light mode ── */
        [data-theme="light"] {
            --black: #f8f5f0;
            --grey-900: #f0ebe3;
            --grey-800: #e5ddd0;
            --grey-700: #d4c9b8;
            --grey-600: #a09080;
            --grey-400: #5a4a3a;
            --grey-200: #2e1f14;
            --white: #1a0f08;
            --accent: #3d2e22;
            --accent-warm: #9b6c3a;
            --accent-blue: #2a4f85;

            --bg-body: #f8f5f0;
            --section-alt: #f0ebe3;
            --input-bg: #f0ebe3;
            --form-bg: #e8e0d4;
            --contact-icon-bg: #e5ddd0;
            --service-row-hover: #f0ebe3;
            --stat-watermark: #e5ddd0;
            --testimonial-bg: #e5ddd0;
            --scrollbar-thumb: #c4b8a8;
        }

        body {
            background: var(--bg-body) !important;
            color: var(--white) !important;
            font-family: 'Barlow', sans-serif !important;
            transition: background 0.4s ease, color 0.4s ease;
        }

        .display-font {
            font-family: 'Bebas Neue', sans-serif;
            letter-spacing: 0.04em;
        }

        .condensed-font {
            font-family: 'Barlow Condensed', sans-serif;
        }

        /* ── Grain Overlay ── */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
            opacity: 0.025;
            pointer-events: none;
            z-index: 9999;
        }

        /* ── Marquee Animation ── */
        .marquee-track {
            display: flex;
            gap: 2rem;
            animation: marqueeScroll 30s linear infinite;
            width: max-content;
        }
        .marquee-track:hover {
            animation-play-state: paused;
        }
        @keyframes marqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        /* ── Glitch Effect on Hover ── */
        .glitch-hover:hover { animation: glitch 0.3s ease; }
        @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 1px); }
            40% { transform: translate(2px, -1px); }
            60% { transform: translate(-1px, 2px); }
            80% { transform: translate(1px, -2px); }
        }

        /* ── Section Divider ── */
        .section-rule {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--grey-700), transparent);
        }

        /* ── Service Row Hover ── */
        .service-row {
            border-bottom: 1px solid var(--grey-700);
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .service-row::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(155,108,58,0.04), transparent);
            transform: translateX(-100%);
            transition: transform 0.5s ease;
        }
        .service-row:hover::before { transform: translateX(100%); }
        .service-row:hover {
            border-bottom-color: var(--accent-warm);
            background: var(--service-row-hover);
        }
        .service-row:hover .service-num { color: var(--accent-warm); }
        .service-row:hover .service-arrow {
            opacity: 1;
            transform: translateX(0);
        }
        .service-arrow {
            opacity: 0;
            transform: translateX(-8px);
            transition: all 0.3s ease;
        }
        .service-num {
            transition: color 0.3s ease;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 0.85rem;
            letter-spacing: 0.1em;
        }

        /* ── Testimonial Card ── */
        .testimonial-card {
            background: var(--testimonial-bg);
            border: 1px solid var(--grey-700);
            border-radius: 2px;
            transition: border-color 0.3s, background 0.4s ease;
            flex-shrink: 0;
            width: 380px;
        }
        .testimonial-card:hover { border-color: var(--accent-warm); }

        /* ── Stat Number ── */
        .stat-number {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(3.5rem, 6vw, 6rem);
            line-height: 1;
            color: var(--white);
            letter-spacing: 0.02em;
            transition: color 0.4s ease;
        }

        /* ── Input Overrides ── */
        input, textarea {
            background: var(--input-bg) !important;
            border-color: var(--grey-700) !important;
            color: var(--white) !important;
            border-radius: 2px !important;
            font-family: 'Barlow', sans-serif !important;
            transition: background 0.4s ease, color 0.4s ease, border-color 0.3s ease;
        }
        input::placeholder, textarea::placeholder { color: var(--grey-600) !important; }
        input:focus, textarea:focus {
            border-color: var(--accent-warm) !important;
            outline: none !important;
            box-shadow: none !important;
        }

        /* ── Cursor Line on Heading ── */
        .cursor-line::after {
            content: '';
            display: inline-block;
            width: 4px;
            height: 0.85em;
            background: var(--accent-warm);
            margin-left: 6px;
            vertical-align: middle;
            animation: blink 1s step-end infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--black); }
        ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 2px; }

        /* Global transition for theme switching */
        *, *::before, *::after {
            transition-property: background-color, border-color, color;
            transition-duration: 0.35s;
            transition-timing-function: ease;
        }
        /* But don't override animation-specific transitions */
        .marquee-track, .service-arrow, .service-row { transition-property: all; }
    `}</style>
);

// ─── Hero ────────────────────────────────────────────────────────────────────
const Hero = () => {
    const ref = useRef(null);
    const { theme } = useTheme();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--black)' }}>
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('/Fintech_Logo.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: theme === 'dark' ? 0.7 : 0.12,
                    transition: 'opacity 0.5s ease',
                }}
            />
            {/* Overlay & vignette */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: theme === 'dark'
                        ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 10%, var(--black) 80%)'
                        : 'radial-gradient(ellipse at center, rgba(248,245,240,0.3) 10%, var(--black) 80%)',
                    transition: 'background 0.5s ease',
                }}
            />

            <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-5xl mx-auto text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 mb-10"
                    >
                        <div className="h-px w-12" style={{ background: 'var(--accent-warm)' }} />
                        <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>
                            Expert Financial Protection
                        </span>
                        <div className="h-px w-12" style={{ background: 'var(--accent-warm)' }} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="display-font mb-6"
                        style={{ fontSize: 'clamp(2rem, 8vw, 10rem)', lineHeight: 0.92, color: 'var(--grey-400)', letterSpacing: '0.02em' }}
                    >
                        SECURE YOUR<br />
                        <Link to="/" className="inline-block" style={{ color: 'var(--accent-warm)' }}>
                            FUTURE
                        </Link>
                        <span style={{ color: 'var(--grey-600)' }}> WITH</span><br />
                        <span
                            style={{
                                fontSize: 'clamp(2rem, 10vw, 10rem)',
                                color: 'var(--white)',
                            }}
                        >
                            NG CONSULTANT
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg mb-12 mx-auto max-w-2xl"
                        style={{ color: 'var(--grey-400)', lineHeight: 1.7, fontWeight: 300 }}
                    >
                        Bespoke wealth management and comprehensive insurance strategies
                        designed for growth, stability, and lasting peace of mind.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5"
                    >
                        <button
                            className="glitch-hover group relative overflow-hidden px-10 py-4 condensed-font text-lg tracking-[0.12em] uppercase transition-all duration-300"
                            style={{
                                background: 'var(--accent-warm)',
                                color: theme === 'dark' ? 'var(--black)' : '#f8f5f0',
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get Consultation <ArrowRight size={16} />
                            </span>
                        </button>
                        <button
                            className="px-10 py-4 condensed-font text-lg tracking-[0.12em] uppercase transition-all duration-300 hover:border-white"
                            style={{
                                border: '1px solid var(--grey-700)',
                                color: 'var(--grey-400)',
                                background: 'transparent',
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                            }}
                        >
                            View Plans
                        </button>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

// ─── About ───────────────────────────────────────────────────────────────────
const About = () => {
    const highlights = [
        { icon: Users, num: "01", title: "Client-Centric Approach", description: "We put your needs first, offering personalized advice tailored to your life goals and financial ambitions." },
        { icon: Target, num: "02", title: "Experienced Advisors", description: "Over 15 years of experience in the insurance and financial planning industry — guiding thousands of families." },
        { icon: Award, num: "03", title: "Trusted Partners", description: "Partnered with top-tier insurance providers to give you the most competitive options available." },
    ];

    return (
        <section id="about" className="py-32 relative" style={{ background: 'var(--black)' }}>
            <div className="section-rule" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div style={{ width: 40, height: 1, background: 'var(--accent-warm)' }} />
                            <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>About Us</span>
                        </div>

                        <h2 className="display-font mb-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.95, color: 'var(--white)' }}>
                            EMPOWERING<br />CONFIDENT<br />
                            <span style={{ color: 'var(--accent-warm)' }}>DECISIONS</span>
                        </h2>

                        <p className="mb-6" style={{ color: 'var(--grey-400)', lineHeight: 1.8, fontWeight: 300, fontSize: '1.05rem' }}>
                            At NG CONSULTANT, our mission is to demystify insurance and investment. We believe that financial security shouldn't be complicated. Our team acts as your personal navigator, guiding you through every policy and plan.
                        </p>
                        <p style={{ color: 'var(--grey-400)', lineHeight: 1.8, fontWeight: 300, fontSize: '1.05rem' }}>
                            Whether you're planning for retirement, securing your family's health, or looking for wealth creation avenues, we bring clarity and trust to the process.
                        </p>

                        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--grey-800)' }}>
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={18} style={{ color: 'var(--accent-warm)' }} />
                                <span className="condensed-font tracking-wider text-sm uppercase" style={{ color: 'var(--grey-200)' }}>SEBI Registered Investment Advisor</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-px" style={{ borderTop: '1px solid var(--grey-700)' }}>
                        {highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                                className="group py-8 flex items-start gap-8 cursor-default"
                                style={{ borderBottom: '1px solid var(--grey-700)' }}
                                onMouseEnter={e => (e.currentTarget.style.paddingLeft = '12px')}
                                onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0px')}
                            >
                                <span className="service-num" style={{ color: 'var(--grey-600)', minWidth: 32 }}>{item.num}</span>
                                <div className="p-3 rounded-none" style={{ background: 'var(--grey-800)', border: '1px solid var(--grey-700)', flexShrink: 0 }}>
                                    <item.icon size={20} style={{ color: 'var(--accent-warm)' }} />
                                </div>
                                <div>
                                    <h3 className="condensed-font text-xl tracking-wide uppercase mb-2" style={{ color: 'var(--white)' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--grey-400)', lineHeight: 1.7, fontWeight: 300 }}>{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── Services ────────────────────────────────────────────────────────────────
const Services = () => {
    const services = [
        { icon: Heart, num: "01", title: "Health Insurance", description: "Comprehensive coverage for you and your family's medical needs, including critical illness and hospitalization.", tag: "Protection" },
        { icon: Umbrella, num: "02", title: "Life Insurance", description: "Secure your loved ones' future with carefully selected term and whole life policies.", tag: "Security" },
        { icon: Shield, num: "03", title: "Term Insurance", description: "Affordable, high-coverage pure risk management. Maximum protection at minimal cost.", tag: "Coverage" },
        { icon: Car, num: "04", title: "Motor Insurance", description: "Complete protection for your vehicles against accidents, theft, and third-party damages.", tag: "Vehicles" },
        { icon: Banknote, num: "05", title: "Mutual Funds", description: "Expert-curated investment portfolios designed to maximize returns and minimize risk exposure.", tag: "Investment" },
        { icon: Briefcase, num: "06", title: "Retirement Planning", description: "Build a robust financial corpus for a stress-free and dignified retirement.", tag: "Future" },
    ];

    return (
        <section id="services" className="py-32 relative" style={{ background: 'var(--black)' }}>
            <div className="section-rule" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div style={{ width: 40, height: 1, background: 'var(--accent-warm)' }} />
                            <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>Services</span>
                        </div>
                        <h2 className="display-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.95, color: 'var(--white)' }}>
                            WHAT WE<br />DEAL WITH
                        </h2>
                    </motion.div>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="max-w-sm" style={{ color: 'var(--grey-400)', fontWeight: 300, lineHeight: 1.7 }}>
                        A comprehensive suite of financial products designed to protect, grow, and preserve your wealth.
                    </motion.p>
                </div>

                <div>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.07 }}
                            className="service-row group"
                        >
                            <div className="flex items-center justify-between py-7 px-4 gap-6">
                                <div className="flex items-center gap-6 md:gap-10 flex-1 min-w-0">
                                    <span className="service-num" style={{ color: 'var(--grey-600)', minWidth: 28 }}>{service.num}</span>
                                    <div className="p-2" style={{ background: 'var(--grey-800)', border: '1px solid var(--grey-700)', flexShrink: 0 }}>
                                        <service.icon size={18} style={{ color: 'var(--accent-warm)' }} />
                                    </div>
                                    <h3 className="condensed-font text-xl md:text-2xl tracking-wide uppercase" style={{ color: 'var(--white)' }}>{service.title}</h3>
                                </div>
                                <p className="hidden md:block max-w-sm text-sm" style={{ color: 'var(--grey-400)', fontWeight: 300, lineHeight: 1.6 }}>{service.description}</p>
                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <span className="condensed-font text-xs tracking-[0.2em] uppercase hidden md:block" style={{ color: 'var(--grey-600)' }}>{service.tag}</span>
                                    <ChevronRight size={18} className="service-arrow" style={{ color: 'var(--accent-warm)' }} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─── Counter ─────────────────────────────────────────────────────────────────
const Counter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started) setStarted(true);
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let startTime: number;
        let animationFrame: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(end * eased));
            if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [started, end, duration]);

    return <span ref={ref}>{count}</span>;
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const WhyUs = () => {
    const stats = [
        { label: "Active Clients", value: 5000, suffix: "+" },
        { label: "Policies Sold", value: 12000, suffix: "+" },
        { label: "Claim Settlement", value: 98, suffix: "%" },
        { label: "Years Experience", value: 15, suffix: "+" },
    ];

    return (
        <section className="py-32 relative overflow-hidden" style={{ background: 'var(--grey-900)' }}>
            <div className="section-rule" />

            {/* Large watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <span className="display-font select-none" style={{ fontSize: 'clamp(8rem, 20vw, 22rem)', color: 'var(--stat-watermark)', lineHeight: 1, whiteSpace: 'nowrap' }}>
                    TRUSTED
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div style={{ width: 40, height: 1, background: 'var(--accent-warm)' }} />
                    <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>Why Choose Us</span>
                </div>
                <h2 className="display-font mb-20" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.95, color: 'var(--white)' }}>
                    NUMBERS THAT<br />SPEAK
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ borderTop: '1px solid var(--grey-700)', borderLeft: '1px solid var(--grey-700)' }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-10"
                            style={{ borderRight: '1px solid var(--grey-700)', borderBottom: '1px solid var(--grey-700)' }}
                        >
                            <div className="stat-number mb-3">
                                <Counter end={stat.value} />
                                <span style={{ color: 'var(--accent-warm)' }}>{stat.suffix}</span>
                            </div>
                            <div className="condensed-font text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--grey-400)' }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <p className="mt-12 max-w-xl" style={{ color: 'var(--grey-400)', fontWeight: 300, lineHeight: 1.8 }}>
                    We don't just sell policies — we build lasting relationships. Here's why thousands of families and businesses trust us with their financial future.
                </p>
            </div>
        </section>
    );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
const Testimonials = () => {
    const testimonials = [
        { name: "Rajesh Kumar", role: "Business Owner", content: "NG CONSULTANT helped us secure our business assets with a comprehensive plan. Their advice was spot on and saved us significantly in the long run." },
        { name: "Priya Sharma", role: "Software Engineer", content: "I was confused about which term plan to buy. The team explained everything clearly and helped me choose the best option for my family's protection." },
        { name: "Amit Patel", role: "Entrepreneur", content: "Their investment advisory has been a game-changer for my portfolio. Professional, trustworthy, and always available when I need them." },
        { name: "Sunita Verma", role: "Doctor", content: "The health insurance plan they recommended has been absolutely perfect. Claims are settled quickly and the coverage is excellent." },
        { name: "Vikram Singh", role: "Retired Officer", content: "Retirement planning with NG CONSULTANT was a smooth experience. They understood my needs and built exactly the right corpus plan for me." },
    ];

    const doubled = [...testimonials, ...testimonials];

    return (
        <section className="py-32 relative overflow-hidden" style={{ background: 'var(--black)' }}>
            <div className="section-rule" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 mb-16">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div style={{ width: 40, height: 1, background: 'var(--accent-warm)' }} />
                            <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>Testimonials</span>
                        </div>
                        <h2 className="display-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.95, color: 'var(--white)' }}>
                            WHAT OUR<br />CLIENTS SAY
                        </h2>
                    </div>
                    <p className="max-w-xs" style={{ color: 'var(--grey-400)', fontWeight: 300, lineHeight: 1.7 }}>
                        Real stories from people who have secured their future with us.
                        <br /><span className="text-xs" style={{ color: 'var(--grey-600)' }}>Hover to pause.</span>
                    </p>
                </div>
            </div>

            {/* Marquee */}
            <div className="overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, var(--black), transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(270deg, var(--black), transparent)' }} />

                <div className="marquee-track px-8" style={{ gap: '1.5rem' }}>
                    {doubled.map((t, index) => (
                        <div key={index} className="testimonial-card p-8 flex flex-col justify-between" style={{ minHeight: 220 }}>
                            <div className="flex items-start gap-3 mb-5">
                                <Quote size={16} style={{ color: 'var(--accent-warm)', flexShrink: 0, marginTop: 2 }} />
                                <p style={{ color: 'var(--grey-200)', lineHeight: 1.7, fontWeight: 300, fontSize: '0.95rem', fontStyle: 'italic' }}>
                                    {t.content}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-5" style={{ borderTop: '1px solid var(--grey-700)' }}>
                                <div className="w-10 h-10 flex items-center justify-center condensed-font text-lg font-bold" style={{ background: 'var(--grey-700)', color: 'var(--accent-warm)', flexShrink: 0 }}>
                                    {t.name[0]}
                                </div>
                                <div>
                                    <p className="condensed-font tracking-wide text-sm uppercase" style={{ color: 'var(--white)' }}>{t.name}</p>
                                    <p className="text-xs" style={{ color: 'var(--grey-400)' }}>{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const Contact = () => {
    return (
        <section id="contact" className="py-32 relative" style={{ background: 'var(--grey-900)' }}>
            <div className="section-rule" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-4 mb-6">
                            <div style={{ width: 40, height: 1, background: 'var(--accent-warm)' }} />
                            <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>Contact</span>
                        </div>
                        <h2 className="display-font mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.95, color: 'var(--white)' }}>
                            GET IN<br />TOUCH
                        </h2>
                        <p className="mb-16" style={{ color: 'var(--grey-400)', fontWeight: 300, lineHeight: 1.8, maxWidth: 380 }}>
                            Ready to secure your future? Reach out for a personalized consultation with our expert advisors.
                        </p>

                        <div className="space-y-10">
                            {[
                                { icon: Phone, label: "Call Us", primary: "+91 98765 43210", secondary: "Mon–Fri, 9am – 6pm" },
                                { icon: Mail, label: "Email Us", primary: "contact@ngconsultant.com", secondary: "consult@ngconsultant.com" },
                                { icon: MapPin, label: "Visit Us", primary: "123 Financial District,", secondary: "Mumbai, Maharashtra 400001" },
                            ].map(({ icon: Icon, label, primary, secondary }, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group flex items-start gap-6"
                                >
                                    <div
                                        className="p-3 flex-shrink-0 transition-all duration-300"
                                        style={{ border: '1px solid var(--grey-700)', background: 'var(--contact-icon-bg)' }}
                                        onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#b91c1c'; el.style.borderColor = '#b91c1c'; (el.querySelector('svg') as SVGElement)!.style.color = '#fff'; }}
                                        onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--contact-icon-bg)'; el.style.borderColor = 'var(--grey-700)'; (el.querySelector('svg') as SVGElement)!.style.color = 'var(--accent-warm)'; }}
                                    >
                                        <Icon size={18} style={{ color: 'var(--accent-warm)', transition: 'color 0.3s' }} />
                                    </div>
                                    <div>
                                        <p className="condensed-font text-xs tracking-[0.25em] uppercase mb-1" style={{ color: 'var(--grey-600)' }}>{label}</p>
                                        <p className="condensed-font text-lg tracking-wide" style={{ color: 'var(--white)' }}>{primary}</p>
                                        <p className="text-sm" style={{ color: 'var(--grey-400)', fontWeight: 300 }}>{secondary}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                        <div className="p-10" style={{ background: 'var(--form-bg)', border: '1px solid var(--grey-700)' }}>
                            <h3 className="condensed-font text-2xl tracking-widest uppercase mb-10" style={{ color: 'var(--white)' }}>
                                Send a Message
                            </h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-400)' }}>Name</label>
                                        <Input placeholder="John Doe" className="rounded-none h-12 text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-400)' }}>Email</label>
                                        <Input type="email" placeholder="john@example.com" className="rounded-none h-12 text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-400)' }}>Subject</label>
                                    <Input placeholder="Consultation Request" className="rounded-none h-12 text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-400)' }}>Message</label>
                                    <textarea
                                        className="flex min-h-[140px] w-full border px-4 py-3 text-sm placeholder:text-sm rounded-none resize-none focus-visible:outline-none"
                                        style={{ border: '1px solid var(--grey-700)', background: 'var(--input-bg)', color: 'var(--white)' }}
                                        placeholder="How can we help you explore your financial future?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full condensed-font text-lg tracking-[0.15em] uppercase py-4 transition-all duration-300"
                                    style={{ background: 'var(--accent-warm)', color: 'var(--bg-body)', border: 'none', cursor: 'pointer' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#b91c1c'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-warm)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--bg-body)'; }}
                                >
                                    Send Message →
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


// ─── Page ─────────────────────────────────────────────────────────────────────
const HomePage = () => {
    return (
        <Layout>
            <GlobalStyles />
            <Hero />
            <About />
            <Services />
            <WhyUs />
            <Testimonials />
            <Contact />
        </Layout>
    );
};

export default HomePage;