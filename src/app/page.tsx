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
    <>
      <Navbar />
      <main className="pt-[72px]">
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
    </>
  );
}
