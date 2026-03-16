import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { useTheme } from "./themeContext";

const Footer = () => {
    const { theme } = useTheme();
    const company = ["About Us", "Our Team", "Careers", "Contact"];
    const services = ["Life Insurance", "Health Insurance", "Retirement Planning", "Mutual Funds", "Motor Insurance", "Term Insurance"];

    const isDark = theme === 'dark';

    // Color tokens based on theme
    const c = {
        bg: isDark ? '#080808' : '#f0ebe3',
        border: isDark ? '#1a1a1a' : '#ddd4c4',
        watermark: isDark ? '#111111' : '#e5ddd0',
        link: isDark ? '#666' : '#7a6a58',
        linkHover: isDark ? '#f0f0f0' : '#1a0f08',
        heading: '#b91c1c',
        rule: isDark ? '#1a1a1a' : '#ddd4c4',
        contact: isDark ? '#555' : '#7a6a58',
        copyright: isDark ? '#333' : '#a09080',
        socialBg: isDark ? 'transparent' : 'transparent',
        socialBorder: isDark ? '#252525' : '#d4c9b8',
        socialColor: isDark ? '#555' : '#8a7a68',
        desc: isDark ? '#555' : '#7a6a58',
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400&display=swap');

                .footer-root {
                    position: relative;
                    overflow: hidden;
                    transition: background 0.4s ease, border-color 0.4s ease;
                    font-family: 'Barlow', sans-serif;
                }

                .footer-root::before {
                    content: 'NG';
                    position: absolute;
                    bottom: -2rem;
                    right: -1rem;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(8rem, 18vw, 18rem);
                    line-height: 1;
                    pointer-events: none;
                    user-select: none;
                    letter-spacing: 0.05em;
                    transition: color 0.4s ease;
                }

                .footer-link {
                    font-family: 'Barlow', sans-serif;
                    font-size: 0.875rem;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    transition: color 0.25s ease, padding-left 0.25s ease;
                    font-weight: 300;
                    padding: 3px 0;
                }
                .footer-link .arrow-icon {
                    opacity: 0;
                    transition: opacity 0.25s;
                }
                .footer-link:hover .arrow-icon { opacity: 1; }
                .footer-link:hover { padding-left: 6px; }

                .footer-heading {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.7rem;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    color: #b91c1c;
                    margin-bottom: 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .social-icon {
                    width: 36px;
                    height: 36px;
                    border: 1px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
                }
                .social-icon:hover {
                    background: #b91c1c !important;
                    border-color: #b91c1c !important;
                    color: #fff !important;
                }

                .footer-bottom-link {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 0.7rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .footer-bottom-link:hover { color: #b91c1c !important; }
            `}</style>

            <footer
                className="footer-root"
                style={{
                    background: c.bg,
                    borderTop: `1px solid ${c.border}`,
                }}
            >
                {/* Watermark "NG" */}
                <div style={{
                    position: 'absolute',
                    bottom: '-2rem',
                    right: '-1rem',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(8rem, 18vw, 18rem)',
                    color: c.watermark,
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    letterSpacing: '0.05em',
                    transition: 'color 0.4s ease',
                }}>NG</div>

                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem 0', position: 'relative', zIndex: 1 }}>

                    {/* Brand block */}
                    <div style={{ borderBottom: `1px solid ${c.border}`, paddingBottom: '3rem', marginBottom: '3rem' }}>
                        <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
                            <img
                                src="/Company_Logo.png"
                                alt="NG Consultant"
                                style={{
                                    height: '100px',
                                    objectFit: 'contain',
                                    display: 'block',
                                    transition: 'filter 0.4s ease',
                                }}
                            />
                        </Link>
                        <p style={{ color: c.desc, fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '460px', marginTop: '0.75rem', transition: 'color 0.4s ease' }}>
                            Secure your future with smart investment planning and comprehensive insurance coverage.
                            Your trusted partner in financial safety and wealth creation.
                        </p>
                    </div>

                    {/* Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

                        {/* Company */}
                        <div>
                            <div className="footer-heading" style={{ color: '#b91c1c' }}>
                                Company
                                <span style={{ flex: 1, height: 1, background: c.border, display: 'inline-block' }} />
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {company.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="footer-link" style={{ color: c.link }}>
                                            {item}
                                            <ArrowUpRight size={11} className="arrow-icon" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <div className="footer-heading" style={{ color: '#b91c1c' }}>
                                Services
                                <span style={{ flex: 1, height: 1, background: c.border, display: 'inline-block' }} />
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {services.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="footer-link" style={{ color: c.link }}>
                                            {item}
                                            <ArrowUpRight size={11} className="arrow-icon" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <div className="footer-heading" style={{ color: '#b91c1c' }}>
                                Contact
                                <span style={{ flex: 1, height: 1, background: c.border, display: 'inline-block' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    'KESHAV PURAM',
                                    'DELHI, 110035',
                                    '+91 9891029308, +91 9891609550',
                                    'ngconsultant0749@gmail.com',
                                ].map((line, i) => (
                                    <span key={i} style={{ color: c.contact, fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.5, transition: 'color 0.4s ease' }}>{line}</span>
                                ))}
                            </div>

                            {/* Socials */}
                            <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
                                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                                    <a
                                        key={idx}
                                        href="#"
                                        className="social-icon"
                                        style={{
                                            background: c.socialBg,
                                            borderColor: c.socialBorder,
                                            color: c.socialColor,
                                        }}
                                    >
                                        <Icon size={14} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <hr style={{ border: 'none', borderTop: `1px solid ${c.rule}`, margin: 0 }} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1.5rem 0' }}>
                        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: c.copyright, transition: 'color 0.4s ease' }}>
                            © {new Date().getFullYear()} NG CONSULTANT. ALL RIGHTS RESERVED.
                        </span>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            {['Privacy Policy', 'Terms of Service', 'IRDAI Disclosure'].map(link => (
                                <a key={link} href="#" className="footer-bottom-link" style={{ color: c.copyright }}>
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;