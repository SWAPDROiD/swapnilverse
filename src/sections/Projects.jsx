import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: 'Slasher',
    tech: 'Entertainment',
    url: 'https://www.slasher.tv/',
    image: '/src/assets/entertainment.png',
    details: {
      fullTitle: 'Slasher – Horror Social Network',
      subtitle: 'Real-time Social Platform for Horror Community',
      roleTitle: 'React Native Developer',
      badges: ['Social Network','Real-time Chat','Video Streaming','Entertainment'],
      highlight: 'Built for a niche global horror community focused on real-time social interaction and multimedia sharing',
      overview: `Slasher is a unique social networking platform built specifically for horror enthusiasts. It provides a space where users can freely share horror content, connect with like-minded people, and explore horror media without restrictions. Unlike traditional social platforms, Slasher allows uncensored horror content and focuses on community engagement without algorithm-based content filtering.`,
      features: [
        'Social timeline to share horror content',
        'Real-time messaging and chat system',
        'Video calling and live streaming features',
        'Horror movie database with trailers and tracking',
        'Event calendar for horror conventions and meetups',
        'Discovery platform for indie horror creators',
        'News integration from top horror sources',
        'No algorithm-based feed (organic reach for posts)'
      ],
      role: [
        'Developed and enhanced real-time chat functionality',
        'Implemented video calling and streaming features',
        'Worked on messaging performance and scalability',
        'Integrated real-time communication modules',
        'Improved user interaction experience',
        'Collaborated with cross-functional teams for feature delivery'
      ],
      tech: ['React Native','JavaScript','TypeScript','WebSockets','Streaming APIs','Push Notifications','REST APIs'],
      links: [
        {label:'View iOS App', href:'https://apps.apple.com/us/app/slasher-horror-social-network/id1458216326'},
        {label:'View Android App', href:'https://play.google.com/store/apps/details?id=com.sdei.slasher&hl=en'},
        {label:'Visit Website', href:'https://pages.slasher.tv/'}
      ],
      highlights: [
        'Built for a niche global community (horror fans)',
        'Handles real-time communication at scale',
        'Supports multimedia sharing and live interaction',
        'Focused on user engagement and community building'
      ]
    }
  },
  {
    title: 'Splynt',
    tech: 'Healthcare',
    url: 'https://splynt.co/',
    image: '/src/assets/healthcare.png',
    details: {
      fullTitle: 'Splynt Instant Telehealth App',
      subtitle: 'Sr. React Native Developer',
      badges: ['Healthcare','Mobile App','Real-time Communication'],
      highlight: 'Designed for high-performance athlete healthcare communication',
      overview: 'A healthcare platform designed for athletes and providers enabling real-time communication, appointment scheduling, and injury analysis.',
      features: [
        'Real-time urgent call communication',
        'Appointment booking and scheduling',
        'Video consultation with providers',
        'Chat functionality',
        'Injury analysis with dynamic questionnaire',
        'Provider availability management',
        'Secure payment integration'
      ],
      role: [
        'Led React Native development',
        'Built appointment and communication features',
        'Implemented chat, video call, and document workflows',
        'Delivered demo and handled core modules'
      ],
      tech: ['React Native','Redux Thunk','JavaScript','TypeScript','SignalR','Firebase','Google Maps','Stripe','OpenTok'],
      links: [
        {label:'Android (Play Store)', href:'https://play.google.com/store/apps/details?id=com.splynt.telehealth'},
        {label:'iOS (App Store)', href:'https://apps.apple.com/us/app/splynt-instant-telehealth/id1560796074'},
        {label:'Website', href:'https://stagingwin.com:9221/'}
      ]
    }
  },
  {
    title: 'IDFC First Bank (Trade FX)',
    tech: 'Banking',
    url: 'https://my.idfcfirst.bank.in/',
    image: '/src/assets/banking.png',
    details: {
      fullTitle: 'Trade FX – Inward Remittance',
      subtitle: 'Lead Software Engineer',
      duration: '12 months (UP)',
      team: 'Team size: 12',
      badges: ['Banking','Web','Mobile'],
      highlight: 'Inward remittance application for business users to convert foreign currency to INR',
      overview: `The application is developed for both Mobile (Android and iOS) and Web platforms. Built with React Native and React JS, it enables Business Users to convert remittances in other currencies (USD, EUR, JPY, etc.) to Indian rupees. Users can book deals at current market rates and submit them to Newgen via the application. Key sections include inward listing, disposal details, upload document, declaration, currency details, and summary for downloading records.`,
      features: [
        'Multi-platform: Mobile (Android/iOS) and Web',
        'Book deals at current market rates and submit to Newgen',
        'Inward listing and disposal details',
        'Document upload and download',
        'Declarations and currency details',
        'Summary export/download of records'
      ],
      role: [
        'Design and develop disposal details',
        'Implement upload/download of documents and records',
        'Deliver demos and collaborate with stakeholders'
      ],
      tech: ['React JS','React Native','JavaScript','ECMAScript','IDFC internal deps','Newgen integration'],
      links: [
        {label:'Android (Play Store)', href:'https://play.google.com/store/apps/details?id=com.idfcfirstbank.optimus&hl=en&gl=US&pli=1'},
        {label:'iOS (App Store)', href:'https://apps.apple.com/in/app/idfc-first-bank-mobilebanking/id1521443352'},
        {label:'Website', href:'https://my.idfcfirstbank.com/login'}
      ],
      environment: ['Visual Studio','React JS','React Native','JavaScript','ECMAScript','IDFC internal dependencies']
    }
  },
  {
    title: 'The Collective',
    tech: 'E-commerce',
    url: 'https://www.thecollective.in/',
    image: '/src/assets/shopping.png',
    details: {
      fullTitle: 'The Collective',
      subtitle: 'Sr. React Native Developer',
      badges: ['E-commerce','Mobile','Web'],
      highlight: 'Curated product listings with integrated payments',
      overview: 'Worked on showcasing product lists and integrating payment gateways across mobile and web platforms to improve conversion and UX.',
      features: ['Product listing & discovery','Responsive product cards','Payment gateway integration','Checkout flow optimization'],
      role: ['Developed product listing interfaces','Integrated payment gateway and checkout','Implemented mobile-first UX improvements'],
      tech: ['React Native','Next.js','Node.js','Stripe'],
      links: [
        {label: 'Android (Play Store)', href: 'https://play.google.com/store/apps/details?id=com.collectivechild'},
        {label: 'Website', href: 'https://www.thecollectivechild.com/'}
      ]
    }
  }
]

