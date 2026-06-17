'use client'
export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border px-6 md:px-14 py-8 flex flex-wrap items-center justify-between gap-5">
      <div>
        <span className="font-head text-xl font-extrabold">Vir<span className="text-cyan">Tuo</span></span>
        <p className="text-muted text-xs mt-1.5">© 2026 VirTuo. All rights reserved.</p>
      </div>
      <p className="text-muted text-sm">Designed with ❤️ by <span className="text-cyan">Sohel dayma</span></p>
      <div className="flex gap-3">
        {['instagram','linkedin-in','twitter','github'].map(icon=>(
          <a key={icon} href="#" className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted hover:bg-cyan/10 hover:border-cyan hover:text-cyan transition-all text-sm">
            <i className={`fab fa-${icon}`}></i>
          </a>
        ))}
      </div>
    </footer>
  )
}
