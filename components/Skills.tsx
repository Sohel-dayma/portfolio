'use client'
import { useEffect, useRef } from 'react'

const bars  = [{label:'Full Stack Development',pct:92},{label:'Frontend Development',pct:88},{label:'Backend Development',pct:92},{label:'AWS',pct:85}]
const cards = [
  {emoji:'🖼️',title:'Framer',   desc:'The personal portfolio category includes websites — Your Journey, Your Story.'},
  {emoji:'🌊',title:'Webflow',   desc:'A powerful web design and development platform that allows you to build visually.'},
  {emoji:'🎨',title:'Figma',     desc:"Figma's standout feature is real-time collaboration, enabling multiple designers."},
  {emoji:'📝',title:'Cloud & Deployment', desc:"Deploying web applications for smooth performance and reliable access."},
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          ;(e.target as HTMLElement).classList.add('visible');obs.unobserve(e.target)
          ref.current?.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach(b=>{ if(b.dataset.w) b.style.width=b.dataset.w+'%' })
        }
      })
    },{threshold:.2})
    ref.current?.querySelectorAll('.fade-up').forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[])

  return (
    <section id="skills" ref={ref} className="py-20 px-6 md:px-14 bg-bg2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div className="fade-up">
          <p className="section-label">My Skill</p>
          <h2 className="section-title">My Expert Areas Where I Gained Skill</h2>
          <p className="text-muted leading-relaxed mb-8 text-sm">Business consulting consultants provide expert advice and guide businesses to help them improve their performance, efficiency, and organizational effectiveness.</p>

          {/* Skill Bars */}
          <div className="flex flex-col gap-5 mb-8">
            {bars.map(s=>(
              <div key={s.label}>
                <div className="flex justify-between mb-2"><span className="text-sm text-muted">{s.label}</span><strong className="text-cyan text-sm">{s.pct}%</strong></div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="skill-bar-fill h-full bg-gradient-to-r from-cyan2 to-cyan rounded-full" data-w={s.pct}/>
                </div>
              </div>
            ))}
          </div>

          {/* Download CV — lightweight, right side */}
          <div className="flex justify-end">
            <a href="/resume.pdf" download="Sohel_Dayma_Resume.pdf" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan/30 text-cyan text-xs font-medium hover:bg-cyan/10 hover:border-cyan transition-all duration-300 group">
              <i className="fas fa-arrow-down text-[10px] group-hover:translate-y-0.5 transition-transform duration-300"></i>
              Download CV
            </a>
          </div>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-2 gap-5">
          {cards.map((s,i)=>(
            <div key={i} className={`card p-6 text-center hover:-translate-y-1 hover:border-cyan/30 fade-up ${i%2===1?'mt-7':''}`} style={{transitionDelay:`${i*.1}s`}}>
              <div className="w-16 h-16 rounded-full bg-cyan/10 border-2 border-cyan/25 flex items-center justify-center text-2xl mx-auto mb-4">{s.emoji}</div>
              <h3 className="font-head text-base font-bold mb-2">{s.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}