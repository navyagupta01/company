import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Counter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);

            setCount(Math.floor(end * percentage));

            if (progress < duration * 1000) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <span>{count}</span>;
}

const WhyUs = () => {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Dot-grid background matching other sections */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

            <div className="absolute top-1/2 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">Why Choose Us</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We don't just sell policies; we build relationships. Here is why thousands trust us.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Active Clients", value: 5000, suffix: "+" },
                        { label: "Policies Sold", value: 12000, suffix: "+" },
                        { label: "Claim Settlement", value: 98, suffix: "%" },
                        { label: "Years Experience", value: 15, suffix: "+" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-card/50 dark:bg-white/5 backdrop-blur-md border border-border dark:border-white/10 shadow-lg hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="text-5xl md:text-6xl font-black tracking-tighter text-primary mb-3">
                                <Counter end={stat.value} />{stat.suffix}
                            </div>
                            <div className="text-muted-foreground font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
