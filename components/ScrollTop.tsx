'use client'
import { useEffect, useState } from 'react'
export default function ScrollTop() {
  const [show,setShow]=useState(false)
  useEffect(()=>{ const fn=()=>setShow(window.scrollY>300); window.addEventListener('scroll',fn); return ()=>window.removeEventListener('scroll',fn) },[])
  if(!show) return null
  return (
    <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
      className="fixed bottom-7 right-7 z-50 w-11 h-11 rounded-xl bg-cyan text-bg flex items-center justify-center hover:-translate-y-1 transition-transform shadow-lg">
      <i className="fas fa-arrow-up text-sm"></i>
    </button>
  )
}
