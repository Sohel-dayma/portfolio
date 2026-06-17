'use client'
import { useState, useEffect, useRef } from 'react'

const filters  = ['all','branding','design','fullstack','mobile']

const projects = [
  {
    title: 'Online ticket booking platform',
    desc:  'Online platform for booking concert, sports, movie, and event tickets worldwide.',
    cat:   'design',
    tags:  ['Next.js','Node.js','MongoDB','Tailwind'],
    image: '/project1.png',
    bg:    'from-[#0a1a35] to-[#060e1c]',
    color: '#00d4ff',
    link:  'https://www.ticketmaster.com',
  },
  {
    title: 'E-Commerce Platform',
    desc:  'E-commerce platform for furniture, home decor, and interior products.',
    cat:   'fullstack',
    tags:  ['Next.js','TypeScript','PostgreSQL'],
    image: '/project2.jpg',
    bg:    'from-[#1a0d2e] to-[#0d0618]',
    color: '#a855f7',
    link:  'https://www.wayfair.com',
  },
  {
    title: 'Travel booking website',
    desc:  'Travel booking platform for flights, hotels, trains, and vacation packages.',
    cat:   'branding',
    tags:  ['Figma','React js','TypeScript','Node.js'],
    image: '/project3.png',
    bg:    'from-[#1a0a0a] to-[#0d0505]',
    color: '#f97316',
    link:  'https://www.trip.com',
  },
  {
    title: 'Retail shopping platform',
    desc:  'Retail shopping platform selling electronics, fashion, groceries, and daily essentials.',
    cat:   'mobile',
    tags:  ['Next js','Typescript','Node js','AI'],
    image: '/project4.jpg',
    bg:    'from-[#0a1a0d] to-[#060e08]',
    color: '#22c55e',
    link:  'https://www.target.com',
  },
  {
    title: 'Telecommunication platform Website',
    desc:  'Telecommunication platform providing mobile, internet, and fiber services.',
    cat:   'fullstack',
    tags:  ['Next.js','PostgreSQL','Redis'],
    image: '/project5.png',
    bg:    'from-[#1a1208] to-[#0d0b04]',
    color: '#eab308',
    link:  'https://www.att.com',
  },
  {
    title: 'Notification managing platform',
    desc:  'Developer platform for managing email, SMS, push, and in-app notifications.',
    cat:   'branding',
    tags:  ['Figma','Next.js','MongoDB','Typescript'],
    image: '/project6.jpg',
    bg:    'from-[#0a1520] to-[#060c14]',
    color: '#38bdf8',
    link:  'https://www.novu.co',
  },
]

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [active])

  const visible = active === 'all' ? projects : projects.filter(p => p.cat === active)

  return (
    <section id="portfolio" ref={ref} className="py-20 px-6 md:px-14 bg-bg">
      <div className="text-center mb-10 fade-up">
        <p className="section-label">Latest Portfolio</p>
        <h2 className="section-title">Transforming Ideas into Exceptional</h2>
        <p className="text-muted max-w-xl mx-auto leading-relaxed text-sm">
          A curated collection of projects — from brand identities and UI/UX design to full-stack web apps and mobile experiences.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-10 fade-up">
        {filters.map(f => (
          <button key={f} onClick={() => setActive(f)}
            className={`px-5 py-2 rounded-full text-sm border transition-all duration-300 capitalize font-medium
              ${active === f ? 'bg-cyan border-cyan text-bg font-semibold' : 'bg-transparent border-border text-muted hover:border-cyan hover:text-cyan'}`}>
            {f === 'fullstack' ? 'Full Stack' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {visible.map((p, i) => (
          <div key={p.title}
            className="card overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] fade-up"
            style={{ transitionDelay: `${i * 0.08}s` }}>

            {/* Image / Preview area */}
            <div className="h-64 relative overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="project-image w-full"
              />
              {/* color accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              {/* hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                   style={{ background: `${p.color}18` }}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full text-sm font-bold text-bg transition-transform duration-200 hover:scale-105 z-10"
                  style={{ background: p.color }}
                >
                View Project →
                </a>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="font-head text-base font-semibold mb-2">{p.title}</h3>
              <p className="text-muted text-xs leading-relaxed mb-3">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full border"
                        style={{ color: p.color, borderColor: `${p.color}30`, background: `${p.color}0d` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
