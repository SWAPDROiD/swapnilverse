import React from 'react'
import { FaLinkedin, FaGithub, FaStackOverflow, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'
import { LINKEDIN, GITHUB, STACKOVERFLOW, INSTAGRAM, FACEBOOK, YOUTUBE } from '../constants/links'

export default function Footer(){
  return (
    <footer className="mt-20 py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-[#94A3B8]">© {new Date().getFullYear()} Swapnil Nandapure </div>
        <div className="flex items-center gap-3">
          {/** Social icons with consistent styling and platform color on hover */}
          <a title="LinkedIn" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="linkedin" className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#C7D2FE] hover:scale-110 transition-all duration-300 hover:text-blue-500">
            <FaLinkedin />
          </a>

          <a title="GitHub" href={GITHUB} target="_blank" rel="noreferrer" aria-label="github" className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#C7D2FE] hover:scale-110 transition-all duration-300 hover:text-purple-400">
            <FaGithub />
          </a>

          <a title="StackOverflow" href={STACKOVERFLOW} target="_blank" rel="noreferrer" aria-label="stackoverflow" className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#C7D2FE] hover:scale-110 transition-all duration-300 hover:text-orange-500">
            <FaStackOverflow />
          </a>

          <a title="Instagram" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="instagram" className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#C7D2FE] hover:scale-110 transition-all duration-300 hover:text-pink-500">
            <FaInstagram />
          </a>

          <a title="Facebook" href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="facebook" className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#C7D2FE] hover:scale-110 transition-all duration-300 hover:text-blue-600">
            <FaFacebook />
          </a>

          <a title="YouTube" href={YOUTUBE} target="_blank" rel="noreferrer" aria-label="youtube" className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#C7D2FE] hover:scale-110 transition-all duration-300 hover:text-red-500">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  )
}
