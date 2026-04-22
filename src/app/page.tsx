import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import About from "@/sections/About";
import Certifications from "@/components/Certifications/Certifications";
import Contact from "@/sections/Contact";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Toolbox from "@/sections/Toolbox";

export default function Page() {
  return (
    <div className="page-shell">
      <div className="ambient-glow left-[-140px] top-[80px] h-[520px] w-[520px]" />
      <div className="ambient-glow right-[-180px] top-[420px] h-[540px] w-[540px]" />
      <div className="ambient-glow bottom-[180px] left-[12%] h-[500px] w-[500px]" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Toolbox />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
