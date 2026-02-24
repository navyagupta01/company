import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Shield,
    FileText,
    ExternalLink,
    LogOut,
    User,
    Home,
    Settings,
    Bell,
    CheckCircle2,
    Clock,
    Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Policy {
    id: string;
    name: string;
    company_name: string;
    type: string;
    status: "active" | "pending" | "expired";
    premium: string;
    expiry_date: string;
    policy_number: string;
    document_link: string;
}

const Dashboard = () => {
    const { user, logout, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<"overview" | "policies" | "profile">("overview");
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [claimsCount, setClaimsCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                console.log("No user found in Dashboard, skipping fetch");
                return;
            }

            console.log("Fetching data for user ID:", user.id);
            setLoading(true);
            try {
                // Fetch Policies
                const { data: policyData, error: policyError } = await supabase
                    .from('policies')
                    .select('*')
                    .eq('user_id', user.id);

                console.log("Supabase Policy Response:", { policyData, policyError });

                if (policyError) throw policyError;
                setPolicies(policyData || []);

                // Fetch Claims (try-catch specifically for table existence)
                try {
                    const { count, error: claimsError } = await supabase
                        .from('claims')
                        .select('*', { count: 'exact', head: true })
                        .eq('user_id', user.id);

                    if (!claimsError) {
                        setClaimsCount(count || 0);
                    }
                } catch (err) {
                    console.log("Claims table may not exist yet, defaulting to 0");
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const stats = [
        {
            label: "Active Policies",
            value: (policies || []).filter(p => p?.status?.toLowerCase() === 'active').length.toString(),
            icon: CheckCircle2,
            color: "text-green-400"
        },
        {
            label: "Pending",
            value: (policies || []).filter(p => p?.status?.toLowerCase() === 'pending').length.toString(),
            icon: Clock,
            color: "text-yellow-400"
        },
        {
            label: "Claims Filed",
            value: claimsCount.toString(),
            icon: FileText,
            color: "text-purple-400"
        },
    ];

    const getStatusBadge = (status: string) => {
        const lowerStatus = status?.toLowerCase() || "";
        const styles: Record<string, string> = {
            active: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
            pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
            expired: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        };
        const currentStyle = styles[lowerStatus] || "bg-gray-500/10 text-gray-600 border-gray-500/20";
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${currentStyle}`}>
                {lowerStatus.charAt(0).toUpperCase() + lowerStatus.slice(1)}
            </span>
        );
    };

    if (authLoading || (loading && policies.length === 0)) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-muted-foreground animate-pulse">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border p-6 flex flex-col fixed h-full z-20">
                <div className="flex items-center space-x-2 mb-8">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        NG <span className="text-primary">CONSULTANT</span>
                    </span>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveSection("overview")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeSection === "overview"
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                    >
                        <Home className="h-5 w-5" />
                        <span className="font-medium">Overview</span>
                    </button>

                    <button
                        onClick={() => setActiveSection("policies")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeSection === "policies"
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                    >
                        <FileText className="h-5 w-5" />
                        <span className="font-medium">My Policies</span>
                    </button>

                    <button
                        onClick={() => setActiveSection("profile")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeSection === "profile"
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                    >
                        <User className="h-5 w-5" />
                        <span className="font-medium">Profile</span>
                    </button>

                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Settings</span>
                    </button>
                </nav>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors mt-auto"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-foreground mb-2">
                            Welcome back, {user?.name || "User"}!
                        </h1>
                        <p className="text-muted-foreground text-lg">Manage your insurance policies and claims</p>
                    </div>
                    <Button variant="outline" className="border-border h-12 px-6 rounded-xl">
                        <Bell className="h-5 w-5 mr-3" />
                        Notifications
                    </Button>
                </div>

                <AnimatePresence mode="wait">
                    {/* Overview Section */}
                    {activeSection === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {stats.map((stat, index) => (
                                    <Card key={index} className="bg-card/50 backdrop-blur-md border-border dark:border-white/10 shadow-xl rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                                        <CardContent className="p-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`p-3 rounded-xl bg-background/50 border border-border/50`}>
                                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                                </div>
                                            </div>
                                            <div className="text-4xl font-black tracking-tighter text-foreground mb-1">{stat.value}</div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Recent Policies */}
                            <Card className="bg-card/50 backdrop-blur-md border-border dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                                <CardHeader className="p-8 border-b border-border/50">
                                    <CardTitle className="text-2xl font-black tracking-tighter">Recent Policies</CardTitle>
                                    <CardDescription className="text-base font-medium">Your latest active and pending insurance policies</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8">
                                    {policies.length === 0 ? (
                                        <div className="text-center py-12">
                                            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                                            <p className="text-muted-foreground text-lg font-medium">No policies found</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {policies.slice(0, 3).map((policy) => (
                                                <div
                                                    key={policy.id}
                                                    className="flex items-center justify-between p-6 bg-background/50 rounded-2xl border border-border transition-all duration-300 hover:border-primary/20"
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-4 mb-2">
                                                            <h3 className="text-lg font-bold text-foreground">
                                                                {policy.name || policy.type || "Insurance Policy"}
                                                            </h3>
                                                            {getStatusBadge(policy.status)}
                                                        </div>
                                                        <p className="text-sm font-medium text-muted-foreground">
                                                            {policy.policy_number} • {policy.company_name} • Expires {policy.expiry_date || "N/A"}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xl font-black tracking-tighter text-primary">{policy.premium}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Policies Section */}
                    {activeSection === "policies" && (
                        <motion.div
                            key="policies"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <Card className="bg-card/50 backdrop-blur-md border-border dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                                <CardHeader className="p-8 border-b border-border/50 flex flex-row items-center justify-between space-y-0">
                                    <div>
                                        <CardTitle className="text-2xl font-black tracking-tighter">My Policies</CardTitle>
                                        <CardDescription className="text-base font-medium">View and manage all your insurance policies</CardDescription>
                                    </div>
                                    <Button className="h-12 px-6 rounded-xl font-bold tracking-tight shadow-lg shadow-primary/20">
                                        Add New Policy
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-8">
                                    {policies.length === 0 ? (
                                        <div className="text-center py-24">
                                            <FileText className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-10" />
                                            <h3 className="text-2xl font-black tracking-tighter mb-2">No policies found</h3>
                                            <p className="text-muted-foreground">You haven't added any insurance policies yet.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-6">
                                            {policies.map((policy) => (
                                                <div
                                                    key={policy.id}
                                                    className="p-8 bg-background/50 rounded-3xl border border-border hover:border-primary/30 transition-all duration-300 group shadow-lg hover:shadow-xl"
                                                >
                                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-4 mb-3">
                                                                <h3 className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">{policy.name}</h3>
                                                                {getStatusBadge(policy.status)}
                                                            </div>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                                                                <p className="text-sm font-medium text-muted-foreground flex items-center">
                                                                    <span className="w-24 font-bold uppercase tracking-widest text-[10px] opacity-50">Number:</span> {policy.policy_number}
                                                                </p>
                                                                <p className="text-sm font-medium text-muted-foreground flex items-center">
                                                                    <span className="w-24 font-bold uppercase tracking-widest text-[10px] opacity-50">Company:</span> {policy.company_name}
                                                                </p>
                                                                <p className="text-sm font-medium text-muted-foreground flex items-center">
                                                                    <span className="w-24 font-bold uppercase tracking-widest text-[10px] opacity-50">Type:</span> {policy.type}
                                                                </p>
                                                                <p className="text-sm font-medium text-muted-foreground flex items-center">
                                                                    <span className="w-24 font-bold uppercase tracking-widest text-[10px] opacity-50">Expiry:</span> {policy.expiry_date}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right flex flex-col justify-center items-end bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-1">Annual Premium</p>
                                                            <p className="text-3xl font-black tracking-tighter text-primary">{policy.premium}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-4 pt-8 border-t border-border/50">
                                                        <Button
                                                            variant="default"
                                                            className="h-12 px-6 rounded-xl font-bold tracking-tight shadow-lg shadow-primary/20"
                                                            onClick={() => policy.document_link && window.open(policy.document_link, '_blank')}
                                                        >
                                                            <ExternalLink className="h-4 w-4 mr-3" />
                                                            View Document
                                                        </Button>
                                                        <Button variant="outline" className="h-12 px-6 rounded-xl border-border font-bold tracking-tight hover:bg-accent">
                                                            Claim Policy
                                                        </Button>
                                                        <Button variant="ghost" className="h-12 px-6 rounded-xl font-bold tracking-tight ml-auto hover:bg-accent/50 text-muted-foreground">
                                                            Support
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Profile Section */}
                    {activeSection === "profile" && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-3xl"
                        >
                            <Card className="bg-card/50 backdrop-blur-md border-border dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                                <CardHeader className="p-10 border-b border-border/50 bg-primary/5">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground text-4xl font-black shadow-xl shadow-primary/30">
                                            {user?.name?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <CardTitle className="text-3xl font-black tracking-tighter text-foreground">{user?.name}</CardTitle>
                                            <CardDescription className="text-lg font-medium text-primary">{user?.email}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-10 space-y-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Account Status</label>
                                            <div className="flex items-center space-x-3 text-green-500 font-bold bg-green-500/10 w-fit px-4 py-2 rounded-xl border border-green-500/20">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span>Verified Client</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Joined At</label>
                                            <p className="text-lg font-bold text-foreground">January 2024</p>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-border/50">
                                        <div className="flex flex-wrap gap-4">
                                            <Button className="h-14 px-10 rounded-2xl font-black tracking-tight bg-primary text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                                Edit Profile
                                            </Button>
                                            <Button variant="outline" className="h-14 px-10 rounded-2xl border-border font-black tracking-tight hover:bg-accent transition-all">
                                                Security Settings
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Dashboard;
