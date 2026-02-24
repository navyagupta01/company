import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Rajesh Kumar",
            role: "Business Partner",
            content: "NG CONSULTANT helped us secure our business assets with a comprehensive plan. Their advice was spot on and saved us significantly.",
        },
        {
            name: "Priya Sharma",
            role: "Software Engineer",
            content: "I was confused about which term plan to buy. The team explained everything clearly and helped me choose the best option for my family.",
        },
        {
            name: "Amit Patel",
            role: "Entrepreneur",
            content: "Their investment advisory has been a game-changer for my portfolio. Professional, trustworthy, and always available.",
        },
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Dot-grid background matching other sections */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">What Our Clients Say</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Real stories from people who have secured their future with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-card/50 dark:bg-white/5 backdrop-blur-md border border-border dark:border-white/10 shadow-lg hover:border-primary/30 transition-all duration-300 relative group">
                                <CardContent className="p-8 flex flex-col h-full uppercase">
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center -rotate-12 group-hover:rotate-0 transition-transform">
                                        <Quote className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="text-muted-foreground mb-8 flex-grow leading-relaxed italic text-lg">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center space-x-4 border-t border-border/50 pt-6">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-lg ring-2 ring-primary/20">
                                            {testimonial.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-foreground font-black tracking-tight">{testimonial.name}</p>
                                            <p className="text-xs text-primary font-bold uppercase tracking-widest">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
