import { motion } from "framer-motion";
import {
    CheckCircle2,
    Clock,
    FileText,
    TrendingUp,
    Shield,
    AlertTriangle,
    ArrowRight,
    CalendarDays,
    Banknote,
    Activity,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { supabase } from "../../lib/supabaseClient";

// ─── Global Styles (mirrors HomePage token system) ────────────────────────────
const OverviewStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300;1,400&family=Barlow+Condensed:wght@700;900&display=swap');

        /* ── Light mode (default) ── */
        :root,
        [data-theme="light"] {
            --black:          #f8f5f0;
            --grey-900:       #f0ebe3;
            --grey-800:       #e5ddd0;
            --grey-700:       #d4c9b8;
            --grey-600:       #a09080;
            --grey-400:       #5a4a3a;
            --grey-200:       #2e1f14;
            --white:          #1a0f08;
            --accent:         #3d2e22;
            --accent-warm:    #9b6c3a;
            --accent-blue:    #2a4f85;

            --bg-body:        #f8f5f0;
            --section-alt:    #f0ebe3;
            --input-bg:       #f0ebe3;
            --form-bg:        #e8e0d4;
            --scrollbar-thumb:#c4b8a8;
        }

        /* ── Dark mode ── */
        [data-theme="dark"] {
            --black:          #080808;
            --grey-900:       #0f0f0f;
            --grey-800:       #1a1a1a;
            --grey-700:       #252525;
            --grey-600:       #333333;
            --grey-400:       #888888;
            --grey-200:       #c8c8c8;
            --white:          #f0f0f0;
            --accent:         #e8e0d0;
            --accent-warm:    #c9b99a;
            --accent-blue:    #4a6fa5;

            --bg-body:        #080808;
            --section-alt:    #0f0f0f;
            --input-bg:       #0f0f0f;
            --form-bg:        #1a1a1a;
            --scrollbar-thumb:#333333;
        }

        body {
            background: var(--bg-body) !important;
            color: var(--white) !important;
            font-family: 'Barlow', sans-serif !important;
            transition: background 0.4s ease, color 0.4s ease;
        }

        /* ── Grain overlay ── */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
            opacity: 0.025;
            pointer-events: none;
            z-index: 9999;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--black); }
        ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 2px; }

        /* Global theme transition */
        *, *::before, *::after {
            transition-property: background-color, border-color, color;
            transition-duration: 0.35s;
            transition-timing-function: ease;
        }

        /* ── Section divider (same as HomePage .section-rule) ── */
        .ov-section-rule {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--grey-700), transparent);
            margin-bottom: 48px;
        }

        /* ── Root container ── */
        .ov-root {
            min-height: 100vh;
            background: var(--bg-body);
            color: var(--white);
            font-family: 'Barlow', sans-serif;
            padding: 32px 48px 96px;
            position: relative;
        }

        /* ── Page Header ── */
        .ov-header {
            margin-bottom: 56px;
        }
        .ov-eyebrow {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }
        .ov-eyebrow-line {
            width: 40px;
            height: 1px;
            background: var(--accent-warm);
        }
        .ov-eyebrow-text {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: var(--accent-warm);
        }
        .ov-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(2.4rem, 4vw, 4rem);
            letter-spacing: 0.04em;
            color: var(--white);
            line-height: 0.95;
            margin-bottom: 10px;
        }
        .ov-subtitle {
            font-size: 0.95rem;
            font-weight: 300;
            color: var(--grey-400);
            letter-spacing: 0.02em;
            line-height: 1.6;
        }

        /* ── Stats Grid ── */
        .ov-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            background: var(--grey-800);
            border: 1px solid var(--grey-800);
            margin-bottom: 48px;
        }
        .ov-stat-card {
            background: var(--black);
            padding: 32px 28px;
            position: relative;
            overflow: hidden;
            transition: background 0.25s ease;
        }
        .ov-stat-card:hover {
            background: var(--grey-900);
        }
        .ov-stat-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .ov-stat-icon {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .ov-stat-trend {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.68rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            color: var(--grey-600);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .ov-stat-value {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 3rem;
            letter-spacing: 0.02em;
            color: var(--white);
            line-height: 1;
            margin-bottom: 4px;
        }
        .ov-stat-label {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--grey-600);
        }
        .ov-stat-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
        }

        /* ── Two-column grid ── */
        .ov-grid-2 {
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 24px;
            align-items: start;
        }

        /* ── Card base ── */
        .ov-card {
            background: var(--black);
            border: 1px solid var(--grey-800);
        }
        .ov-card-header {
            padding: 24px 28px;
            border-bottom: 1px solid var(--grey-800);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .ov-card-title {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--grey-400);
        }
        .ov-card-action {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--accent-warm);
            cursor: pointer;
            border: none;
            background: none;
            transition: color 0.2s;
            padding: 0;
        }
        .ov-card-action:hover { color: var(--accent); }
        .ov-card-body { padding: 8px 0; }

        /* ── Policy Row ── */
        .ov-policy-row {
            display: flex;
            align-items: center;
            padding: 18px 28px;
            border-bottom: 1px solid var(--grey-900);
            gap: 16px;
            transition: background 0.2s;
            cursor: pointer;
        }
        .ov-policy-row:last-child { border-bottom: none; }
        .ov-policy-row:hover { background: var(--grey-900); }

        /* shimmer on hover (mirrors .service-row::before) */
        .ov-policy-row {
            position: relative;
            overflow: hidden;
        }
        .ov-policy-row::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(155,108,58,0.04), transparent);
            transform: translateX(-100%);
            transition: transform 0.5s ease;
        }
        .ov-policy-row:hover::before { transform: translateX(100%); }

        .ov-policy-icon {
            width: 38px;
            height: 38px;
            background: rgba(201,185,154,0.07);
            border: 1px solid rgba(201,185,154,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .ov-policy-main { flex: 1; min-width: 0; }
        .ov-policy-name {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.9rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            color: var(--grey-200);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 3px;
        }
        .ov-policy-meta {
            font-size: 0.72rem;
            font-weight: 300;
            color: var(--grey-600);
            letter-spacing: 0.02em;
        }
        .ov-policy-premium {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 1rem;
            font-weight: 700;
            color: var(--accent-warm);
            letter-spacing: 0.04em;
            text-align: right;
            flex-shrink: 0;
        }
        .ov-policy-expiry {
            font-size: 0.68rem;
            font-weight: 300;
            color: var(--grey-600);
            text-align: right;
            margin-top: 2px;
        }

        /* ── Activity Feed ── */
        .ov-activity-item {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            padding: 16px 28px;
            border-bottom: 1px solid var(--grey-900);
            transition: background 0.2s;
        }
        .ov-activity-item:last-child { border-bottom: none; }
        .ov-activity-item:hover { background: var(--grey-900); }
        .ov-activity-dot {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 1px;
        }
        .ov-activity-text {
            flex: 1;
            font-size: 0.8rem;
            font-weight: 400;
            color: var(--grey-400);
            line-height: 1.6;
        }
        .ov-activity-time {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.68rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            color: var(--grey-600);
            flex-shrink: 0;
            margin-top: 2px;
        }

        /* ── Quick Summary ── */
        .ov-summary-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 28px;
            border-bottom: 1px solid var(--grey-900);
        }
        .ov-summary-row:last-child { border-bottom: none; }
        .ov-summary-label {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--grey-600);
        }
        .ov-summary-val {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--grey-400);
            text-align: right;
        }

        /* ── Renewal Banner ── */
        .ov-renewal {
            margin-top: 24px;
            padding: 20px 24px;
            background: rgba(185,28,28,0.05);
            border: 1px solid rgba(185,28,28,0.2);
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .ov-renewal-icon {
            width: 36px;
            height: 36px;
            background: rgba(185,28,28,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .ov-renewal-main { flex: 1; }
        .ov-renewal-title {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #ef4444;
            margin-bottom: 3px;
        }
        .ov-renewal-sub {
            font-size: 0.78rem;
            font-weight: 300;
            color: var(--grey-400);
            line-height: 1.5;
        }
        .ov-renewal-btn {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #ef4444;
            background: none;
            border: 1px solid rgba(239,68,68,0.3);
            padding: 8px 16px;
            cursor: pointer;
            transition: all 0.25s;
            white-space: nowrap;
        }
        .ov-renewal-btn:hover {
            background: rgba(239,68,68,0.08);
            border-color: rgba(239,68,68,0.55);
        }

        /* ── Status Badge ── */
        .ov-status-badge {
            font-family: 'Barlow Condensed', sans-serif;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 2px 10px;
            border-width: 1px;
            border-style: solid;
        }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
            .ov-stats    { grid-template-columns: repeat(2, 1fr); }
            .ov-grid-2   { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
            .ov-root   { padding: 28px 20px 60px; }
            .ov-stats  { grid-template-columns: 1fr 1fr; }
        }
    `}</style>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────
type PolicyStatus = "active" | "pending" | "expired" | "due";

const STATUS_CONFIG: Record<PolicyStatus, { label: string; color: string; bg: string; border: string }> = {
    active: { label: "Active", color: "#22c55e", bg: "rgba(34,197,94,0.07)", border: "rgba(34,197,94,0.25)" },
    pending: { label: "Pending", color: "var(--accent-warm)", bg: "rgba(201,185,154,0.07)", border: "rgba(201,185,154,0.25)" },
    due: { label: "Due", color: "#f59e0b", bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.25)" },
    expired: { label: "Expired", color: "#ef4444", bg: "rgba(239,68,68,0.07)", border: "rgba(239,68,68,0.25)" },
};

// ─── Stagger helpers ──────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// Formatter helper
const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};

const StatusBadge = ({ status }: { status: PolicyStatus }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.expired;
    return (
        <span
            className="ov-status-badge"
            style={{
                color: config.color,
                background: config.bg,
                borderColor: config.border,
                borderRadius: "4px"
            }}
        >
            {config.label}
        </span>
    );
};

// ─── Overview Page ────────────────────────────────────────────────────────────
const OverviewPage = () => {
    useTheme();
    const [policiesData, setPoliciesData] = useState<any[]>([]);

    useEffect(() => {
        const fetchPolicies = async () => {
            const { data, error } = await supabase.from('policies').select('*').order('expiry_date', { ascending: true });
            if (data && !error) {
                setPoliciesData(data);
            }
        };
        fetchPolicies();
    }, []);

    const totalPolicies = policiesData.length;
    const activePolicies = policiesData.filter(p => p.status?.toLowerCase() === 'active').length;
    const duePolicies = policiesData.filter(p => p.status?.toLowerCase() === 'due' || p.status?.toLowerCase() === 'pending').length;

    const STATS = [
        {
            label: "Total Policies",
            value: totalPolicies.toString(),
            delta: "",
            icon: CheckCircle2,
            accent: "#22c55e",
            accentBg: "rgba(34,197,94,0.07)",
            accentBorder: "rgba(34,197,94,0.18)",
        },
        {
            label: "Active Policies",
            value: activePolicies.toString(),
            delta: "",
            icon: Clock,
            accent: "var(--accent-warm)",
            accentBg: "rgba(201,185,154,0.07)",
            accentBorder: "rgba(201,185,154,0.18)",
        },
        {
            label: "Renewals Due",
            value: duePolicies.toString(),
            delta: "",
            icon: FileText,
            accent: "#818cf8",
            accentBg: "rgba(129,140,248,0.07)",
            accentBorder: "rgba(129,140,248,0.18)",
        },
    ];

    const RECENT_POLICIES = policiesData.slice(0, 5).map(p => ({
        id: p.id,
        name: p.policy_name || "Unknown Policy",
        company: p.company_name || "Unknown Provider",
        type: "General",
        status: (p.status?.toLowerCase() || "expired") as PolicyStatus,
        premium: "N/A", // Not schema available
        expiry: formatDate(p.expiry_date),
        policy_number: p.policy_number || "N/A",
    }));

    const ACTIVITY = [
        { label: "Dashboard updated with latest policies", time: "Just now", type: "success" as const },
        { label: "Profile verification completed", time: "Recently", type: "info" as const },
    ];

    return (
        <>
            <OverviewStyles />

            <div className="ov-root">

                {/* ── Page Header ─────────────────────────────────────────── */}
                <motion.div className="ov-header" {...fadeUp(0)}>
                    <div className="ov-eyebrow">
                        <div className="ov-eyebrow-line" />
                        <span className="ov-eyebrow-text">Dashboard · Overview</span>
                    </div>
                    <h1 className="ov-title">YOUR PORTFOLIO</h1>
                    <p className="ov-subtitle">A complete snapshot of your insurance coverage and activity.</p>
                </motion.div>

                {/* ── Stats Grid ──────────────────────────────────────────── */}
                <motion.div className="ov-stats" {...fadeUp(0.08)}>
                    {STATS.map((stat) => (
                        <div className="ov-stat-card" key={stat.label}>
                            <div className="ov-stat-top">
                                <div
                                    className="ov-stat-icon"
                                    style={{
                                        background: stat.accentBg,
                                        border: `1px solid ${stat.accentBorder}`,
                                    }}
                                >
                                    <stat.icon size={16} style={{ color: stat.accent }} />
                                </div>
                                <div className="ov-stat-trend">
                                    <TrendingUp size={10} />
                                    {stat.delta}
                                </div>
                            </div>
                            <div
                                className="ov-stat-value"
                                style={{
                                    color: stat.accent === "var(--accent-warm)"
                                        ? "var(--white)"
                                        : stat.accent,
                                }}
                            >
                                {stat.value}
                            </div>
                            <div className="ov-stat-label">{stat.label}</div>
                            <div
                                className="ov-stat-bar"
                                style={{
                                    background: `linear-gradient(90deg, ${stat.accent}50, transparent)`,
                                }}
                            />
                        </div>
                    ))}
                </motion.div>

                {/* ── Main Grid ───────────────────────────────────────────── */}
                <div className="ov-grid-1">

                    {/* Left — Recent Policies */}
                    <motion.div {...fadeUp(0.14)}>
                        <div className="ov-card">
                            <div className="ov-card-header">
                                <span className="ov-card-title">Recent Policies</span>
                                <button className="ov-card-action">
                                    View All <ArrowRight size={11} />
                                </button>
                            </div>
                            <div className="ov-card-body">
                                {RECENT_POLICIES.map((policy) => (
                                    <div className="ov-policy-row" key={policy.id}>
                                        <div className="ov-policy-icon">
                                            <Shield size={15} style={{ color: "var(--accent-warm)" }} />
                                        </div>
                                        <div className="ov-policy-main">
                                            <div className="ov-policy-name">{policy.name}</div>
                                            <div className="ov-policy-meta">
                                                {policy.policy_number} · {policy.company}
                                            </div>
                                        </div>
                                        <div style={{ marginRight: 16 }}>
                                            <StatusBadge status={policy.status} />
                                        </div>
                                        <div>
                                            <div className="ov-policy-premium">{policy.premium}</div>
                                            <div className="ov-policy-expiry">Exp. {policy.expiry}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Renewal Alert */}
                        <motion.div className="ov-renewal" {...fadeUp(0.22)}>
                            <div className="ov-renewal-icon">
                                <AlertTriangle size={16} color="#ef4444" />
                            </div>
                            <div className="ov-renewal-main">
                                <div className="ov-renewal-title">Renewal Due Soon</div>
                                <div className="ov-renewal-sub">
                                    Health Shield Plus expires in{" "}
                                    <strong style={{ color: "#ef4444" }}>18 days</strong>.
                                    Act now to avoid a lapse in coverage.
                                </div>
                            </div>
                            <button className="ov-renewal-btn">Renew →</button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                    </div>
                </div>

            </div>
        </>
    );
};

export default OverviewPage;