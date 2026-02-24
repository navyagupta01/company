import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-background relative overflow-x-hidden">
            {/* Background gradients/blobs */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-purple-500/5 blur-[100px]" />
            </div>

            <Navbar />
            <main className="flex-grow pt-20 relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
