import React, { useState, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import favicon from '../assets/favicon.png'

const links = [
  {id:'home', label:'Home'},
  {id:'about', label:'About'},
  {id:'skills', label:'Skills'},
  {id:'toolbox', label:'Toolbox'},
  {id:'projects', label:'Projects'},
  {id:'contact', label:'Contact'}
]

export default function Navbar({active}){
  const [open,setOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(()=>{
    // initialize theme from localStorage or system preference
    const saved = localStorage.getItem('theme')
    if(saved){
      setTheme(saved)
      document.documentElement.classList.toggle('dark', saved === 'dark')
    }else{
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  },[])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(y > 8)
          ticking = false
        })
        ticking = true
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = ()=>{
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    // apply dark class to documentElement (Tailwind class strategy)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  const scrollTo = (id)=>{
    setOpen(false)
    const el = document.getElementById(id)
    if(!el) return
    const headerEl = document.querySelector('header')
    const headerHeight = headerEl ? headerEl.offsetHeight : 72
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8
    window.scrollTo({ top, behavior: 'smooth' })
  }
  // Keep scrollY logic; use simple class-based glass blur when scrolled
  const headerClass = isScrolled
    ? 'bg-white/30 dark:bg-[#0F172A]/30 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out'
    : 'bg-transparent transition-all duration-300 ease-in-out'

  return (
    <header className={`sticky top-0 z-50 w-full ${headerClass}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <img src={favicon} alt="swapnil logo" className="rounded-full" />
          </div>
          <div className="ml-2 font-semibold">swapnilverse</div>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm text-[#94A3B8]">
          {links.map(l=> (
            <button key={l.id} onClick={()=>scrollTo(l.id)} className={"hover:text-white "+(active===l.id? 'text-white font-medium':'')}>{l.label}</button>
          ))}
          <a href="/resume.pdf" className="ml-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-sm rounded-full">Resume</a>

          {/* Theme toggle */}
          <button onClick={toggleTheme} aria-label="Toggle theme" className="ml-3 w-10 h-10 rounded-full glass flex items-center justify-center border border-white/6 shadow-sm transition-transform duration-300 hover:scale-105">
            {theme === 'dark' ? (
              // sun icon (to switch to light)
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300 transition-transform duration-300">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" />
                <path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M4.93 19.07l1.41-1.41" />
                <path d="M17.66 6.34l1.41-1.41" />
              </svg>
              ) : (
              // moon icon (to switch to dark)
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-transform duration-300">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </nav>
        <button className="md:hidden p-2" onClick={()=>setOpen(v=>!v)} aria-label="menu">
          <HiMenu size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/30 dark:bg-[#0F172A]/30 backdrop-blur-md py-4">
          <div className="flex flex-col items-center gap-4">
            {links.map(l=> (
              <button key={l.id} onClick={()=>scrollTo(l.id)} className={"text-white text-lg"}>{l.label}</button>
            ))}
            <div className="pt-2 flex items-center gap-3">
              <a href="/resume.pdf" className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-sm rounded-full">Resume</a>
              <button onClick={toggleTheme} aria-label="Toggle theme" className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/6 shadow-sm transition-transform duration-300 hover:scale-105">
                {theme === 'dark' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M4.93 4.93l1.41 1.41" />
                    <path d="M17.66 17.66l1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M4.93 19.07l1.41-1.41" />
                    <path d="M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
