import Layout from "@/components/layout/Layout";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import WhyUs from "@/components/landing/WhyUs";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";

const LandingPage = () => {
    return (
        <Layout>
            <Hero />
            <About />
            <Services />
            <WhyUs />
            <Testimonials />
            <Contact />
        </Layout>
    );
};

export default LandingPage;
