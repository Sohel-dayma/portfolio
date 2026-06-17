'use client'
import { useEffect, useRef } from 'react'

const services = [
  { icon:'fa-code',      title:'UI/UX Design',       desc:'Creating stunning interfaces that balance aesthetics with usability, ensuring every interaction feels intuitive and delightful.' },
  { icon:'fa-globe',     title:'Web Development',    desc:'Building robust, scalable web applications with modern technologies and clean code that performs flawlessly across all devices.' },
  { icon:'fa-print',     title:'Business Solutions', desc:'Business solutions encompass strategies, tools, and services designed to help companies improve efficiency, productivity, and profitability.' },
  { icon:'fa-handshake', title:'Profit Partners',    desc:'At Profit Partners, we believe in the power of collaboration to maximize revenue, streamline operations, and drive long-term success.' },
]

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){(e.target as HTMLElement).classList.add('visible');obs.unobserve(e.target)} })
    },{threshold:.1})
    ref.current?.querySelectorAll('.fade-up').forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[])

  return (
    <section id="services" ref={ref} className="py-20 px-6 md:px-14 bg-bg2">
      <div className="text-center mb-14 fade-up">
        <p className="section-label">What I Do</p>
        <h2 className="section-title">What I Provide For You</h2>
        <p className="text-muted max-w-xl mx-auto leading-relaxed">Each one showcases my approach and dedication to detail, creativity, and delivering results that exceed expectations.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {services.map((s,i)=>(
          <div key={i} className="card p-9 group hover:-translate-y-1.5 hover:border-cyan/30 hover:shadow-2xl relative overflow-hidden fade-up" style={{transitionDelay:`${i*.1}s`}}>
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
            <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan text-xl mb-6">
              <i className={`fas ${s.icon}`}></i>
            </div>
            <h3 className="font-head text-lg font-bold mb-3">{s.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
