import { motion } from "framer-motion";
import { Users, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
    const highlights = [
        {
            icon: Users,
            title: "Client-Centric Approach",
            description: "We put your needs first, offering personalized advice tailored to your life goals.",
        },
        {
            icon: Target,
            title: "Experienced Advisors",
            description: "Over 15 years of experience in the insurance and financial planning industry.",
        },
        {
            icon: Award,
            title: "Trusted Partners",
            description: "Partnered with top-tier insurance providers to give you the best options.",
        },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-background">
            {/* Dot-grid background matching Hero */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

            <div className="absolute top-1/4 left-1/4 w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full -z-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6 leading-[1.1]">
                            Empowering You to make <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400">
                                Confident Financial Decisions
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            At NG CONSULTANT, our mission is to demystify insurance and investment. We believe that financial security shouldn't be complicated. Our team acts as your personal navigator, guiding you through every policy and plan to ensure you're covered for whatever life throws your way.
                        </p>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Whether you're planning for retirement, securing your family's health, or looking for wealth creation avenues, we bring clarity and trust to the process.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-6">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="bg-card/50 dark:bg-white/5 backdrop-blur-md border-border dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                                    <CardContent className="flex items-start space-x-6 p-8">
                                        <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-xl shadow-inner">
                                            <item.icon className="h-7 w-7 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-xl mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
