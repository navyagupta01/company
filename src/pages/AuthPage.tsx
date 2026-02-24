import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Mail, Lock, User, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login, register } = useAuth();

    // Login form state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register form state
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await login(loginEmail, loginPassword);
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Login failed:", err);
            setError(err.message || "Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await register(registerName, registerEmail, registerPassword);
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Registration failed:", err);
            setError(err.message || "Could not complete registration");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                            <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-foreground">
                            NG <span className="text-primary">CONSULTANT</span>
                        </span>
                    </div>
                    <p className="text-muted-foreground">Access your insurance dashboard</p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center space-x-3 text-red-600 dark:text-red-400 text-sm"
                        >
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Card className="bg-card dark:bg-card/50 backdrop-blur-xl border-border dark:border-white/10 shadow-lg">
                    <CardHeader>
                        {/* Tabs */}
                        <div className="flex space-x-2 mb-6 bg-background/50 p-1 rounded-lg">
                            <button
                                onClick={() => { setActiveTab("login"); setError(null); }}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "login"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { setActiveTab("register"); setError(null); }}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "register"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                Register
                            </button>
                        </div>

                        <CardTitle className="text-2xl">
                            {activeTab === "login" ? "Welcome Back" : "Create Account"}
                        </CardTitle>
                        <CardDescription>
                            {activeTab === "login"
                                ? "Enter your credentials to access your dashboard"
                                : "Sign up to manage your insurance policies"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {activeTab === "login" ? (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="login-email" className="text-sm font-medium text-foreground">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="login-email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                            className="pl-10 bg-background/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="login-password" className="text-sm font-medium text-foreground">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="login-password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            className="pl-10 bg-background/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center space-x-2 text-muted-foreground">
                                        <input type="checkbox" className="rounded border-border bg-background/50" />
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#" className="text-primary hover:underline">
                                        Forgot password?
                                    </a>
                                </div>

                                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                                    {isLoading ? "Signing in..." : "Sign In"}
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="register-name" className="text-sm font-medium text-foreground">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={registerName}
                                            onChange={(e) => setRegisterName(e.target.value)}
                                            className="pl-10 bg-background/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="register-email" className="text-sm font-medium text-foreground">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={registerEmail}
                                            onChange={(e) => setRegisterEmail(e.target.value)}
                                            className="pl-10 bg-background/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="register-password" className="text-sm font-medium text-foreground">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="register-password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                            className="pl-10 bg-background/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start space-x-2 text-sm">
                                    <input type="checkbox" className="mt-1 rounded border-border bg-background/50" required />
                                    <label className="text-muted-foreground">
                                        I agree to the{" "}
                                        <a href="#" className="text-primary hover:underline">
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-primary hover:underline">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>

                                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                                    {isLoading ? "Creating account..." : "Create Account"}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Need help?{" "}
                    <a href="/#contact" className="text-primary hover:underline">
                        Contact Support
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default AuthPage;
