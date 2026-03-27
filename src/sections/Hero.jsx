import React from 'react'
import { motion } from 'framer-motion'

const float = {
  animate: { y: [0, -10, 0], rotate: [0, 2, 0] },
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
}

export default function Hero(){
  return (
    <section id="home" className="min-h-screen flex items-center" style={{paddingTop:72}}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <div className="badge mb-4 text-sm text-[#94A3B8]">Pune, Maharashtra, India</div>
            <h1 className="text-4xl md:text-5xl font-extrabold">Swapnil Nandapure</h1>
            {/* typing SVG badge */}
            <a href="https://git.io/typing-svg" target="_blank" rel="noreferrer" aria-label="typing svg" className="block mt-3">
              <img
                src="https://readme-typing-svg.demolab.com?font=Poppins&duration=3000&pause=200&color=F0DB4F&width=435&lines=Senior+Software+Engineer;Mentor;Problem+Solver;AI+%26+AI+Agents+Builder"
                alt="Typing: Senior Software Engineer, Mentor, Problem Solver, AI & AI Agents Builder"
                className="text-primary font-semibold mt-2"
              />
            </a>
            <p className="text-primary font-semibold mt-2">Designing and engineering resilient, scalable systems for modern digital products.</p>
            <p className="mt-4 text-[#94A3B8] max-w-xl">I love designing and building digital products that solve real problems and make people’s lives easier. Blending creativity with technology, I create scalable experiences across Banking, Healthcare, CRM, and E-Commerce.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})} className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary">View Projects</button>
              <button onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="px-4 py-2 rounded-full border border-white/8 text-sm">Contact Me</button>
              <a href="/resume.pdf" className="px-4 py-2 rounded-full border border-white/8 text-sm">Download Resume</a>
            </div>
          </motion.div>

          <motion.div className="flex justify-center md:justify-end" initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full blur-2xl" style={{background:'linear-gradient(90deg,#6366F1, #8B5CF6, #06B6D4)', filter:'blur(30px)', opacity:0.6}} />
              <motion.img src="/image.jpg" alt="Swapnil" className="w-72 h-72 md:w-96 md:h-96 rounded-full border-4 border-white/5 object-cover relative" {...float} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
