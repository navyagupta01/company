import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
    Shield,
    LayoutDashboard,
    FileText,
    User,
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen,
    LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "../../contexts/SidebarContext";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
    label: string;
    icon: React.ElementType;
    to: string;
}

// ─── Nav Config ───────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
    { label: "Overview", icon: LayoutDashboard, to: "/dashboard" },
    { label: "My Policies", icon: FileText, to: "/dashboard/policies" },
    { label: "Profile", icon: User, to: "/dashboard/profile" },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = () => {
    const { collapsed, toggle, sidebarWidth } = useSidebar();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600;700&display=swap');

                /* ── Light (default) ── */
                :root,
                [data-theme="light"] {
                    --sb-bg:          #f0ebe3;
                    --sb-border:      #d4c9b8;
                    --sb-border-soft: #ddd5c6;
                    --sb-surface:     #e8e0d4;
                    --sb-text:        #2e1f14;
                    --sb-muted:       #7a6a5a;
                    --sb-faint:       #a09080;
                    --sb-label:       #a09080;
                    --sb-warm:        #9b6c3a;
                    --sb-warm-bg:     rgba(155,108,58,0.08);
                    --sb-warm-border: rgba(155,108,58,0.2);
                    --sb-warm-avatar: rgba(155,108,58,0.1);
                    --sb-warm-av-bdr: rgba(155,108,58,0.25);
                    --sb-link-hover-bg:  #e5ddd0;
                    --sb-link-active-bg: rgba(155,108,58,0.07);
                    --sb-link-active-bd: rgba(155,108,58,0.18);
                    --sb-link-inactive:  #8a7a6a;
                    --sb-footer-color:#a09080;
                }

                /* ── Dark ── */
                [data-theme="dark"] {
                    --sb-bg:          #0a0a0a;
                    --sb-border:      #1e1e1e;
                    --sb-border-soft: #1a1a1a;
                    --sb-surface:     #111111;
                    --sb-text:        #c8c8c8;
                    --sb-muted:       #555555;
                    --sb-faint:       #2a2a2a;
                    --sb-label:       #333333;
                    --sb-warm:        #c9b99a;
                    --sb-warm-bg:     rgba(201,185,154,0.08);
                    --sb-warm-border: rgba(201,185,154,0.2);
                    --sb-warm-avatar: rgba(201,185,154,0.13);
                    --sb-warm-av-bdr: rgba(201,185,154,0.25);
                    --sb-link-hover-bg:  #111111;
                    --sb-link-active-bg: rgba(201,185,154,0.05);
                    --sb-link-active-bd: rgba(201,185,154,0.15);
                    --sb-link-inactive:  #555555;
                    --sb-footer-color:#2a2a2a;
                }

                /* ── Root ── */
                .sb-root {
                    position: fixed;
                    top: 0; left: 0;
                    height: 100vh;
                    background: var(--sb-bg);
                    border-right: 1px solid var(--sb-border);
                    display: flex;
                    flex-direction: column;
                    z-index: 40;
                    overflow: visible;
                    transition: width 0.3s cubic-bezier(0.4,0,0.2,1),
                                background 0.35s ease,
                                border-color 0.35s ease;
                }

                /* Grain */
                .sb-root::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
                    opacity: 0.03;
                    pointer-events: none;
                    z-index: 0;
                }

                .sb-inner {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    overflow: visible;
                }

                /* ── Brand ── */
                .sb-brand {
                    padding: 0 16px;
                    height: 56px;
                    border-bottom: 1px solid var(--sb-border-soft);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-shrink: 0;
                }
                .sb-brand-icon {
                    width: 32px; height: 32px;
                    background: var(--sb-warm-bg);
                    border: 1px solid var(--sb-warm-border);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .sb-brand-name {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700;
                    font-size: 0.95rem;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--sb-text);
                    line-height: 1;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .sb-brand-name span { color: var(--sb-warm); }

                /* ── Nav ── */
                .sb-nav {
                    flex: 1;
                    padding: 12px 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    overflow-y: auto;
                    overflow-x: hidden;
                }
                .sb-nav-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.6rem;
                    font-weight: 700;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                    color: var(--sb-label);
                    padding: 10px 8px 6px;
                    white-space: nowrap;
                    overflow: hidden;
                }

                /* ── Nav link ── */
                .sb-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px;
                    border: 1px solid transparent;
                    color: var(--sb-link-inactive);
                    text-decoration: none;
                    transition: all 0.2s ease;
                    position: relative;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    overflow: hidden;
                    white-space: nowrap;
                    border-radius: 2px;
                }
                .sb-link-icon {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 18px;
                }
                .sb-link::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(201,185,154,0.04), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.45s ease;
                    pointer-events: none;
                }
                .sb-link:hover::before { transform: translateX(100%); }
                .sb-link:hover {
                    color: var(--sb-text);
                    background: var(--sb-link-hover-bg);
                    border-color: var(--sb-border);
                }
                .sb-link.active {
                    color: var(--sb-warm);
                    background: var(--sb-link-active-bg);
                    border-color: var(--sb-link-active-bd);
                }
                .sb-link.active::after {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 2px;
                    background: var(--sb-warm);
                }
                .sb-link-arrow {
                    margin-left: auto;
                    opacity: 0;
                    transition: opacity 0.2s, transform 0.2s;
                    flex-shrink: 0;
                }
                .sb-link:hover .sb-link-arrow  { opacity: 1; transform: translateX(2px); }
                .sb-link.active .sb-link-arrow { opacity: 1; }

                /* ── Tooltip for collapsed mode ── */
                .sb-link-tip {
                    position: absolute;
                    left: calc(100% + 12px);
                    top: 50%;
                    transform: translateY(-50%);
                    background: var(--sb-surface);
                    border: 1px solid var(--sb-border);
                    padding: 5px 12px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--sb-text);
                    white-space: nowrap;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.15s ease;
                    z-index: 100;
                    box-shadow: 4px 4px 12px rgba(0,0,0,0.15);
                }
                .sb-link-tip::before {
                    content: '';
                    position: absolute;
                    left: -5px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 8px;
                    height: 8px;
                    background: var(--sb-surface);
                    border-left: 1px solid var(--sb-border);
                    border-bottom: 1px solid var(--sb-border);
                    transform: translateY(-50%) rotate(45deg);
                }
                .sb-link:hover .sb-link-tip { opacity: 1; }

                /* ── Divider ── */
                .sb-divider {
                    height: 1px;
                    background: var(--sb-border-soft);
                    margin: 8px 8px;
                    flex-shrink: 0;
                }

                /* ── Logout ── */
                .sb-logout {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px;
                    margin: 0 8px 8px;
                    border: 1px solid transparent;
                    background: transparent;
                    color: var(--sb-muted);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    position: relative;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    overflow: hidden;
                    white-space: nowrap;
                    border-radius: 2px;
                }
                .sb-logout-icon {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 18px;
                }
                .sb-logout:hover {
                    color: #ef4444;
                    background: rgba(239,68,68,0.05);
                    border-color: rgba(239,68,68,0.25);
                }
                .sb-logout:hover .sb-link-tip { opacity: 1; }

                /* ── Notification badge ── */
                .sb-notif {
                    margin: 0 8px 8px;
                    padding: 10px;
                    background: rgba(185,28,28,0.05);
                    border: 1px solid rgba(185,28,28,0.18);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                    overflow: hidden;
                    flex-shrink: 0;
                    white-space: nowrap;
                    border-radius: 2px;
                }
                .sb-notif:hover {
                    background: rgba(185,28,28,0.1);
                    border-color: rgba(185,28,28,0.38);
                }
                .sb-notif-text {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.78rem;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--sb-text);
                    overflow: hidden;
                }
                .sb-notif-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #b91c1c;
                    flex-shrink: 0;
                }
                .sb-notif-badge {
                    margin-left: auto;
                    background: #b91c1c;
                    color: #fff;
                    font-family: 'Barlow', sans-serif;
                    font-size: 0.65rem;
                    font-weight: 700;
                    padding: 1px 7px;
                    border-radius: 999px;
                    flex-shrink: 0;
                }

                /* ── Brand collapse toggle (small floating button) ── */
                .sb-brand-toggle {
                    position: absolute;
                    top: 15px;      /* Centers with the 56px tall sb-brand */
                    right: -13px;   /* Sits exactly on the border line */
                    width: 26px;
                    height: 26px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--sb-bg);
                    border: 1px solid var(--sb-border);
                    color: var(--sb-muted);
                    cursor: pointer;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                    padding: 0;
                    z-index: 50;
                }
                .sb-brand-toggle:hover {
                    color: var(--sb-warm);
                    border-color: var(--sb-warm-border);
                    transform: scale(1.05);
                }

                /* ── Footer ── */
                .sb-footer {
                    padding: 10px 16px;
                    border-top: 1px solid var(--sb-border-soft);
                    font-family: 'Barlow', sans-serif;
                    font-size: 0.6rem;
                    color: var(--sb-footer-color);
                    font-weight: 400;
                    letter-spacing: 0.05em;
                    white-space: nowrap;
                    overflow: hidden;
                    flex-shrink: 0;
                }
            `}</style>

            <motion.aside
                className="sb-root"
                style={{ width: sidebarWidth }}
                initial={{ x: -260, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="sb-inner">

                    {/* Brand */}
                    <div className="sb-brand">
                        <div className="sb-brand-icon">
                            <Shield size={16} style={{ color: "var(--sb-warm)" }} />
                        </div>
                        <AnimatePresence initial={false}>
                            {!collapsed && (
                                <motion.div
                                    className="sb-brand-name"
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    NG <span>CONSULTANT</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Small collapse toggle — floats on the right border */}
                    <button
                        className="sb-brand-toggle"
                        onClick={toggle}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed
                            ? <PanelLeftOpen size={13} />
                            : <PanelLeftClose size={13} />
                        }
                    </button>

                    {/* Navigation */}
                    <nav className="sb-nav">
                        <AnimatePresence initial={false}>
                            {!collapsed && (
                                <motion.div
                                    className="sb-nav-label"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                >
                                    Menu
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/dashboard"}
                                className={({ isActive }) =>
                                    `sb-link${isActive ? " active" : ""}`
                                }
                                style={{ justifyContent: collapsed ? "center" : undefined }}
                            >
                                <span className="sb-link-icon">
                                    <item.icon size={15} />
                                </span>
                                <AnimatePresence initial={false}>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                <AnimatePresence initial={false}>
                                    {!collapsed && (
                                        <motion.span
                                            className="sb-link-arrow"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <ChevronRight size={12} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {/* Tooltip — only visible when collapsed */}
                                {collapsed && (
                                    <span className="sb-link-tip">{item.label}</span>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="sb-divider" />

                    {/* Logout */}
                    <button className="sb-logout" onClick={handleLogout} style={{ justifyContent: collapsed ? "center" : undefined }}>
                        <span className="sb-logout-icon">
                            <LogOut size={15} />
                        </span>
                        <AnimatePresence initial={false}>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: "hidden" }}
                                >
                                    Log Out
                                </motion.span>
                            )}
                        </AnimatePresence>
                        {/* Tooltip — only visible when collapsed */}
                        {collapsed && (
                            <span className="sb-link-tip">Log Out</span>
                        )}
                    </button>

                    {/* Footer */}
                    <AnimatePresence initial={false}>
                        {!collapsed && (
                            <motion.div
                                className="sb-footer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.18 }}
                            >
                                © 2025 NG CONSULTANT · All rights reserved
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;