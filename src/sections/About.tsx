import React from 'react'
import { motion, type Variants } from 'framer-motion'

const card: Variants = { hidden:{opacity:0,y:10}, show:{opacity:1,y:0} }

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl font-bold mb-6">About Me</motion.h2>

        <motion.div initial="hidden" whileInView="show" viewport={{once:true}} transition={{staggerChildren:0.12}} className="grid md:grid-cols-3 gap-6">
          <motion.div variants={card} className="glass p-6 rounded-lg">
            <div className="text-3xl font-bold">20+</div>
            <div className="text-sm text-[#94A3B8] mt-1">Applications Delivered</div>
          </motion.div>

          <motion.div variants={card} className="glass p-6 rounded-lg">
            <div className="font-semibold">Healthcare, Banking, CRM & E-Commerce Expertise</div>
            <div className="text-sm text-[#94A3B8] mt-1">Cross-domain product and platform experience</div>
          </motion.div>

          <motion.div variants={card} className="glass p-6 rounded-lg">
            <div className="font-semibold">Currently at <a href="https://www.zendesk.com/in/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Zendesk</a> Pune</div>
            <div className="text-sm text-[#94A3B8] mt-1">Building scalable customer experience platforms powered by AI and intelligent agents.</div>
          </motion.div>
        </motion.div>

        <blockquote className="mt-8 italic text-[#94A3B8]">“Delivering scalable and high-quality solutions that solve real-world problems.”</blockquote>
      </div>
    </section>
  )
}

export default About
