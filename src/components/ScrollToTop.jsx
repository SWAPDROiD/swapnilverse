import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTop(){
  const [show,setShow] = useState(false)
  useEffect(()=>{
    const onScroll = ()=> setShow(window.scrollY>600)
    window.addEventListener('scroll', onScroll)
    return ()=>window.removeEventListener('scroll', onScroll)
  },[])

  if(!show) return null
  return (
    <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="fixed right-6 bottom-6 bg-gradient-to-r from-primary to-accent p-3 rounded-full text-white shadow-lg">
      <FaArrowUp />
    </button>
  )
}
