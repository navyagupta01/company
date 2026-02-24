import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative bg-background overflow-hidden">
            {/* Dot-grid background matching other sections */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6">Get in Touch</h2>
                        <p className="text-muted-foreground text-lg mb-12 max-w-md leading-relaxed">
                            Ready to secure your future? Reach out to us for a personalized consultation with our expert advisors.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-6 group">
                                <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-foreground font-black uppercase tracking-widest text-xs mb-1">Call Us</h3>
                                    <p className="text-lg font-bold">+91 98765 43210</p>
                                    <p className="text-muted-foreground text-sm">Mon-Fri, 9am - 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group">
                                <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-foreground font-black uppercase tracking-widest text-xs mb-1">Email Us</h3>
                                    <p className="text-lg font-bold">contact@ngconsultant.com</p>
                                    <p className="text-muted-foreground text-sm">consult@ngconsultant.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group">
                                <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-foreground font-black uppercase tracking-widest text-xs mb-1">Visit Us</h3>
                                    <p className="text-lg font-bold">123 Financial District,</p>
                                    <p className="text-muted-foreground text-sm">Mumbai, Maharashtra 400001</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-card/50 dark:bg-white/5 backdrop-blur-md border-border dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                            <CardContent className="p-10 space-y-6">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-foreground/70">Name</label>
                                            <Input id="name" placeholder="John Doe" className="bg-background/50 border-border h-12 rounded-xl focus:ring-primary/20 transition-all outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-foreground/70">Email</label>
                                            <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50 border-border h-12 rounded-xl focus:ring-primary/20 transition-all outline-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-foreground/70">Subject</label>
                                        <Input id="subject" placeholder="Consultation Request" className="bg-background/50 border-border h-12 rounded-xl focus:ring-primary/20 transition-all outline-none" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-foreground/70">Message</label>
                                        <textarea
                                            id="message"
                                            className="flex min-h-[140px] w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                            placeholder="How can we help you explore your financial future?"
                                        />
                                    </div>

                                    <Button className="w-full text-lg h-14 font-black tracking-tight bg-primary text-primary-foreground rounded-xl shadow-[0_10px_30px_-10px_rgba(30,58,138,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(30,58,138,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
