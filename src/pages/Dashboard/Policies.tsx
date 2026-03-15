import { motion } from "framer-motion";
import { useState } from "react";
import {
    Heart, Umbrella, Car, Banknote, Briefcase, Shield,
    Download, ChevronRight, FileText, AlertTriangle, CheckCircle, Clock,
    Filter, Search
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
// ─── Global Styles ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300;1,400&family=Barlow+Condensed:wght@700;900&display=swap');

        :root, [data-theme="dark"] {
            --black: #080808; --grey-900: #0f0f0f; --grey-800: #1a1a1a;
            --grey-700: #252525; --grey-600: #333333; --grey-400: #888888;
            --grey-200: #c8c8c8; --white: #f0f0f0; --accent-warm: #c9b99a;
            --bg-body: #080808; --section-alt: #0f0f0f; --input-bg: #0f0f0f;
            --form-bg: #1a1a1a; --stat-watermark: #1a1a1a; --scrollbar-thumb: #333333;
        }
        [data-theme="light"] {
            --black: #f8f5f0; --grey-900: #f0ebe3; --grey-800: #e5ddd0;
            --grey-700: #d4c9b8; --grey-600: #a09080; --grey-400: #5a4a3a;
            --grey-200: #2e1f14; --white: #1a0f08; --accent-warm: #9b6c3a;
            --bg-body: #f8f5f0; --section-alt: #f0ebe3; --input-bg: #f0ebe3;
            --form-bg: #e8e0d4; --stat-watermark: #e5ddd0; --scrollbar-thumb: #c4b8a8;
        }

        body {
            background: var(--bg-body) !important;
            color: var(--white) !important;
            font-family: 'Barlow', sans-serif !important;
            transition: background 0.4s ease, color 0.4s ease;
        }
        .display-font { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
        .condensed-font { font-family: 'Barlow Condensed', sans-serif; }

        body::before {
            content: '';
            position: fixed; inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
            opacity: 0.025; pointer-events: none; z-index: 9999;
        }

        .section-rule {
            width: 100%; height: 1px;
            background: linear-gradient(90deg, transparent, var(--grey-700), transparent);
        }

        /* Summary Cards */
        .summary-card {
            border: 1px solid var(--grey-700);
            background: var(--form-bg);
            position: relative;
            overflow: hidden;
            transition: border-color 0.3s ease, transform 0.2s ease;
            cursor: default;
        }
        .summary-card:hover { border-color: var(--accent-warm); transform: translateY(-2px); }
        .summary-card::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 2px;
            background: var(--card-accent, var(--accent-warm));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
        }
        .summary-card:hover::after { transform: scaleX(1); }

        /* Policy Row */
        .policy-row {
            border-bottom: 1px solid var(--grey-700);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .policy-row::before {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(90deg, transparent, rgba(155,108,58,0.04), transparent);
            transform: translateX(-100%);
            transition: transform 0.5s ease;
        }
        .policy-row:hover::before { transform: translateX(100%); }
        .policy-row:hover { background: var(--section-alt); border-bottom-color: var(--accent-warm); }
        .policy-row:hover .row-arrow { opacity: 1; transform: translateX(0); }

        .row-arrow { opacity: 0; transform: translateX(-6px); transition: all 0.3s ease; }

        /* Status badges */
        .status-badge {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 3px 10px;
            border: 1px solid;
            font-family: 'Barlow Condensed', sans-serif;
            letter-spacing: 0.18em; font-size: 0.68rem; text-transform: uppercase;
        }
        .badge-active { border-color: rgba(74,222,128,0.35); background: rgba(74,222,128,0.06); color: #4ade80; }
        .badge-due    { border-color: rgba(251,191,36,0.35);  background: rgba(251,191,36,0.06);  color: #fbbf24; }
        .badge-expired{ border-color: rgba(248,113,113,0.35); background: rgba(248,113,113,0.06); color: #f87171; }

        /* Filter pill */
        .filter-pill {
            font-family: 'Barlow Condensed', sans-serif;
            letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.75rem;
            padding: 6px 18px;
            border: 1px solid var(--grey-700);
            color: var(--grey-400);
            background: transparent;
            cursor: pointer;
            transition: all 0.25s ease;
            white-space: nowrap;
        }
        .filter-pill:hover { border-color: var(--accent-warm); color: var(--accent-warm); }
        .filter-pill.active { border-color: var(--accent-warm); color: var(--black); background: var(--accent-warm); }

        /* Download button */
        .dl-btn {
            display: inline-flex; align-items: center; gap: 6px;
            font-family: 'Barlow Condensed', sans-serif;
            letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.72rem;
            padding: 7px 14px;
            border: 1px solid var(--grey-700);
            color: var(--grey-400);
            background: transparent;
            cursor: pointer;
            transition: all 0.25s ease;
            white-space: nowrap;
        }
        .dl-btn:hover { border-color: var(--accent-warm); color: var(--accent-warm); }

        /* Search input */
        input[type="text"] {
            background: var(--input-bg) !important; border-color: var(--grey-700) !important;
            color: var(--white) !important; border-radius: 2px !important;
            font-family: 'Barlow', sans-serif !important;
            transition: border-color 0.3s ease;
        }
        input[type="text"]::placeholder { color: var(--grey-600) !important; }
        input[type="text"]:focus { border-color: var(--accent-warm) !important; outline: none !important; box-shadow: none !important; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--black); }
        ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 2px; }

        *, *::before, *::after { transition-property: background-color, border-color, color; transition-duration: 0.35s; transition-timing-function: ease; }
        .policy-row, .summary-card { transition-property: all; }
    `}</style>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const POLICIES = [
    {
        id: 1,
        icon: Heart,
        name: "Health Shield Plus",
        provider: "Star Health Insurance",
        policyNo: "SH-2021-00412",
        type: "Health",
        sumAssured: "₹10,00,000",
        premium: "₹18,500/yr",
        startDate: "12 Jun 2021",
        expiryDate: "12 Jun 2025",
        daysLeft: 88,
        status: "active",
    },
    {
        id: 2,
        icon: Umbrella,
        name: "SecureLife Term Plan",
        provider: "LIC of India",
        policyNo: "LIC-2019-88743",
        type: "Life",
        sumAssured: "₹1,00,00,000",
        premium: "₹8,200/yr",
        startDate: "15 Apr 2019",
        expiryDate: "15 Apr 2025",
        daysLeft: 30,
        status: "due",
    },
    {
        id: 3,
        icon: Car,
        name: "Motor Protect 360",
        provider: "ICICI Lombard",
        policyNo: "IL-2024-33101",
        type: "Motor",
        sumAssured: "₹6,50,000",
        premium: "₹4,600/yr",
        startDate: "28 Apr 2024",
        expiryDate: "28 Apr 2025",
        daysLeft: 43,
        status: "due",
    },
    {
        id: 4,
        icon: Banknote,
        name: "Wealth Builder SIP",
        provider: "HDFC Mutual Fund",
        policyNo: "HDFC-MF-77211",
        type: "Investment",
        sumAssured: "₹2,14,000 (NAV)",
        premium: "₹5,000/mo",
        startDate: "01 Jan 2022",
        expiryDate: "01 Jan 2027",
        daysLeft: 648,
        status: "active",
    },
    {
        id: 5,
        icon: Shield,
        name: "Critical Illness Guard",
        provider: "HDFC ERGO",
        policyNo: "HDFC-CI-44312",
        type: "Health",
        sumAssured: "₹25,00,000",
        premium: "₹9,800/yr",
        startDate: "03 Mar 2023",
        expiryDate: "03 Mar 2026",
        daysLeft: 352,
        status: "active",
    },
    {
        id: 6,
        icon: Briefcase,
        name: "Pension Secure Plus",
        provider: "Bajaj Allianz",
        policyNo: "BA-2018-09812",
        type: "Retirement",
        sumAssured: "Corpus on maturity",
        premium: "₹25,000/yr",
        startDate: "10 Nov 2018",
        expiryDate: "10 Nov 2024",
        daysLeft: 0,
        status: "expired",
    },
];

const FILTERS = ["All", "Active", "Due", "Expired"];

const TYPE_COLORS: Record<string, string> = {
    Health: "#4ade80",
    Life: "#60a5fa",
    Motor: "#f59e0b",
    Investment: "#a78bfa",
    Retirement: "#fb7185",
};

// ─── Summary Cards ────────────────────────────────────────────────────────────
const SummaryCards = () => {
    const cards = [
        {
            label: "Total Policies",
            value: 6,
            icon: FileText,
            accent: "#c9b99a",
            watermark: "TOTAL",
        },
        {
            label: "Active Policies",
            value: 3,
            icon: CheckCircle,
            accent: "#4ade80",
            watermark: "ACTIVE",
        },
        {
            label: "Due for Renewal",
            value: 2,
            icon: AlertTriangle,
            accent: "#fbbf24",
            watermark: "DUE",
        },
        {
            label: "Expired",
            value: 1,
            icon: Clock,
            accent: "#f87171",
            watermark: "LAPSED",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.09 }}
                    className="summary-card p-7"
                    style={{ '--card-accent': card.accent } as React.CSSProperties}
                >
                    {/* Watermark number */}
                    <div
                        className="absolute top-0 right-3 display-font select-none pointer-events-none"
                        style={{ fontSize: '5.5rem', lineHeight: 1, color: 'var(--grey-700)', opacity: 0.5 }}
                    >
                        {card.value}
                    </div>

                    {/* Icon */}
                    <div className="mb-5 relative z-10">
                        <div
                            className="inline-flex p-2"
                            style={{ background: 'var(--grey-800)', border: `1px solid ${card.accent}22` }}
                        >
                            <card.icon size={16} style={{ color: card.accent }} />
                        </div>
                    </div>

                    {/* Number */}
                    <div
                        className="display-font relative z-10"
                        style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', lineHeight: 1, color: card.accent }}
                    >
                        {card.value}
                    </div>

                    {/* Label */}
                    <div
                        className="condensed-font text-xs tracking-[0.22em] uppercase mt-2 relative z-10"
                        style={{ color: 'var(--grey-400)' }}
                    >
                        {card.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// ─── Policy Table ─────────────────────────────────────────────────────────────
const PolicyList = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = POLICIES.filter(p => {
        const matchFilter =
            activeFilter === "All" ||
            (activeFilter === "Active" && p.status === "active") ||
            (activeFilter === "Due" && p.status === "due") ||
            (activeFilter === "Expired" && p.status === "expired");
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.provider.toLowerCase().includes(search.toLowerCase()) ||
            p.policyNo.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    return (
        <div>
            {/* Section heading + controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-4 mb-3">
                        <div style={{ width: 30, height: 1, background: 'var(--accent-warm)' }} />
                        <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>
                            All Policies
                        </span>
                    </div>
                    <h2
                        className="display-font"
                        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.95, color: 'var(--white)' }}
                    >
                        YOUR COVERAGE
                    </h2>
                </div>

                {/* Search */}
                <div className="relative" style={{ minWidth: 240 }}>
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--grey-600)' }} />
                    <input
                        type="text"
                        placeholder="Search policies..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full h-10 pl-9 pr-4 text-sm"
                        style={{ border: '1px solid var(--grey-700)', background: 'var(--input-bg)', color: 'var(--white)' }}
                    />
                </div>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                <Filter size={14} className="flex-shrink-0 self-center" style={{ color: 'var(--grey-600)', marginRight: 4 }} />
                {FILTERS.map(f => (
                    <button
                        key={f}
                        className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                        onClick={() => setActiveFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Column headers */}
            <div
                className="hidden md:grid mb-1 px-4 py-3"
                style={{
                    gridTemplateColumns: '2.5fr 1.2fr 1.2fr 1.2fr 1fr 1fr',
                    borderBottom: '1px solid var(--grey-700)',
                    borderTop: '1px solid var(--grey-700)',
                }}
            >
                {['Policy', 'Type', 'Sum Assured', 'Expiry', 'Status', ''].map((h, i) => (
                    <span
                        key={i}
                        className="condensed-font text-xs tracking-[0.22em] uppercase"
                        style={{ color: 'var(--grey-600)' }}
                    >
                        {h}
                    </span>
                ))}
            </div>

            {/* Rows */}
            {filtered.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="condensed-font tracking-widest uppercase" style={{ color: 'var(--grey-600)' }}>No policies found</p>
                </div>
            ) : (
                <div>
                    {filtered.map((policy, index) => (
                        <motion.div
                            key={policy.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                            className="policy-row"
                        >
                            {/* Mobile layout */}
                            <div className="md:hidden px-4 py-5 flex items-start gap-4">
                                <div
                                    className="p-2 flex-shrink-0 mt-1"
                                    style={{ background: 'var(--grey-800)', border: '1px solid var(--grey-700)' }}
                                >
                                    <policy.icon size={15} style={{ color: TYPE_COLORS[policy.type] || 'var(--accent-warm)' }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3 mb-1">
                                        <p className="condensed-font text-base tracking-wide uppercase leading-tight" style={{ color: 'var(--white)' }}>
                                            {policy.name}
                                        </p>
                                        <span className={`status-badge flex-shrink-0 ${policy.status === 'active' ? 'badge-active' : policy.status === 'due' ? 'badge-due' : 'badge-expired'}`}>
                                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                                            {policy.status}
                                        </span>
                                    </div>
                                    <p className="text-xs mb-2" style={{ color: 'var(--grey-400)', fontWeight: 300 }}>{policy.provider}</p>
                                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs" style={{ color: 'var(--grey-400)', fontWeight: 300 }}>
                                        <span>{policy.sumAssured}</span>
                                        <span>Exp: {policy.expiryDate}</span>
                                    </div>
                                </div>
                                <button className="dl-btn flex-shrink-0 self-center p-2" style={{ padding: '7px' }}>
                                    <Download size={14} />
                                </button>
                            </div>

                            {/* Desktop layout */}
                            <div
                                className="hidden md:grid items-center px-4 py-6 gap-4"
                                style={{ gridTemplateColumns: '2.5fr 1.2fr 1.2fr 1.2fr 1fr 1fr' }}
                            >
                                {/* Policy name */}
                                <div className="flex items-center gap-4 min-w-0">
                                    <div
                                        className="p-2 flex-shrink-0"
                                        style={{ background: 'var(--grey-800)', border: '1px solid var(--grey-700)' }}
                                    >
                                        <policy.icon size={15} style={{ color: TYPE_COLORS[policy.type] || 'var(--accent-warm)' }} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="condensed-font text-base tracking-wide uppercase leading-tight truncate" style={{ color: 'var(--white)' }}>
                                            {policy.name}
                                        </p>
                                        <p className="text-xs truncate" style={{ color: 'var(--grey-400)', fontWeight: 300 }}>
                                            {policy.provider} · {policy.policyNo}
                                        </p>
                                    </div>
                                </div>

                                {/* Type */}
                                <div>
                                    <span
                                        className="condensed-font text-xs tracking-[0.15em] uppercase px-2 py-1"
                                        style={{
                                            background: `${TYPE_COLORS[policy.type] || '#c9b99a'}12`,
                                            border: `1px solid ${TYPE_COLORS[policy.type] || '#c9b99a'}30`,
                                            color: TYPE_COLORS[policy.type] || 'var(--accent-warm)',
                                        }}
                                    >
                                        {policy.type}
                                    </span>
                                </div>

                                {/* Sum Assured */}
                                <div>
                                    <p className="condensed-font tracking-wide text-sm" style={{ color: 'var(--grey-200)' }}>
                                        {policy.sumAssured}
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--grey-600)', fontWeight: 300 }}>
                                        {policy.premium}
                                    </p>
                                </div>

                                {/* Expiry */}
                                <div>
                                    <p className="condensed-font tracking-wide text-sm" style={{ color: 'var(--grey-200)' }}>
                                        {policy.expiryDate}
                                    </p>
                                    {policy.daysLeft > 0 && (
                                        <p
                                            className="text-xs"
                                            style={{
                                                color: policy.daysLeft <= 45 ? '#fbbf24' : 'var(--grey-600)',
                                                fontWeight: 300,
                                            }}
                                        >
                                            {policy.daysLeft <= 45 ? `⚠ ${policy.daysLeft} days left` : `${policy.daysLeft} days left`}
                                        </p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <span className={`status-badge ${policy.status === 'active' ? 'badge-active' : policy.status === 'due' ? 'badge-due' : 'badge-expired'}`}>
                                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                                        {policy.status === 'due' ? 'Renewal Due' : policy.status}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-3">
                                    <button className="dl-btn">
                                        <Download size={13} /> PDF
                                    </button>
                                    <ChevronRight size={15} className="row-arrow" style={{ color: 'var(--accent-warm)', flexShrink: 0 }} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Footer count */}
            <div className="mt-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--grey-700)', paddingTop: '1.25rem' }}>
                <p className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-600)' }}>
                    Showing {filtered.length} of {POLICIES.length} policies
                </p>
                <p className="condensed-font text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--grey-600)' }}>
                    Last updated: Mar 2025
                </p>
            </div>
        </div>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const PoliciesPage = () => {
    // Consume theme context to trigger re-renders on theme change
    useTheme();

    return (
        <>
            <GlobalStyles />
            <div style={{ background: 'var(--black)', minHeight: '100vh', padding: '0 48px 96px', boxSizing: 'border-box' }}>

                {/* Page header */}
                <section className="relative pt-24 pb-12 overflow-hidden" style={{ background: 'var(--black)' }}>
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        <span
                            className="display-font select-none"
                            style={{ fontSize: 'clamp(6rem, 18vw, 20rem)', color: 'var(--stat-watermark)', lineHeight: 1, whiteSpace: 'nowrap', opacity: 0.45 }}
                        >
                            POLICIES
                        </span>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div style={{ width: 40, height: 1, background: 'var(--accent-warm)' }} />
                                <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>
                                    NG Consultant
                                </span>
                            </div>
                            <h1
                                className="display-font"
                                style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)', lineHeight: 0.92, color: 'var(--white)' }}
                            >
                                MY POLICIES
                            </h1>
                            <p
                                className="mt-4 max-w-lg"
                                style={{ color: 'var(--grey-400)', fontWeight: 300, lineHeight: 1.7, fontSize: '1rem' }}
                            >
                                All your insurance and investment plans in one place — track coverage, premiums, and upcoming renewals.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="section-rule" />

                {/* Main content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <SummaryCards />
                    <div className="section-rule mb-14" />
                    <PolicyList />
                </div>
            </div>
        </>
    );
};

export default PoliciesPage;