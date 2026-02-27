import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "./themeContext";

interface LayoutProps {
    children: ReactNode;
}

const LayoutInner = ({ children }: LayoutProps) => {
    const { theme } = useTheme();

    return (
        <div
            data-theme={theme}
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: theme === 'dark' ? '#080808' : '#f8f5f0',
                overflowX: 'hidden',
                position: 'relative',
                transition: 'background 0.4s ease',
            }}
        >
            {/* Subtle vignette — adapts to theme */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    background: theme === 'dark'
                        ? 'radial-gradient(ellipse 100% 40% at 50% 0%, rgba(185,28,28,0.04) 0%, transparent 70%), radial-gradient(ellipse 80% 30% at 50% 100%, rgba(185,28,28,0.03) 0%, transparent 70%)'
                        : 'radial-gradient(ellipse 100% 40% at 50% 0%, rgba(185,28,28,0.05) 0%, transparent 70%), radial-gradient(ellipse 80% 30% at 50% 100%, rgba(155,108,58,0.04) 0%, transparent 70%)',
                    transition: 'background 0.4s ease',
                }}
            />

            <Navbar />

            <main style={{ flexGrow: 1, paddingTop: '72px', position: 'relative', zIndex: 1 }}>
                {children}
            </main>

            <Footer />
        </div>
    );
};

const Layout = ({ children }: LayoutProps) => (
    <ThemeProvider>
        <LayoutInner>{children}</LayoutInner>
    </ThemeProvider>
);

export default Layout;