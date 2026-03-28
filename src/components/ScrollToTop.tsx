import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTop: React.FC = () => {
  const [show,setShow] = useState<boolean>(false)
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

export default ScrollToTop
