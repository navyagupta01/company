import { Moon, Sun } from "lucide-react";
import { useTheme } from "../components/layout/themeContext";

// Standalone toggle — matches the HomePage design language.
// Can be dropped anywhere outside the Sidebar if needed.
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <>
            <style>{`
                .tt-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 14px;
                    background: transparent;
                    border: 1px solid var(--grey-700, #252525);
                    cursor: pointer;
                    transition: all 0.25s ease;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: var(--grey-400, #888);
                    position: relative;
                    overflow: hidden;
                    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
                }
                .tt-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(201,185,154,0.06), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.45s ease;
                }
                .tt-btn:hover::before { transform: translateX(100%); }
                .tt-btn:hover {
                    border-color: var(--accent-warm, #c9b99a);
                    color: var(--accent-warm, #c9b99a);
                }
                .tt-pip {
                    width: 26px;
                    height: 14px;
                    border: 1px solid var(--grey-700, #252525);
                    border-radius: 999px;
                    position: relative;
                    transition: border-color 0.25s;
                    flex-shrink: 0;
                }
                .tt-btn:hover .tt-pip { border-color: var(--accent-warm, #c9b99a); }
                .tt-pip::after {
                    content: '';
                    position: absolute;
                    top: 2px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--accent-warm, #c9b99a);
                    transition: transform 0.3s ease;
                }
                .tt-pip-dark::after  { transform: translateX(2px); }
                .tt-pip-light::after { transform: translateX(14px); }
            `}</style>

            <button className="tt-btn" onClick={toggleTheme} aria-label="Toggle theme">
                {isDark
                    ? <Sun  size={13} style={{ color: "var(--accent-warm, #c9b99a)" }} />
                    : <Moon size={13} style={{ color: "var(--accent-warm, #9b6c3a)" }} />
                }
                <span>{isDark ? "Light" : "Dark"}</span>
                <span className={`tt-pip ${isDark ? "tt-pip-dark" : "tt-pip-light"}`} />
            </button>
        </>
    );
};

export default ThemeToggle;