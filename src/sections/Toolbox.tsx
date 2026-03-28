import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import toolsImg from '../assets/tools.png'

const section: Variants = { hidden:{opacity:0,y:10}, show:{opacity:1,y:0} }

const Toolbox: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    const onKey = (e: KeyboardEvent) => { if(e.key === 'Escape') setOpen(false) }
    if(open){
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    }else{
      document.body.style.overflow = ''
    }
    return ()=>{ window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  },[open])

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <section id="toolbox" className="py-20">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute left-[-10%] top-0 w-72 h-72 bg-gradient-to-br from-purple-700 via-indigo-800 to-pink-600 opacity-8 rounded-full blur-3xl" />
        <div className="absolute right-[-10%] bottom-0 w-96 h-96 bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 opacity-6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="grid md:grid-cols-2 gap-8 items-center" initial="hidden" whileInView="show" viewport={{once:true}} variants={section}>

          {/* LEFT - content */}
          <motion.div className="space-y-6" variants={{hidden:{opacity:0,y:8}, show:{opacity:1,y:0, transition:{staggerChildren:0.08}}}}>
            <motion.h2 className="text-3xl font-bold text-white">Curious to checkout my toolbox?</motion.h2>
            <motion.p className="text-[#cbd5e1]">I maintain an up-to-date 'uses' page that lists all the things I use.</motion.p>

            <motion.div>
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full cursor-pointer relative text-sm font-medium"
                style={{
                  background: 'linear-gradient(90deg, rgba(99,102,241,0.06), rgba(124,58,237,0.06))',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-semibold">View my toolbox</span>
                <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT - image */}
          <motion.div className="flex justify-center md:justify-end" variants={{hidden:{opacity:0,x:30}, show:{opacity:1,x:0}}}>
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                boxShadow: '0 20px 50px rgba(99,102,241,0.18), 0 10px 40px rgba(124,58,237,0.12), 0 0 80px rgba(236,72,153,0.08)'
              }}
            >
              <img src={toolsImg} alt="tools" className="w-full max-w-sm rounded-2xl block" />
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                boxShadow: '0 20px 50px rgba(99,102,241,0.18), 0 10px 40px rgba(124,58,237,0.12), 0 0 80px rgba(236,72,153,0.08)',
                border: '1px solid rgba(124,58,237,0.20)'
              }} />
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{background:'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))'}} />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* Modal - simple toolbox content */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            ref={overlayRef}
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
              if (e.target === e.currentTarget) closeModal()
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div className="relative z-10 w-[92%] max-w-3xl mx-auto glass border border-white/6 rounded-2xl shadow-2xl overflow-hidden" initial={{scale:0.98, y:8}} animate={{scale:1, y:0}} exit={{scale:0.98, y:8}} transition={{duration:0.18}}>
              <div className="flex items-center justify-between p-5 border-b border-white/6">
                <div>
                  <h1 className="text-xl font-semibold text-white">What are my weapons?</h1>
                  <div className="text-sm text-[#94A3B8]">A curated list of tools, editors, and resources I use daily.</div>
                </div>
                <button onClick={closeModal} aria-label="Close" className="p-2 rounded-md hover:scale-105 transition-all duration-150">
                  <svg className="w-5 h-5 text-[#cbd5e1]" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-6 text-gray-300">
                  <h1 className="text-3xl font-bold text-white mb-4">What are my weapons?</h1>

                  <p className="text-gray-400 leading-relaxed">I love discovering new tools and resources that can power my productivity. Here's a peek into the tools and technologies that I use and recommend. If you know a pro tip, I'm all ears!</p>

                  <h2 className="text-xl font-semibold text-purple-400 mt-6 mb-2">Tech</h2>
                  <ul className="space-y-3 list-disc list-inside text-gray-300">
                    <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">React</a>: It is more than a library, an architecture, or even an ecosystem. React is a community!</li>
                    <li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">TypeScript</a>: Javascript on steroids! I love seeing <code className="bg-gray-800 px-1 py-0.5 rounded text-sm text-purple-300">.ts</code> files over <code className="bg-gray-800 px-1 py-0.5 rounded text-sm text-purple-300">.js</code></li>
                    <li><a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">NextJs</a>: I've been playing around with NextJS 13 lately. So far, enjoying the framework. This site is built with NextJS.</li>
                    <li><a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Jest</a>: My default JavaScript Testing Framework.</li>
                    <li><a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">React Testing Library</a>: A library that encourages better testing practices.</li>
                    <li><a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Cypress.io</a>: Cypress is a great tool for E2E testing. Bummed that it still doesn't have <a href="https://docs.cypress.io/api/commands/type#Typing-tab-key-does-not-work" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">TAB support</a> for accessibility testing.</li>
                    <li><a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Tailwind CSS</a>: Once you know the utility classes, it's the best way to write CSS.</li>
                    <li><a href="https://styled-components.com/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">styled-components</a>: The fact that you can write actual CSS in your JavaScript is awesome. I use this at my work.</li>
                    <li><a href="https://storybook.js.org/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Storybook</a>: Great tool for building UI components and pages in isolation.</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-purple-400 mt-6 mb-2">Editor</h2>
                  <p className="text-gray-400 leading-relaxed">If you are spending long hours looking at your editor, might as well have a good setup</p>
                  <ul className="space-y-3 list-disc list-inside text-gray-300">
                    <li><a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Visual Studio Code</a>: I switched to VSCode back in 2017 and have never looked back since then.</li>
                    <li><a href="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Night Owl editor theme</a>: I love this theme. It has been my default theme for a while now.</li>
                    <li><a href="https://philpl.gumroad.com/l/dank-mono" target="_blank" rel="noopener noreferrer" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Dank Mono font</a>: The coding typeface for aesthetes.</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-purple-400 mt-6 mb-2">Productivity Tools</h2>
                  <p className="text-gray-400 leading-relaxed">These are some of the desktop apps and Chrome extensions that I use daily.</p>
                  <ul className="space-y-3 list-disc list-inside text-gray-300">
                    <li>Alfred App</li>
                    <li>Rectangle</li>
                    <li>Notion</li>
                    <li>Annotate</li>
                    <li>Dark Reader</li>
                    <li>SuperDev Pro</li>
                    <li>RunJS</li>
                    <li>axe DevTools</li>
                    <li>uBlock Origin</li>
                    <li>Calendy</li>
                    <li>React Developer Tools</li>
                    <li>GitHub Desktop</li>
                    <li>VisBug</li>
                    <li>ChatGPT</li>
                    <li>Copilot</li>
                    <li>Claude AI</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-purple-400 mt-6 mb-2">Podcasts and books</h2>
                  <ul className="space-y-3 list-disc list-inside text-gray-300">
                    <li><a href="https://open.spotify.com/show/1KBO1tSnm0XRlEILmqt7Em?si=f6b3a7f7f72a46ac" target="_blank" rel="noopener noreferrer" aria-label="Ladybug Podcast" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Ladybug Podcast</a>: I recently discovered this podcast. Four seasoned software developers working in different sectors share their experiences and advice on different topics related to software engineering. It's great, check it out!</li>
                    <li><a href="https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk" target="_blank" rel="noopener noreferrer" aria-label="The Joe Rogan Experience" className="text-pink-400 underline hover:text-purple-400 transition duration-300">The Joe Rogan Experience</a>: I'm a big Joe Rogan fan. I love the different perspectives that he brings to the table. From comedians to scientists, he has a wide range of guests on his show.</li>
                    <li><a href="https://open.spotify.com/show/6czfajqqSfPYD7bKZaFUNg" target="_blank" rel="noopener noreferrer" aria-label="The Call Kent Podcast" className="text-pink-400 underline hover:text-purple-400 transition duration-300">The Call Kent Podcast</a>: I love listening to Kent's podcast. He answers questions from his listeners and shares his thoughts on different topics related to software engineering.</li>
                    <li><a href="https://open.spotify.com/show/7gZkflCpck1rTixj8M7yHt" target="_blank" rel="noopener noreferrer" aria-label="Deep Dive with Ali Abdaal" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Deep Dive with Ali Abdaal</a>: This podcast delves into the minds of entrepreneurs, creators, and other inspiring people to uncover the philosophies, strategies, and tools that help us live happier, healthier, and more productive lives.</li>
                    <li><a href="https://open.spotify.com/show/0HfSakJOFwFEa0ujCEK1pO" target="_blank" rel="noopener noreferrer" aria-label="React Podcast" className="text-pink-400 underline hover:text-purple-400 transition duration-300">React Podcast</a>: I got to know about many people in React/JS community through this podcast.</li>
                    <li><a href="https://www.refactoringui.com/" target="_blank" rel="noopener noreferrer" aria-label="Refactoring UI" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Refactoring UI</a>: I have finished a few pages of the book and I loved it. I haven't had a chance to go through the rest of the book yet.</li>
                    <li><a href="https://epicreact.dev/learn" target="_blank" rel="noopener noreferrer" aria-label="Epic React" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Epic React</a>: This course provides comprehensive and in-depth learning resources for mastering React. It is designed to help developers enhance their React skills and become more proficient in building robust and scalable applications.</li>
                    <li><a href="https://maggieappleton.com/" target="_blank" rel="noopener noreferrer" aria-label="Maggie Appleton" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Maggie Appleton</a>: Maggie makes visual essays about programming and design using real-life metaphors through her illustrations. I love her work.</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-purple-400 mt-6 mb-2">Newsletters</h2>
                  <ul className="space-y-3 list-disc list-inside text-gray-300">
                    <li><a href="https://jamesclear.com/3-2-1" target="_blank" rel="noopener noreferrer" aria-label="The 3-2-1 Newsletter" className="text-pink-400 underline hover:text-purple-400 transition duration-300">The 3-2-1 Newsletter</a>: I love this newsletter by James Clear. It's a weekly newsletter that has 3 ideas from him, 2 quotes from others, and 1 question for you to ponder.</li>
                    <li><a href="https://www.densediscovery.com/archive/" target="_blank" rel="noopener noreferrer" aria-label="Dense Discovery" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Dense Discovery</a>: A weekly newsletter that provides a curated collection of useful apps, tools, websites, books, accessories, art and design projects, as well as thought-provoking things.</li>
                    <li><a href="https://aliabdaal.com/newsletter/" target="_blank" rel="noopener noreferrer" aria-label="Ali Abdaal" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Ali Abdaal</a>: Ali sends out a weekly newsletter with his thoughts on productivity, books, cool things he found on the internet, and a summary of his latest YouTube videos.</li>
                    <li><a href="https://kentcdodds.com/blog" target="_blank" rel="noopener noreferrer" aria-label="Kent C. Dodds" className="text-pink-400 underline hover:text-purple-400 transition duration-300">Kent C. Dodds</a>: Kent has really good blogs. Subscribing to his newsletter allows me to get notified when he publishes a new blog or goes through some of his classic blogs.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Toolbox
