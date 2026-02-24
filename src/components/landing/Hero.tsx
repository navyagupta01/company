import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp, BarChart3, Shield, LineChart, Wallet, PiggyBank, Briefcase, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
            {/* Finance-inspired Background */}
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

            {/* Soft layered gradients for depth */}
            <div className="absolute top-0 left-0 w-full h-full -z-20 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center max-w-4xl mx-auto -mt-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 rounded-full px-3 py-1 mb-6 backdrop-blur-md"
                    >
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Expert Financial Protection</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6 leading-[0.9] md:leading-[1]"
                    >
                        Secure Your Future with <br className="hidden md:block" />
                        <Link to="/" className="inline-block transition-transform hover:scale-[1.02] active:scale-95">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-blue-600 dark:to-blue-400">
                                NG Consultant
                            </span>
                        </Link>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        Bespoke wealth management and comprehensive insurance strategies designed for growth, stability, and lasting peace of mind.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5"
                    >
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_rgba(30,58,138,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(30,58,138,0.6)] transition-all duration-300 hover:scale-105 active:scale-95">
                            Get Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-border hover:bg-accent hover:text-foreground transition-all duration-300 border-2">
                            View Plans
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Finance-related Decorative Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
                <motion.div
                    animate={{ y: [0, -15, 0], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-[5%] text-primary/30 hidden xl:block"
                >
                    <TrendingUp size={120} strokeWidth={1} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 15, 0], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-[5%] text-primary/30 hidden xl:block"
                >
                    <Shield size={100} strokeWidth={1} />
                </motion.div>
                <motion.div
                    animate={{ x: [0, 10, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-1/3 right-[15%] text-primary/20 hidden xl:block"
                >
                    <BarChart3 size={80} strokeWidth={1} />
                </motion.div>
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 left-[20%] text-primary/20 hidden xl:block"
                >
                    <LineChart size={60} strokeWidth={1} />
                </motion.div>

                {/* Additional Finance Icons */}
                <motion.div
                    animate={{ rotate: [0, 10, 0], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-[15%] left-[20%] text-primary/25 hidden lg:block"
                >
                    <Wallet size={70} strokeWidth={1} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute bottom-[15%] left-[10%] text-primary/20 hidden lg:block"
                >
                    <PiggyBank size={90} strokeWidth={1} />
                </motion.div>
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                    className="absolute top-[20%] right-[25%] text-primary/15 hidden lg:block"
                >
                    <Briefcase size={50} strokeWidth={1} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 15, 0], opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
                    className="absolute bottom-[25%] right-[20%] text-primary/10 hidden lg:block"
                >
                    <Landmark size={110} strokeWidth={1} />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
