import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Mail, Phone, MapPin, Shield, Edit3, Camera,
    ShieldCheck, Lock, Eye, EyeOff, Check, Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTheme } from "../../components/layout/themeContext";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabaseClient";

// ─── Global Styles (same as HomePage) ────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300;1,400&family=Barlow+Condensed:wght@700;900&display=swap');

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

        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
            opacity: 0.025;
            pointer-events: none;
            z-index: 9999;
        }

        .section-rule {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--grey-700), transparent);
        }

        .profile-tab {
            position: relative;
            cursor: pointer;
            padding: 0.75rem 1.5rem;
            transition: color 0.3s ease;
            border-bottom: 2px solid transparent;
            font-family: 'Barlow Condensed', sans-serif;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            font-size: 0.85rem;
        }
        .profile-tab.active {
            color: var(--accent-warm);
            border-bottom-color: var(--accent-warm);
        }
        .profile-tab:not(.active) {
            color: var(--grey-400);
        }
        .profile-tab:not(.active):hover {
            color: var(--grey-200);
        }

        .policy-card {
            border: 1px solid var(--grey-700);
            background: var(--form-bg);
            transition: border-color 0.3s ease;
        }
        .policy-card:hover {
            border-color: var(--accent-warm);
        }

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

        input, textarea, select {
            background: var(--input-bg) !important;
            border-color: var(--grey-700) !important;
            color: var(--white) !important;
            border-radius: 2px !important;
            font-family: 'Barlow', sans-serif !important;
            transition: background 0.4s ease, color 0.4s ease, border-color 0.3s ease;
        }
        input::placeholder, textarea::placeholder { color: var(--grey-600) !important; }
        input:focus, textarea:focus, select:focus {
            border-color: var(--accent-warm) !important;
            outline: none !important;
            box-shadow: none !important;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--black); }
        ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 2px; }

        *, *::before, *::after {
            transition-property: background-color, border-color, color;
            transition-duration: 0.35s;
            transition-timing-function: ease;
        }
        .service-row { transition-property: all; }

        .avatar-ring {
            position: relative;
            display: inline-block;
        }
        .avatar-ring::after {
            content: '';
            position: absolute;
            inset: -4px;
            border: 1px solid var(--accent-warm);
            pointer-events: none;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 3px 10px;
            border: 1px solid;
            font-family: 'Barlow Condensed', sans-serif;
            letter-spacing: 0.2em;
            font-size: 0.7rem;
            text-transform: uppercase;
        }
        .status-active {
            border-color: rgba(74, 222, 128, 0.4);
            background: rgba(74, 222, 128, 0.05);
            color: #4ade80;
        }
        .status-pending {
            border-color: rgba(201,185,154, 0.4);
            background: rgba(201,185,154, 0.05);
            color: var(--accent-warm);
        }
        .status-expired {
            border-color: rgba(248, 113, 113, 0.4);
            background: rgba(248, 113, 113, 0.05);
            color: #f87171;
        }

        .glitch-hover:hover { animation: glitch 0.3s ease; }
        @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 1px); }
            40% { transform: translate(2px, -1px); }
            60% { transform: translate(-1px, 2px); }
            80% { transform: translate(1px, -2px); }
        }
    `}</style>
);

// ─── Profile Header ───────────────────────────────────────────────────────────
const ProfileHeader = ({ user }: { user: UserData }) => {
    const { theme } = useTheme();

    return (
        <section className="relative pt-24 pb-0 overflow-hidden" style={{ background: 'var(--black)' }}>
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <span className="display-font select-none" style={{ fontSize: 'clamp(6rem, 18vw, 20rem)', color: 'var(--stat-watermark)', lineHeight: 1, whiteSpace: 'nowrap', opacity: 0.5 }}>
                    PROFILE
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-start md:items-end gap-10 pb-12"
                    style={{ borderBottom: '1px solid var(--grey-700)' }}
                >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <div className="avatar-ring">
                            <div
                                className="w-28 h-28 flex items-center justify-center display-font"
                                style={{
                                    background: 'var(--grey-800)',
                                    fontSize: '3.5rem',
                                    color: 'var(--accent-warm)',
                                    border: '1px solid var(--grey-700)',
                                }}
                            >
                                {user.name.charAt(0)}
                            </div>
                        </div>
                        <button
                            className="absolute -bottom-2 -right-2 p-2 transition-colors duration-200"
                            style={{ background: 'var(--accent-warm)', border: 'none', cursor: 'pointer', color: theme === 'dark' ? 'var(--black)' : '#f8f5f0' }}
                        >
                            <Camera size={14} />
                        </button>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3 flex-wrap">
                            <div className="flex items-center gap-3">
                                <div style={{ width: 30, height: 1, background: 'var(--accent-warm)' }} />
                                <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>My Profile</span>
                            </div>
                            <span className="status-badge status-active">
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                                Verified Client
                            </span>
                        </div>

                        <h1 className="display-font mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 0.95, color: 'var(--white)' }}>
                            {user.name.toUpperCase()}
                        </h1>

                        <p className="condensed-font tracking-widest text-sm uppercase mb-4" style={{ color: 'var(--grey-400)' }}>
                            {user.occupation} — Client since {user.memberSince}
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'var(--grey-400)', fontWeight: 300 }}>
                            <span className="flex items-center gap-2">
                                <Mail size={13} style={{ color: 'var(--accent-warm)' }} />
                                {user.email}
                            </span>
                            <span className="flex items-center gap-2">
                                <Phone size={13} style={{ color: 'var(--accent-warm)' }} />
                                {user.phone}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin size={13} style={{ color: 'var(--accent-warm)' }} />
                                {user.city}
                            </span>
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div
                        className="flex gap-0 flex-shrink-0"
                        style={{ border: '1px solid var(--grey-700)' }}
                    >
                        {[
                            { label: 'Policies', value: user.totalPolicies },
                            { label: 'Claims', value: user.totalClaims },
                            { label: 'Years', value: user.yearsWithUs },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="px-8 py-5 text-center"
                                style={{ borderRight: i < 2 ? '1px solid var(--grey-700)' : 'none' }}
                            >
                                <div className="display-font" style={{ fontSize: '2rem', color: 'var(--accent-warm)' }}>{s.value}</div>
                                <div className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-400)' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// ─── Tab Navigation ───────────────────────────────────────────────────────────
const TabNav = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) => {
    const tabs = ['Edit Profile', 'Password'];

    return (
        <div style={{ background: 'var(--black)', borderBottom: '1px solid var(--grey-700)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Edit Profile Tab ─────────────────────────────────────────────────────────
const EditProfileTab = ({ user, setUser }: { user: UserData; setUser: (u: UserData) => void }) => {
    const { user: authUser } = useAuth();
    const [form, setForm] = useState({ ...user });
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setForm({ ...user });
    }, [user]);

    const handleSave = async () => {
        if (!authUser?.id) return;
        setSaving(true);
        try {
            const updates = {
                user_id: authUser.id,
                full_name: form.name,
                phone: form.phone,
                occupation: form.occupation,
                city: form.city,
                address: form.address,
                pincode: form.pincode,
                annual_income: form.annualIncome,
                pan: form.pan,
                updated_at: new Date().toISOString(),
            };
            const { error } = await supabase.from('user_profiles').upsert(updates);
            if (error) throw error;
            
            setUser({ ...form });
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const Field = ({ label, name, type = 'text', placeholder }: { label: string; name: keyof UserData; type?: string; placeholder?: string }) => (
        <div className="space-y-2">
            <label className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-400)' }}>{label}</label>
            <Input
                type={type}
                value={form[name] as string}
                onChange={e => setForm({ ...form, [name]: e.target.value })}
                placeholder={placeholder}
                className="rounded-none h-12 text-sm"
            />
        </div>
    );

    return (
        <div className="py-12 max-w-3xl">
            <div className="flex items-center gap-4 mb-10">
                <div style={{ width: 30, height: 1, background: 'var(--accent-warm)' }} />
                <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>Personal Information</span>
            </div>

            <div className="p-10 space-y-8" style={{ background: 'var(--form-bg)', border: '1px solid var(--grey-700)' }}>

                {/* Section: Basic */}
                <div>
                    <h3 className="condensed-font text-lg tracking-widest uppercase mb-6" style={{ color: 'var(--white)', borderBottom: '1px solid var(--grey-700)', paddingBottom: '1rem' }}>
                        Basic Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field label="Full Name" name="name" placeholder="Your full name" />
                        <Field label="Occupation" name="occupation" placeholder="Your occupation" />
                        <Field label="Email Address" name="email" type="email" placeholder="your@email.com" />
                        <Field label="Phone Number" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                    </div>
                </div>

                {/* Section: Address */}
                <div>
                    <h3 className="condensed-font text-lg tracking-widest uppercase mb-6" style={{ color: 'var(--white)', borderBottom: '1px solid var(--grey-700)', paddingBottom: '1rem' }}>
                        Address
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2 space-y-2">
                            <label className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-400)' }}>Street Address</label>
                            <Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="rounded-none h-12 text-sm" placeholder="123 Main Street" />
                        </div>
                        <Field label="City" name="city" placeholder="Mumbai" />
                        <Field label="Pincode" name="pincode" placeholder="400001" />
                    </div>
                </div>

                {/* Section: Financial */}
                <div>
                    <h3 className="condensed-font text-lg tracking-widest uppercase mb-6" style={{ color: 'var(--white)', borderBottom: '1px solid var(--grey-700)', paddingBottom: '1rem' }}>
                        Financial Profile
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field label="Annual Income (₹)" name="annualIncome" placeholder="e.g. 1200000" />
                        <Field label="PAN Number" name="pan" placeholder="ABCDE1234F" />
                    </div>
                    <div className="mt-4 p-4 flex items-start gap-3" style={{ background: 'rgba(201,185,154,0.05)', border: '1px solid rgba(201,185,154,0.2)' }}>
                        <ShieldCheck size={15} style={{ color: 'var(--accent-warm)', flexShrink: 0, marginTop: 2 }} />
                        <p className="text-xs" style={{ color: 'var(--grey-400)', fontWeight: 300, lineHeight: 1.7 }}>
                            Your financial data is encrypted and protected. It is only used to recommend suitable plans.
                        </p>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4 pt-2">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="glitch-hover condensed-font text-lg tracking-[0.15em] uppercase px-10 py-4 transition-all duration-300 flex items-center gap-2"
                        style={{
                            background: saved ? 'rgba(74,222,128,0.15)' : 'var(--accent-warm)',
                            color: saved ? '#4ade80' : 'var(--black)',
                            border: saved ? '1px solid rgba(74,222,128,0.4)' : 'none',
                            cursor: saving ? 'not-allowed' : 'pointer',
                            opacity: saving ? 0.7 : 1,
                            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                        }}
                    >
                        {saved ? <><Check size={16} /> Saved</> : saving ? "Saving..." : <>Save Changes <Edit3 size={15} /></>}
                    </button>
                    <button
                        onClick={() => setForm({ ...user })}
                        className="condensed-font text-sm tracking-[0.12em] uppercase px-6 py-4 transition-all duration-300"
                        style={{ border: '1px solid var(--grey-700)', color: 'var(--grey-400)', background: 'transparent', cursor: 'pointer' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--grey-400)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--grey-700)'; }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Security Tab ─────────────────────────────────────────────────────────────
const PasswordTab = () => {
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [twoFA, setTwoFA] = useState(true);

    return (
        <div className="py-12 max-w-2xl">
            <div className="flex items-center gap-4 mb-10">
                <div style={{ width: 30, height: 1, background: 'var(--accent-warm)' }} />
                <span className="condensed-font text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent-warm)' }}>Password Settings</span>
            </div>

            {/* Change Password */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 mb-6"
                style={{ background: 'var(--form-bg)', border: '1px solid var(--grey-700)' }}
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2" style={{ background: 'var(--grey-800)', border: '1px solid var(--grey-700)' }}>
                        <Lock size={16} style={{ color: 'var(--accent-warm)' }} />
                    </div>
                    <h3 className="condensed-font text-xl tracking-widest uppercase" style={{ color: 'var(--white)' }}>Change Password</h3>
                </div>

                <div className="space-y-5">
                    {[
                        { label: 'Current Password', show: showOld, toggle: () => setShowOld(s => !s) },
                        { label: 'New Password', show: showNew, toggle: () => setShowNew(s => !s) },
                    ].map(({ label, show, toggle }, i) => (
                        <div key={i} className="space-y-2">
                            <label className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-400)' }}>{label}</label>
                            <div className="relative">
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="rounded-none h-12 text-sm pr-12"
                                />
                                <button
                                    onClick={toggle}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--grey-600)' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-warm)'}
                                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'var(--grey-600)'}
                                >
                                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="space-y-2">
                        <label className="condensed-font text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--grey-400)' }}>Confirm New Password</label>
                        <Input type="password" placeholder="••••••••" className="rounded-none h-12 text-sm" />
                    </div>
                </div>

                <button
                    className="mt-8 condensed-font text-sm tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300"
                    style={{ background: 'var(--accent-warm)', color: 'var(--black)', border: 'none', cursor: 'pointer', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#b91c1c'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-warm)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--black)'; }}
                >
                    Update Password
                </button>
            </motion.div>

            {/* 2FA Toggle */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 flex items-center justify-between"
                style={{ background: 'var(--form-bg)', border: '1px solid var(--grey-700)' }}
            >
                <div className="flex items-start gap-4">
                    <div className="p-2 mt-1" style={{ background: 'var(--grey-800)', border: '1px solid var(--grey-700)' }}>
                        <Shield size={16} style={{ color: 'var(--accent-warm)' }} />
                    </div>
                    <div>
                        <p className="condensed-font text-lg tracking-wide uppercase mb-1" style={{ color: 'var(--white)' }}>Two-Factor Authentication</p>
                        <p className="text-sm" style={{ color: 'var(--grey-400)', fontWeight: 300 }}>Add an extra layer of security to your account via OTP.</p>
                    </div>
                </div>
                <button
                    onClick={() => setTwoFA(s => !s)}
                    className="relative flex-shrink-0 ml-6"
                    style={{
                        width: 52,
                        height: 28,
                        borderRadius: 0,
                        background: twoFA ? 'var(--accent-warm)' : 'var(--grey-700)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.3s',
                        clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                    }}
                >
                    <span style={{
                        position: 'absolute',
                        top: 4,
                        left: twoFA ? 'calc(100% - 22px)' : 4,
                        width: 18,
                        height: 18,
                        background: twoFA ? 'var(--black)' : 'var(--grey-400)',
                        transition: 'left 0.3s, background 0.3s',
                    }} />
                </button>
            </motion.div>

            {/* Active Sessions */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 p-8"
                style={{ background: 'var(--form-bg)', border: '1px solid var(--grey-700)' }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2" style={{ background: 'var(--grey-800)', border: '1px solid var(--grey-700)' }}>
                        <Clock size={16} style={{ color: 'var(--accent-warm)' }} />
                    </div>
                    <h3 className="condensed-font text-xl tracking-widest uppercase" style={{ color: 'var(--white)' }}>Active Sessions</h3>
                </div>

                {[
                    { device: 'Chrome — Windows', location: 'Mumbai, IN', time: 'Now (current)', current: true },
                    { device: 'Safari — iPhone', location: 'Mumbai, IN', time: '2 days ago', current: false },
                ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between py-4" style={{ borderBottom: i === 0 ? '1px solid var(--grey-700)' : 'none' }}>
                        <div>
                            <p className="condensed-font tracking-wide text-sm uppercase mb-1" style={{ color: 'var(--white)' }}>{session.device}</p>
                            <p className="text-xs" style={{ color: 'var(--grey-400)', fontWeight: 300 }}>{session.location} · {session.time}</p>
                        </div>
                        {session.current ? (
                            <span className="status-badge status-active">Current</span>
                        ) : (
                            <button
                                className="condensed-font text-xs tracking-[0.1em] uppercase px-4 py-2 transition-all"
                                style={{ border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', background: 'transparent', cursor: 'pointer' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(248,113,113,0.1)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                            >
                                Revoke
                            </button>
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface UserData {
    name: string;
    email: string;
    phone: string;
    occupation: string;
    city: string;
    address: string;
    pincode: string;
    annualIncome: string;
    pan: string;
    memberSince: string;
    totalPolicies: number;
    totalClaims: number;
    yearsWithUs: number;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const ProfilePage = () => {
    const { user: authUser } = useAuth();
    const [activeTab, setActiveTab] = useState("Edit Profile");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserData>({
        name: authUser?.name || "User",
        email: authUser?.email || "",
        phone: "",
        occupation: "",
        city: "",
        address: "",
        pincode: "",
        annualIncome: "",
        pan: "",
        memberSince: new Date().getFullYear().toString(),
        totalPolicies: 0,
        totalClaims: 0,
        yearsWithUs: 0,
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!authUser?.id) {
                setLoading(false);
                return;
            }
            try {
                // Fetch user profile from Supabase
                const { data: profileData } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('user_id', authUser.id)
                    .single();

                // Fetch number of policies
                const { data: policiesData } = await supabase
                    .from('policies')
                    .select('id', { count: 'exact' })
                    .eq('user_id', authUser.id);
                
                const policiesCount = policiesData?.length || 0;

                if (profileData) {
                    const memberYear = profileData.created_at ? new Date(profileData.created_at).getFullYear() : new Date().getFullYear();
                    
                    setUser({
                        name: profileData.full_name || authUser.name || "User",
                        email: authUser.email || "",
                        phone: profileData.phone || "",
                        occupation: profileData.occupation || "",
                        city: profileData.city || "",
                        address: profileData.address || "",
                        pincode: profileData.pincode || "",
                        annualIncome: profileData.annual_income || "",
                        pan: profileData.pan || "",
                        memberSince: memberYear.toString(),
                        totalPolicies: policiesCount,
                        totalClaims: 0, // Mock
                        yearsWithUs: new Date().getFullYear() - memberYear,
                    });
                } else {
                    setUser(prev => ({
                        ...prev,
                        name: authUser.name || "User",
                        email: authUser.email || "",
                        totalPolicies: policiesCount
                    }));
                }
            } catch (err) {
                console.error("Failed to load profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [authUser]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-barlow" style={{ background: 'var(--black)', color: 'var(--white)' }}>
                <div className="flex flex-col items-center gap-4">
                    <Clock className="animate-spin" size={32} style={{ color: 'var(--accent-warm)' }} />
                    <span className="condensed-font tracking-widest uppercase text-sm" style={{ color: 'var(--grey-400)' }}>Syncing secure profile...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <GlobalStyles />
            <div style={{ background: 'var(--black)', minHeight: '100vh' }}>
                <ProfileHeader user={user} />
                <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="section-rule" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {activeTab === 'Edit Profile' && <EditProfileTab user={user} setUser={setUser} />}
                    {activeTab === 'Password' && <PasswordTab />}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;