import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useSidebar } from "../../contexts/SidebarContext";
import { Sun, Moon, LogOut, Settings } from "lucide-react";

// ─── Breadcrumb helper ────────────────────────────────────────────────────────
const PAGE_LABELS: Record<string, string> = {
    "/dashboard":          "Overview",
    "/dashboard/overview": "Overview",
    "/dashboard/policies": "My Policies",
    "/dashboard/profile":  "Profile",
    "/dashboard/settings": "Settings",
};

// ─── DashboardNavbar ──────────────────────────────────────────────────────────
const DashboardNavbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { sidebarWidth } = useSidebar();
    const navigate   = useNavigate();
    const { pathname } = useLocation();

    const pageLabel = PAGE_LABELS[pathname] ?? "Dashboard";
    const initials  = user?.name?.slice(0, 2).toUpperCase() ?? "NG";

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400;500;600&display=swap');

                /* ── Light ── */
                :root,
                [data-theme="light"] {
                    --nb-bg:        #f0ebe3;
                    --nb-border:    #d4c9b8;
                    --nb-text:      #2e1f14;
                    --nb-muted:     #7a6a5a;
                    --nb-warm:      #9b6c3a;
                    --nb-warm-bg:   rgba(155,108,58,0.08);
                    --nb-warm-bdr:  rgba(155,108,58,0.22);
                    --nb-btn-bg:    #e5ddd0;
                    --nb-btn-bdr:   #d4c9b8;
                    --nb-btn-hover: #ddd5c6;
                    --nb-danger:    #b91c1c;
                    --nb-danger-bg: rgba(185,28,28,0.06);
                    --nb-danger-bdr:rgba(185,28,28,0.2);
                }

                /* ── Dark ── */
                [data-theme="dark"] {
                    --nb-bg:        #0a0a0a;
                    --nb-border:    #1e1e1e;
                    --nb-text:      #c8c8c8;
                    --nb-muted:     #555555;
                    --nb-warm:      #c9b99a;
                    --nb-warm-bg:   rgba(201,185,154,0.08);
                    --nb-warm-bdr:  rgba(201,185,154,0.22);
                    --nb-btn-bg:    #111111;
                    --nb-btn-bdr:   #1e1e1e;
                    --nb-btn-hover: #181818;
                    --nb-danger:    #ef4444;
                    --nb-danger-bg: rgba(239,68,68,0.06);
                    --nb-danger-bdr:rgba(239,68,68,0.2);
                }

                /* ── Bar ── */
                .nb-bar {
                    position: fixed;
                    top: 0;
                    right: 0;
                    height: 56px;
                    background: var(--nb-bg);
                    border-bottom: 1px solid var(--nb-border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 32px;
                    z-index: 30;
                    transition: left 0.3s cubic-bezier(0.4,0,0.2,1),
                                background 0.35s ease,
                                border-color 0.35s ease;
                }

                /* ── Breadcrumb ── */
                .nb-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .nb-crumb-root {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: var(--nb-muted);
                }
                .nb-crumb-sep {
                    color: var(--nb-btn-bdr);
                    font-size: 0.75rem;
                }
                .nb-crumb-page {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: var(--nb-warm);
                }

                /* ── Right cluster ── */
                .nb-right {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                /* ── Shared icon-button ── */
                .nb-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 7px 14px;
                    background: var(--nb-btn-bg);
                    border: 1px solid var(--nb-btn-bdr);
                    color: var(--nb-muted);
                    cursor: pointer;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    transition: all 0.22s ease;
                    white-space: nowrap;
                    position: relative;
                    overflow: hidden;
                }
                .nb-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(201,185,154,0.06), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.45s ease;
                    pointer-events: none;
                }
                .nb-btn:hover::before { transform: translateX(100%); }
                .nb-btn:hover {
                    background: var(--nb-btn-hover);
                    border-color: var(--nb-warm-bdr);
                    color: var(--nb-warm);
                }

                /* ── Toggle pill inside button ── */
                .nb-pip {
                    width: 26px;
                    height: 14px;
                    border: 1px solid var(--nb-btn-bdr);
                    border-radius: 999px;
                    position: relative;
                    flex-shrink: 0;
                    transition: border-color 0.25s;
                }
                .nb-pip::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--nb-warm);
                    transition: transform 0.3s ease;
                }
                [data-theme="dark"]  .nb-pip::after { transform: translateX(0px);  }
                [data-theme="light"] .nb-pip::after { transform: translateX(10px); }

                /* ── Profile chip ── */
                .nb-profile {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 14px 6px 8px;
                    background: var(--nb-warm-bg);
                    border: 1px solid var(--nb-warm-bdr);
                    cursor: pointer;
                    transition: all 0.22s ease;
                }
                .nb-profile:hover { border-color: var(--nb-warm); }
                .nb-avatar {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: var(--nb-warm-bdr);
                    border: 1px solid var(--nb-warm);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: var(--nb-warm);
                    flex-shrink: 0;
                }
                .nb-user-name {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.78rem;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--nb-text);
                    max-width: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                /* ── Logout danger tint ── */
                .nb-btn-danger:hover {
                    background: var(--nb-danger-bg) !important;
                    border-color: var(--nb-danger-bdr) !important;
                    color: var(--nb-danger) !important;
                }

                /* ── Divider ── */
                .nb-sep {
                    width: 1px;
                    height: 20px;
                    background: var(--nb-btn-bdr);
                    margin: 0 4px;
                }
            `}</style>

            <header className="nb-bar" style={{ left: sidebarWidth }}>
                {/* Breadcrumb */}
                <div className="nb-breadcrumb">
                    <span className="nb-crumb-root">Dashboard</span>
                    <span className="nb-crumb-sep">·</span>
                    <span className="nb-crumb-page">{pageLabel}</span>
                </div>

                {/* Right actions */}
                <div className="nb-right">

                    {/* Theme toggle */}
                    <button className="nb-btn" onClick={toggleTheme} title="Toggle theme">
                        {theme === "dark"
                            ? <Sun  size={13} />
                            : <Moon size={13} />
                        }
                        <span>{theme === "dark" ? "Light" : "Dark"}</span>
                        <span className="nb-pip" />
                    </button>

                    <div className="nb-sep" />

                    {/* Profile chip */}
                    <div
                        className="nb-profile"
                        onClick={() => navigate("/dashboard/profile")}
                        title="Profile settings"
                    >
                        <div className="nb-avatar">{initials}</div>
                        <span className="nb-user-name">{user?.name ?? "Account"}</span>
                        <Settings size={12} style={{ color: "var(--nb-muted)", marginLeft: 2 }} />
                    </div>

                    <div className="nb-sep" />

                    {/* Logout */}
                    <button
                        className="nb-btn nb-btn-danger"
                        onClick={handleLogout}
                        title="Log out"
                    >
                        <LogOut size={13} />
                        <span>Log Out</span>
                    </button>

                </div>
            </header>
        </>
    );
};

export default DashboardNavbar;
