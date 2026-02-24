import { Shield, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-background border-t border-border pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground">
                                NG <span className="text-primary">CONSULTANT</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Secure your future with smart investment planning and comprehensive insurance coverage.
                            We are your partners in financial safety.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Company</h3>
                        <ul className="space-y-2">
                            {["About Us", "Our Team", "Careers", "Contact"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Services</h3>
                        <ul className="space-y-2">
                            {["Life Insurance", "Health Insurance", "Retirement Planning", "Mutual Funds"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>123 Financial District</li>
                            <li>Mumbai, MH 400001</li>
                            <li>+91 98765 43210</li>
                            <li>contact@ngconsultant.com</li>
                        </ul>
                        <div className="flex space-x-4 mt-6">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-border dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} NG CONSULTANT. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
