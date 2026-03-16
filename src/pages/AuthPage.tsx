import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield, Mail, Lock, User, AlertCircle,
    ShieldCheck, Eye, EyeOff, KeyRound, Fingerprint, Sun, Moon
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme, ThemeProvider } from "../components/layout/themeContext";

// ─── Styles ──────────────────────────────────────────────────────────────────
const AuthStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap');

        /* ── Light (default) ── */
        :root,
        [data-theme="light"] {
            --black:         #f8f5f0;
            --grey-900:      #f0ebe3;
            --grey-800:      #e5ddd0;
            --grey-700:      #d4c9b8;
            --grey-600:      #a09080;
            --grey-400:      #5a4a3a;
            --grey-200:      #2e1f14;
            --white:         #1a0f08;
            --accent-warm:   #9b6c3a;
            --accent-red:    #b91c1c;
            --bg-body:       #f8f5f0;
            --panel-bg:      #f0ebe3;
            --input-bg:      #ede6db;
            --input-border:  #d4c9b8;
            --label-color:   #7a6a5a;
            --muted:         #a09080;
            --divider:       #d4c9b8;
            --security-badge-bg: #e8e0d4;
        }

        /* ── Dark ── */
        [data-theme="dark"] {
            --black:         #080808;
            --grey-900:      #0f0f0f;
            --grey-800:      #1a1a1a;
            --grey-700:      #252525;
            --grey-600:      #333333;
            --grey-400:      #888888;
            --grey-200:      #c8c8c8;
            --white:         #f0f0f0;
            --accent-warm:   #9b6c3a;
            --accent-red:    #b91c1c;
            --bg-body:       #080808;
            --panel-bg:      #0f0f0f;
            --input-bg:      #0d0d0d;
            --input-border:  #252525;
            --label-color:   #888888;
            --muted:         #555555;
            --divider:       #1a1a1a;
            --security-badge-bg: #111111;
        }

        .auth-body {
            min-height: 100vh;
            background: var(--bg-body);
            color: var(--white);
            font-family: 'Barlow', sans-serif;
            transition: background 0.4s ease, color 0.4s ease;
            position: relative;
        }

        /* Grain overlay */
        .auth-body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
            opacity: 0.025;
            pointer-events: none;
            z-index: 9999;
        }

        .display-font { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
        .condensed-font { font-family: 'Barlow Condensed', sans-serif; }

        /* Submit button */
        .auth-btn {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.9rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            background: var(--accent-warm);
            color: var(--bg-body);
            padding: 14px 28px;
            border: none;
            cursor: pointer;
            display: block;
            width: 100%;
            clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
            transition: background 0.3s ease, color 0.3s ease;
            font-weight: 700;
        }
        .auth-btn:hover:not(:disabled) { background: var(--accent-red); color: #f0f0f0; }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        [data-theme="dark"] .auth-btn { background: #b91c1c; color: #f0f0f0; }
        [data-theme="dark"] .auth-btn:hover:not(:disabled) { background: #991b1b; }

        /* Tab switcher */
        .auth-tab {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            padding: 10px 20px;
            cursor: pointer;
            border: none;
            background: transparent;
            color: var(--grey-400);
            transition: color 0.3s, border-bottom 0.3s;
            border-bottom: 2px solid transparent;
            flex: 1;
        }
        .auth-tab.active { color: var(--white); border-bottom: 2px solid var(--accent-red); }
        .auth-tab:not(.active):hover { color: var(--grey-200); }

        /* Inputs */
        .auth-input-wrapper { position: relative; }
        .auth-input-icon {
            position: absolute;
            left: 12px; top: 50%; transform: translateY(-50%);
            color: var(--label-color);
            pointer-events: none;
        }
        .auth-input {
            width: 100%; height: 48px;
            background: var(--input-bg);
            border: 1px solid var(--input-border);
            color: var(--white);
            padding: 0 40px 0 40px;
            font-family: 'Barlow', sans-serif;
            font-size: 0.9rem;
            border-radius: 0;
            outline: none;
            transition: border-color 0.3s;
        }
        .auth-input::placeholder { color: var(--muted); font-size: 0.85rem; }
        .auth-input:focus { border-color: var(--accent-red); }

        .pwd-toggle {
            position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
            background: none; border: none; cursor: pointer;
            color: var(--label-color); padding: 0; transition: color 0.2s;
        }
        .pwd-toggle:hover { color: var(--grey-200); }

        .auth-label {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.7rem; letter-spacing: 0.25em;
            text-transform: uppercase; color: var(--label-color);
            display: block; margin-bottom: 6px;
        }

        .auth-error {
            display: flex; align-items: center; gap: 10px;
            padding: 12px 16px;
            background: rgba(185,28,28,0.08);
            border: 1px solid rgba(185,28,28,0.3);
            color: #ef4444; font-size: 0.82rem;
            font-family: 'Barlow', sans-serif;
            margin-bottom: 20px;
        }

        .security-badge {
            display: flex; align-items: center; gap: 8px;
            padding: 8px 12px;
            background: var(--security-badge-bg);
            border: 1px solid var(--divider);
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.65rem; letter-spacing: 0.15em;
            text-transform: uppercase; color: var(--grey-400);
        }

        .theme-toggle-auth {
            display: flex; align-items: center; justify-content: center;
            width: 36px; height: 36px;
            background: none; border: 1px solid var(--input-border);
            cursor: pointer; color: var(--grey-400);
            clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
            transition: border-color 0.3s, color 0.3s;
        }
        .theme-toggle-auth:hover { border-color: var(--accent-red); color: var(--accent-red); }

        .auth-checkbox {
            width: 14px; height: 14px;
            border: 1px solid var(--input-border);
            background: var(--input-bg);
            accent-color: var(--accent-red);
            cursor: pointer; flex-shrink: 0; margin-top: 2px;
        }

        /* Corner decorators */
        .corner-tl {
            position: absolute; top: 0; left: 0;
            width: 20px; height: 20px;
            border-top: 2px solid var(--accent-red);
            border-left: 2px solid var(--accent-red);
        }
        .corner-br {
            position: absolute; bottom: 0; right: 0;
            width: 20px; height: 20px;
            border-bottom: 2px solid var(--accent-red);
            border-right: 2px solid var(--accent-red);
        }

        /* ── Brand panel enhancements ───────────────────────────────────────── */

        /* Subtle warm-tone grid texture */
        .brand-grid-bg {
            position: absolute; inset: 0; pointer-events: none;
            background-image:
                linear-gradient(rgba(155,108,58,0.045) 1px, transparent 1px),
                linear-gradient(90deg, rgba(155,108,58,0.045) 1px, transparent 1px);
            background-size: 44px 44px;
        }
        [data-theme="light"] .brand-grid-bg {
            background-image:
                linear-gradient(rgba(155,108,58,0.09) 1px, transparent 1px),
                linear-gradient(90deg, rgba(155,108,58,0.09) 1px, transparent 1px);
        }

        /* Slow vertical scan-line sweep */
        @keyframes panel-scan {
            0%   { transform: translateY(-80px); opacity: 0; }
            5%   { opacity: 1; }
            90%  { opacity: 1; }
            100% { transform: translateY(110vh); opacity: 0; }
        }
        .brand-scan-line {
            position: absolute; left: 0; right: 0; height: 80px; top: 0;
            background: linear-gradient(to bottom,
                transparent,
                rgba(185,28,28,0.04) 40%,
                rgba(185,28,28,0.07) 50%,
                rgba(185,28,28,0.04) 60%,
                transparent
            );
            animation: panel-scan 12s ease-in-out infinite;
            pointer-events: none;
        }

        /* Left-edge gradient bar */
        .brand-edge-bar {
            position: absolute; left: 0; top: 15%; bottom: 15%;
            width: 2px;
            background: linear-gradient(
                to bottom,
                transparent,
                var(--accent-red) 35%,
                var(--accent-warm) 65%,
                transparent
            );
            opacity: 0.55;
        }

        /* Radial glow behind the heading */
        .brand-heading-glow {
            position: absolute;
            top: -40px; left: -24px; right: -24px; bottom: -40px;
            background: radial-gradient(ellipse at 25% 55%, rgba(185,28,28,0.09) 0%, transparent 68%);
            pointer-events: none;
        }

        /* Glowing "SECURED." */
        .text-secured {
            color: var(--accent-red);
            text-shadow:
                0 0 28px rgba(185,28,28,0.6),
                0 0 64px rgba(185,28,28,0.22);
        }
        [data-theme="light"] .text-secured {
            text-shadow: 0 0 18px rgba(185,28,28,0.28);
        }

        /* Bracket corner decorators on heading block */
        .brand-bracket {
            position: absolute;
            width: 16px; height: 16px;
        }
        .brand-bracket-tl {
            top: 0; left: -4px;
            border-top: 1px solid rgba(185,28,28,0.7);
            border-left: 1px solid rgba(185,28,28,0.7);
        }
        .brand-bracket-br {
            bottom: 0; right: -4px;
            border-bottom: 1px solid rgba(155,108,58,0.7);
            border-right: 1px solid rgba(155,108,58,0.7);
        }

        /* Stats */
        .brand-stat-accent {
            display: block;
            width: 16px; height: 2px;
            background: var(--accent-warm);
            margin-bottom: 6px;
        }
        .brand-stat-value {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 1.7rem;
            line-height: 1;
            color: var(--white);
            letter-spacing: 0.04em;
        }
        .brand-stat-label {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.58rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--grey-400);
            margin-top: 3px;
        }

        /* Pillar icon box with angular clip */
        .pillar-icon-box {
            clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px));
            position: relative;
            overflow: hidden;
        }
        .pillar-icon-box::after {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(135deg, rgba(155,108,58,0.14), transparent 55%);
            pointer-events: none;
        }

        /* Pillar rows slide right on hover */
        .pillar-row { transition: transform 0.25s ease; }
        .pillar-row:hover { transform: translateX(5px); }

        @media (max-width: 768px) {
            .auth-grid { grid-template-columns: 1fr !important; }
            .auth-left-panel { display: none !important; }
        }

        /* Custom Scrollbar for Left panel */
        .auth-left-panel::-webkit-scrollbar {
            width: 6px;
        }
        .auth-left-panel::-webkit-scrollbar-track {
            background: transparent;
        }
        .auth-left-panel::-webkit-scrollbar-thumb {
            background: var(--divider);
            border-radius: 4px;
        }
        .auth-left-panel::-webkit-scrollbar-thumb:hover {
            background: var(--grey-400);
        }
    `}</style>
);

// ─── Security Pillars ─────────────────────────────────────────────────────────
const securityPoints = [
    {
        icon: ShieldCheck,
        title: "Bank-Grade Encryption",
        desc: "All data secured with AES-256 encryption at rest and in transit.",
    },
    {
        icon: KeyRound,
        title: "Zero-Knowledge Access",
        desc: "Your credentials are never stored in plain text. Ever.",
    },
    {
        icon: Fingerprint,
        title: "Multi-Factor Ready",
        desc: "Optional 2FA to keep your account protected at all times.",
    },
];

// ─── Component ────────────────────────────────────────────────────────────────
const AuthPageContent = () => {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login, register, isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    // Login state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLoginPwd, setShowLoginPwd] = useState(false);

    // Register state
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [showRegPwd, setShowRegPwd] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await login(loginEmail, loginPassword);
            // Navigation is now handled by useEffect listening to isAuthenticated
        } catch (err: any) {
            setError(err.message || "Invalid email or password");
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await register(registerName, registerEmail, registerPassword);
            // Navigation is now handled by useEffect
        } catch (err: any) {
            setError(err.message || "Could not complete registration");
            setIsLoading(false);
        } 
    };

    return (
        <div className="auth-body" data-theme={theme}>
            <AuthStyles />

            {/* ── Top Bar ───────────────────────────────────────────────────── */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 2rem', height: '64px',
                background: theme === 'dark' ? 'rgba(8,8,8,0.92)' : 'rgba(248,245,240,0.92)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--divider)',
            }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src="/Company_Logo.png" alt="NG Consultant" style={{ height: 44, objectFit: 'contain' }} />
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {/* Live secure indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                        <span className="condensed-font" style={{
                            fontSize: '0.65rem', letterSpacing: '0.2em',
                            textTransform: 'uppercase', color: 'var(--grey-400)',
                        }}>
                            Secure Connection
                        </span>
                    </div>

                    <div style={{ width: 1, height: 20, background: 'var(--divider)' }} />

                    <button className="theme-toggle-auth" onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                        <AnimatePresence mode="wait">
                            {theme === 'dark' ? (
                                <motion.div key="sun"
                                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}>
                                    <Sun size={14} />
                                </motion.div>
                            ) : (
                                <motion.div key="moon"
                                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}>
                                    <Moon size={14} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* ── Main Grid ─────────────────────────────────────────────────── */}
            <div className="auth-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                minHeight: '100vh',
                paddingTop: '64px',
            }}>

                {/* ── LEFT — Brand & Security Panel ───────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="auth-left-panel"
                    style={{
                        background: 'var(--panel-bg)',
                        borderRight: '1px solid var(--divider)',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '52px 48px',
                        /* FIX: sticky + fixed height decouples left panel from right panel's
                           content height changes, eliminating the security-badge jump */
                        position: 'sticky',
                        top: '64px',
                        height: 'calc(100vh - 64px)',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    {/* ── Decorative bg layers (pointer-events: none so they don't block clicks) */}
                    <div className="brand-grid-bg" />
                    <div className="brand-edge-bar" />

                    {/* ── Main brand content ── */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>

                        {/* "Client Portal" label with extending rule */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                            <div style={{ width: 40, height: 1, background: 'var(--accent-warm)' }} />
                            <span className="condensed-font" style={{
                                fontSize: '0.65rem', letterSpacing: '0.3em',
                                textTransform: 'uppercase', color: 'var(--accent-warm)',
                            }}>
                                Client Portal
                            </span>
                            <div style={{ flex: 1, height: 1, background: 'var(--divider)' }} />
                        </div>

                        {/* Heading with glow + bracket corners */}
                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20, padding: '10px 6px' }}>
                            <div className="brand-heading-glow" />
                            <div className="brand-bracket brand-bracket-tl" />
                            <div className="brand-bracket brand-bracket-br" />
                            <h1 className="display-font" style={{
                                fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                                lineHeight: 0.92,
                                color: 'var(--white)',
                            }}>
                                YOUR FUTURE<br />
                                <span className="text-secured">SECURED.</span>
                            </h1>
                        </div>

                        <p style={{
                            color: 'var(--grey-400)', fontWeight: 300, lineHeight: 1.8,
                            fontSize: '0.9rem', maxWidth: 340, marginBottom: 32,
                        }}>
                            Access your insurance portfolio, track your policies, and connect with expert advisors — all in one protected space.
                        </p>

                        {/* Stats row */}
                        <div style={{
                            display: 'flex',
                            borderTop: '1px solid var(--divider)',
                            borderBottom: '1px solid var(--divider)',
                            padding: '18px 0',
                            marginBottom: 32,
                        }}>
                            {[
                                { value: "10K+", label: "Clients Protected" },
                                { value: "AES-256", label: "Encryption Std." },
                                { value: "99.9%", label: "Uptime SLA" },
                            ].map(({ value, label }, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                                    style={{
                                        flex: 1,
                                        paddingLeft: i > 0 ? 20 : 0,
                                        borderLeft: i > 0 ? '1px solid var(--divider)' : 'none',
                                    }}
                                >
                                    <span className="brand-stat-accent" />
                                    <div className="brand-stat-value">{value}</div>
                                    <div className="brand-stat-label">{label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Security pillars */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                            {securityPoints.map(({ icon: Icon, title, desc }, i) => (
                                <motion.div
                                    key={i}
                                    className="pillar-row"
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
                                >
                                    <div className="pillar-icon-box" style={{
                                        width: 36, height: 36, flexShrink: 0,
                                        background: 'var(--grey-800)',
                                        border: '1px solid var(--grey-700)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Icon size={16} style={{ color: 'var(--accent-warm)', position: 'relative', zIndex: 1 }} />
                                    </div>
                                    <div>
                                        <p className="condensed-font" style={{
                                            fontSize: '0.85rem', letterSpacing: '0.1em',
                                            textTransform: 'uppercase', color: 'var(--white)', marginBottom: 3,
                                        }}>{title}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--grey-400)', fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Security badges — pinned below content, no jump */}
                    <div style={{ position: 'relative', zIndex: 1, marginTop: 32 }}>
                        <div style={{ height: 1, background: 'var(--divider)', marginBottom: 20 }} />
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            {["256-bit SSL", "IRDAI Compliant", "ISO 27001"].map((badge) => (
                                <div key={badge} className="security-badge">
                                    <Shield size={10} style={{ color: 'var(--accent-warm)' }} />
                                    {badge}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── RIGHT — Form Panel ───────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '48px 32px',
                        background: 'var(--bg-body)',
                    }}
                >
                    <div style={{ width: '100%', maxWidth: 440 }}>

                        {/* Label */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                            <div style={{ width: 24, height: 1, background: 'var(--accent-warm)' }} />
                            <span className="condensed-font" style={{
                                fontSize: '0.65rem', letterSpacing: '0.3em',
                                textTransform: 'uppercase', color: 'var(--accent-warm)',
                            }}>
                                {activeTab === "login" ? "Secure Sign In" : "Create Account"}
                            </span>
                        </div>

                        {/* Heading */}
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={activeTab + "-h"}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="display-font"
                                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--white)', lineHeight: 1, marginBottom: 6 }}
                            >
                                {activeTab === "login" ? "WELCOME BACK" : "JOIN THE PORTAL"}
                            </motion.h2>
                        </AnimatePresence>
                        <p style={{ color: 'var(--grey-400)', fontWeight: 300, fontSize: '0.85rem', marginBottom: 32 }}>
                            {activeTab === "login"
                                ? "Enter your credentials to access your insurance dashboard."
                                : "Register to manage your policies and connect with advisors."}
                        </p>

                        {/* Tabs */}
                        <div style={{ display: 'flex', borderBottom: '1px solid var(--divider)', marginBottom: 28 }}>
                            {(["login", "register"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    className={`auth-tab ${activeTab === tab ? "active" : ""}`}
                                    onClick={() => { setActiveTab(tab); setError(null); }}
                                >
                                    {tab === "login" ? "Sign In" : "Register"}
                                </button>
                            ))}
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    className="auth-error"
                                >
                                    <AlertCircle size={14} style={{ flexShrink: 0 }} />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── Forms ──────────────────────────────────────────── */}
                        <AnimatePresence mode="wait">
                            {activeTab === "login" ? (
                                <motion.form
                                    key="login"
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleLogin}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                                >
                                    <div>
                                        <label className="auth-label">Email Address</label>
                                        <div className="auth-input-wrapper">
                                            <Mail className="auth-input-icon" size={14} />
                                            <input className="auth-input" type="email" placeholder="john@example.com"
                                                value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="auth-label">Password</label>
                                        <div className="auth-input-wrapper">
                                            <Lock className="auth-input-icon" size={14} />
                                            <input className="auth-input" type={showLoginPwd ? "text" : "password"} placeholder="••••••••"
                                                value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                                            <button type="button" className="pwd-toggle" onClick={() => setShowLoginPwd(!showLoginPwd)}>
                                                {showLoginPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                            <input type="checkbox" className="auth-checkbox" />
                                            <span className="condensed-font" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--grey-400)' }}>
                                                Remember me
                                            </span>
                                        </label>
                                        <a href="#" className="condensed-font" style={{
                                            fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                                            color: 'var(--accent-warm)', textDecoration: 'none', transition: 'color 0.2s',
                                        }}
                                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-red)')}
                                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent-warm)')}>
                                            Forgot password?
                                        </a>
                                    </div>

                                    <div style={{ marginTop: 4, position: 'relative' }}>
                                        <div className="corner-tl" />
                                        <div className="corner-br" />
                                        <button type="submit" className="auth-btn" disabled={isLoading}>
                                            {isLoading ? "Authenticating..." : "Sign In  →"}
                                        </button>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="register"
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleRegister}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
                                >
                                    <div>
                                        <label className="auth-label">Full Name</label>
                                        <div className="auth-input-wrapper">
                                            <User className="auth-input-icon" size={14} />
                                            <input className="auth-input" type="text" placeholder="John Doe"
                                                value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="auth-label">Email Address</label>
                                        <div className="auth-input-wrapper">
                                            <Mail className="auth-input-icon" size={14} />
                                            <input className="auth-input" type="email" placeholder="john@example.com"
                                                value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="auth-label">Password</label>
                                        <div className="auth-input-wrapper">
                                            <Lock className="auth-input-icon" size={14} />
                                            <input className="auth-input"
                                                type={showRegPwd ? "text" : "password"} placeholder="Min. 8 characters"
                                                value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}
                                                required minLength={8} />
                                            <button type="button" className="pwd-toggle" onClick={() => setShowRegPwd(!showRegPwd)}>
                                                {showRegPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                                            </button>
                                        </div>
                                        {/* Password strength bar */}
                                        {registerPassword.length > 0 && (
                                            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                                                {[1, 2, 3, 4].map((level) => {
                                                    const strength = Math.min(Math.floor(registerPassword.length / 3), 4);
                                                    const color = strength <= 1 ? '#ef4444' : strength <= 2 ? '#f59e0b' : strength <= 3 ? '#3b82f6' : '#22c55e';
                                                    return (
                                                        <div key={level} style={{
                                                            flex: 1, height: 2,
                                                            background: level <= strength ? color : 'var(--divider)',
                                                            transition: 'background 0.3s',
                                                        }} />
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                                        <input type="checkbox" className="auth-checkbox" required />
                                        <span style={{ fontSize: '0.78rem', color: 'var(--grey-400)', lineHeight: 1.6, fontWeight: 300 }}>
                                            I agree to the{" "}
                                            <a href="#" style={{ color: 'var(--accent-warm)', textDecoration: 'none' }}>Terms of Service</a>
                                            {" "}and{" "}
                                            <a href="#" style={{ color: 'var(--accent-warm)', textDecoration: 'none' }}>Privacy Policy</a>
                                        </span>
                                    </label>

                                    <div style={{ marginTop: 4, position: 'relative' }}>
                                        <div className="corner-tl" />
                                        <div className="corner-br" />
                                        <button type="submit" className="auth-btn" disabled={isLoading}>
                                            {isLoading ? "Creating Account..." : "Create Account  →"}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* Footer links */}
                        <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--divider)' }}>
                            <p className="condensed-font" style={{
                                fontSize: '0.65rem', letterSpacing: '0.15em',
                                textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center',
                            }}>
                                Need help?{" "}
                                <a href="/#contact" style={{ color: 'var(--accent-warm)', textDecoration: 'none' }}>Contact Support</a>
                                {" "} · {" "}
                                <Link to="/" style={{ color: 'var(--grey-400)', textDecoration: 'none' }}>Back to Home</Link>
                            </p>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const AuthPage = () => (
    <ThemeProvider>
        <AuthPageContent />
    </ThemeProvider>
);

export default AuthPage;