export default function Projects(){
  const [openProject, setOpenProject] = useState(null)
  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(()=>{
    const onKey = (e)=>{
      if(e.key === 'Escape') setOpenProject(null)
      if(e.key === 'Tab' && openProject){
        // simple focus trap
        const modal = modalRef.current
        if(!modal) return
        const focusable = modal.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])')
        if(focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length-1]
        if(e.shiftKey && document.activeElement === first){
          e.preventDefault(); last.focus()
        } else if(!e.shiftKey && document.activeElement === last){
          e.preventDefault(); first.focus()
        }
      }
    }
    if(openProject){
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return ()=>{ window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  },[openProject])

  const openDetails = (p) => setOpenProject(p)
  const closeDetails = ()=> setOpenProject(null)

  return (
    <>
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl font-bold mb-6">Featured Projects</motion.h2>
        <p className="text-sm text-[#94A3B8] mb-6">Highlights from 20+ applications I have built</p>

        <div className="grid md:grid-cols-4 gap-6">
          {projects.map((p,idx)=> (
            <motion.div key={p.title} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="rounded-lg overflow-hidden glass">
              <div className="relative">
                <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-[#94A3B8] mb-3">{p.tech}</div>
                  <div className="flex gap-2">
                    <a href={p.url} target="_blank" rel="noreferrer" className="px-3 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md text-sm">View Project</a>
                    <button onClick={()=>openDetails(p)} className="px-3 py-2 border border-white/6 rounded-md text-sm bg-transparent hover:bg-white/5 transition">View Details</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    
    {/* Modal for project details */}
    <AnimatePresence>
      {openProject && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} ref={overlayRef} onMouseDown={(e)=>{ if(e.target === overlayRef.current) closeDetails() }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div ref={modalRef} className="relative z-10 w-[94%] max-w-5xl mx-auto glass border border-transparent rounded-2xl shadow-2xl overflow-hidden" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.98}} transition={{duration:0.28}} style={{maxHeight:'80vh'}}>
            <div className="absolute -inset-px rounded-2xl pointer-events-none" style={{background:'linear-gradient(90deg, rgba(99,102,241,0.06), rgba(124,58,237,0.06))', filter:'blur(24px)'}} />
            <div className="relative z-10 max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-white/6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{openProject?.details?.fullTitle || openProject?.title}</h2>
                  <div className="text-sm text-[#94A3B8]">{openProject?.details?.subtitle || ''}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(openProject?.details?.badges || []).map(b => (
                      <span key={b} className="text-xs px-2 py-1 rounded-full bg-white/6 text-white">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <button onClick={closeDetails} aria-label="Close" className="p-2 rounded-md hover:bg-white/6 transition">
                    <svg className="w-5 h-5 text-[#cbd5e1]" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="text-gray-300">
                  <div className="text-sm text-indigo-300 font-medium mb-2">{openProject?.details?.highlight}</div>
                  <p className="leading-relaxed">{openProject?.details?.overview}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Features</h3>
                  <ul className="grid md:grid-cols-2 gap-2 list-disc list-inside text-gray-300">
                    {(openProject?.details?.features || []).map(f => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Role & Contribution</h3>
                  <ul className="list-inside list-disc text-gray-300">
                    {(openProject?.details?.role || []).map(r => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {(openProject?.details?.tech || []).map(t => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/6 text-white">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {(openProject?.details?.links || []).map(link => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:shadow-lg transition">{link.label}</a>
                    ))}
                  </div>
                </div>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
