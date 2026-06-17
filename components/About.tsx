'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){(e.target as HTMLElement).classList.add('visible');obs.unobserve(e.target)} })
    },{threshold:.1})
    ref.current?.querySelectorAll('.fade-up').forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[])
  const go=()=>{
    const el=document.getElementById('contact');if(!el)return
    const navH=document.getElementById('navbar')?.offsetHeight??70
    window.scrollTo({top:el.offsetTop-navH-8,behavior:'smooth'})
  }
  return (
    <section id="about" ref={ref} className="py-20 px-6 md:px-14 bg-bg">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="relative fade-up">
          <div className="w-full h-[480px] relative rounded-3xl bg-gradient-to-br from-card to-[#0a1a2e] border border-border overflow-hidden flex items-center justify-center text-8xl text-cyan">
            <Image 
            src="/portimage.png"   // public folder me image rakho
            alt="user"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className='object-cover object-top'
          />
          </div>
          <div className="absolute bottom-7 right-7 bg-cyan text-bg rounded-2xl px-5 py-3 text-center">
            <span className="font-head text-2xl font-extrabold block leading-none">5+</span>
            <small className="text-xs font-bold">Years Exp.</small>
          </div>
        </div>
        <div className="fade-up">
          <p className="section-label">About Me</p>
          <h2 className="section-title">Boost Business Strategic Solutions with Us</h2>
          <p className="text-muted leading-relaxed mb-7">Business consulting professionals provide expert advice and guidance to help businesses improve their performance, efficiency, and organizational effectiveness.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[{icon:'fa-pencil-alt',title:'Business',desc:'Each one showcases my approach and dedication to results.'},{icon:'fa-bullhorn',title:'Partners',desc:'Business consulting to provide expert guidance and growth.'}].map((f,i)=>(
              <div key={i} className="card p-5 hover:border-cyan/30">
                <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan mb-3"><i className={`fas ${f.icon}`}></i></div>
                <h4 className="font-head text-sm font-bold mb-1.5">{f.title}</h4>
                <p className="text-muted text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <button onClick={go} className="btn-outline">Read More About Me <i className="fas fa-arrow-down"></i></button>
        </div>
      </div>
    </section>
  )
}
