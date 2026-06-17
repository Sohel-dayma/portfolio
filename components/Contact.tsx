'use client'
import { useState, useEffect, useRef } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [form, setForm]     = useState({ name:'', phone:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const sendEmail = async () => {
    if (!form.name.trim())    { setErrMsg('Name required!');    return }
    if (!form.email.trim())   { setErrMsg('Email required!');   return }
    if (!form.message.trim()) { setErrMsg('Message required!'); return }
    setErrMsg('')
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setForm({ name:'', phone:'', email:'', subject:'', message:'' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setErrMsg('Email send nahi hua. Dobara try karein.')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inp = `w-full bg-card border border-border rounded-xl px-4 py-3.5 text-white text-sm placeholder-muted outline-none focus:border-cyan transition-colors font-body`

  return (
    <section id="contact" ref={ref} className="py-20 px-6 md:px-14 bg-bg2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* Left */}
        <div className="fade-up">
          <p className="section-label">Get In Touch</p>
          <h2 className="font-head text-3xl md:text-4xl font-bold leading-tight mb-6">
            Get Ready To<br />Create Great
          </h2>
          <div className="flex flex-col gap-5 mb-8">
            {[
              { icon:'fa-envelope',       label:'E-mail',   val:'soheldayma1@gmail.com' },
              { icon:'fa-map-marker-alt', label:'Location', val:'Rajpipla Gujarat' },
              { icon:'fa-phone',          label:'Contact',  val:'+917567032402' },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0">
                  <i className={`fas ${c.icon}`}></i>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider">{c.label}</div>
                  <div className="text-sm mt-0.5">{c.val}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {['instagram','linkedin-in','twitter','github'].map(icon => (
              <a key={icon} href="#" className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted hover:bg-cyan/10 hover:border-cyan hover:text-cyan transition-all">
                <i className={`fab fa-${icon} text-sm`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="fade-up">
          <p className="section-label">Send Message</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-muted mb-2">Your Name *</label>
              <input className={inp} placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            </div>
            <div>
              <label className="block text-xs text-muted mb-2">Phone Number</label>
              <input className={inp} placeholder="+91 91111111111" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-muted mb-2">Your Email *</label>
              <input className={inp} placeholder="email@example.com" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            </div>
            <div>
              <label className="block text-xs text-muted mb-2">Subject</label>
              <input className={inp} placeholder="Project Discussion" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs text-muted mb-2">Your Message *</label>
            <textarea className={`${inp} resize-y min-h-[140px]`} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
          </div>

          {errMsg && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> {errMsg}
            </div>
          )}

          <button onClick={sendEmail} disabled={status==='sending'}
            className={`w-full py-4 rounded-xl font-head font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60
              ${status==='success' ? 'bg-green-500 text-white cursor-default' :
                status==='error'   ? 'bg-red-500/80 text-white' :
                status==='sending' ? 'bg-cyan/70 text-bg cursor-not-allowed' :
                'bg-cyan text-bg hover:opacity-85 hover:-translate-y-0.5'}`}>
            {status==='sending' && <><i className="fas fa-spinner fa-spin"></i> Sending...</>}
            {status==='success' && <><i className="fas fa-check-circle"></i> Message Sent Successfully! 🎉</>}
            {status==='error'   && <><i className="fas fa-times-circle"></i> Failed — Try Again</>}
            {status==='idle'    && <><i className="fas fa-paper-plane"></i> Send Message</>}
          </button>
        </div>

      </div>
    </section>
  )
}
