'use client'
import { useEffect, useRef } from 'react'

const words = ['Full Stack Engineer','Frontend Engineer','Backend Engineer','Devops Engineer']

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = document.getElementById('stars')
    if (container) {
      for (let i = 0; i < 80; i++) {
        const s = document.createElement('div')
        s.className = 'star'
        const size = Math.random() * 2.5 + 0.5
        s.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--d:${2+Math.random()*4}s;animation-delay:${Math.random()*4}s`
        container.appendChild(s)
      }
    }
    let wi=0, ci=0, del=false
    let timer: ReturnType<typeof setTimeout>
    const type = () => {
      const el = typedRef.current; if (!el) return
      const w = words[wi]
      if (!del) { el.textContent = w.slice(0,++ci); if (ci===w.length){del=true;timer=setTimeout(type,1800);return} }
      else { el.textContent = w.slice(0,--ci); if (ci===0){del=false;wi=(wi+1)%words.length} }
      timer = setTimeout(type, del?60:110)
    }
    type()
    return () => clearTimeout(timer)
  }, [])

  const go = (id: string) => {
    const el = document.getElementById(id); if (!el) return
    const navH = document.getElementById('navbar')?.offsetHeight ?? 70
    window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden text-center px-5 pt-28 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
      <div id="stars" className="absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 px-5 py-2 rounded-full text-md text-cyan font-semibold tracking-wide mb-7">
          👋 My name is Sohel Dayma — Full Stack Engineer
        </div>
        <h1 className="font-head text-5xl md:text-6xl font-bold leading-tight mb-5">
          Professional<br /><span ref={typedRef} className="text-cyan typed-cursor"></span>
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-9">
          JavaScript, React, Next JS, Node JS, Express, MongoDB, AWS Cloud, Gen AI, Redis, Kafka, Docker, RabbitMQ, Git
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={()=>go('portfolio')} className="btn-primary"><i className="fas fa-eye"></i> View Portfolio</button>
          <button onClick={()=>go('contact')}   className="btn-outline"><i className="fas fa-envelope"></i> Hire Me</button>
        </div>
        <div className="flex flex-wrap gap-10 md:gap-16 justify-center mt-14">
          {[['5+','Years Experience'],['120+','Projects Done'],['80+','Happy Clients']].map(([n,l])=>(
            <div key={l} className="text-center">
              <h3 className="font-head text-3xl font-extrabold text-cyan">{n}</h3>
              <p className="text-xs text-muted mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
