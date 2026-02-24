import { motion } from "framer-motion";
import { Heart, Umbrella, Car, Banknote, Shield, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Services = () => {
    const services = [
        {
            icon: Heart,
            title: "Health Insurance",
            description: "Comprehensive coverage for you and your family's medical needs.",
            color: "text-red-400 bg-red-400/10",
        },
        {
            icon: Umbrella,
            title: "Life Insurance",
            description: "Secure your loved ones' future with term and whole life policies.",
            color: "text-blue-400 bg-blue-400/10",
        },
        {
            icon: Shield,
            title: "Term Insurance",
            description: "Affordable protection with high coverage for pure risk management.",
            color: "text-green-400 bg-green-400/10",
        },
        {
            icon: Car,
            title: "Motor Insurance",
            description: "Protection for your vehicles against accidents, theft, and damages.",
            color: "text-yellow-400 bg-yellow-400/10",
        },
        {
            icon: Banknote,
            title: "Mutual Funds",
            description: "Grow your wealth with expert-curated investment portfolios.",
            color: "text-purple-400 bg-purple-400/10",
        },
        {
            icon: Briefcase,
            title: "Retirement Planning",
            description: "Build a robust corpus for a stress-free and golden retirement.",
            color: "text-orange-400 bg-orange-400/10",
        },
    ];

    return (
        <section id="services" className="py-24 bg-background relative overflow-hidden">
            {/* Dot-grid background matching Hero & About */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4"
                    >
                        What We Deal With
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        A comprehensive suite of financial products designed to protect and grow your wealth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="bg-card/50 dark:bg-white/5 backdrop-blur-md border-border dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 group h-full">
                                <CardHeader className="pt-8 px-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color} transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                                        <service.icon className="h-7 w-7" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <CardDescription className="text-base leading-relaxed text-muted-foreground/90">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
