'use client'
import { useState, useEffect } from 'react'

const links = [
  { label: 'Home',      href: '#home' },
  { label: 'Services',  href: '#services' },
  { label: 'About',     href: '#about' },
  { label: 'Resume',    href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact',   href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('home')
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const ids = ['home','services','about','skills','portfolio','contact']
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 90) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.getElementById(href.replace('#',''))
    if (!el) return
    const navH = document.getElementById('navbar')?.offsetHeight ?? 70
    window.scrollTo({ top: el.offsetTop - navH - 8, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <nav id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 border-b border-border transition-all duration-300
          ${scrolled ? 'py-3 bg-bg/90 backdrop-blur-xl' : 'py-5 bg-transparent'}`}>
        <a href="#home" onClick={e=>go(e,'#home')} className="font-head text-2xl font-extrabold">
          Vir<span className="text-cyan">Tuo</span>
        </a>
        <ul className="hidden md:flex gap-8 list-none">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={e=>go(e,l.href)}
                className={`text-sm font-medium relative pb-1 transition-colors duration-200
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-cyan after:transition-all after:duration-300
                  ${active===l.href.replace('#','') ? 'text-cyan after:w-full' : 'text-muted hover:text-cyan after:w-0 hover:after:w-full'}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex gap-4">
          {['instagram','linkedin-in','twitter','github'].map(icon => (
            <a key={icon} href="#" className="text-muted hover:text-cyan transition-colors hover:-translate-y-0.5 inline-block">
              <i className={`fab fa-${icon}`}></i>
            </a>
          ))}
        </div>
        <button className="md:hidden flex flex-col gap-1.5" onClick={()=>setOpen(!open)}>
          <span className={`block w-6 h-0.5 bg-white transition-all ${open?'rotate-45 translate-y-2':''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${open?'opacity-0':''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${open?'-rotate-45 -translate-y-2':''}`}></span>
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={e=>go(e,l.href)}
               className="font-head text-3xl font-bold hover:text-cyan transition-colors">{l.label}</a>
          ))}
        </div>
      )}
    </>
  )
}
