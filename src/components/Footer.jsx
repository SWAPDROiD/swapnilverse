import React from 'react'
import SocialLinks from '../common/SocialLinks'

export default function Footer(){
  return (
    <footer className="mt-20 py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-[#94A3B8]">© {new Date().getFullYear()} Swapnil Nandapure </div>
        <SocialLinks size="md" variant="minimal" className="gap-0" />
      </div>
    </footer>
  )
}
