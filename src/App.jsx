import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Toolbox from './sections/Toolbox'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App(){
  const [active, setActive] = useState('home')

  useEffect(()=>{
    const secs = document.querySelectorAll('section')
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          setActive(e.target.id)
        }
      })
    },{threshold:0.5})
    secs.forEach(s=>obs.observe(s))
    return ()=>obs.disconnect()
  },[])

  return (
    <div>
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Toolbox />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
