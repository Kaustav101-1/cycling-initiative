import { useNavigate } from 'react-router-dom'
import api from '../api/client'

const CAMPUSES = [
  {
    id: 'iim-calcutta',
    name: 'IIM Calcutta',
    tag: 'Management • Kolkata',
    border: 'border-blue-200 hover:border-blue-400',
    dot: 'bg-blue-600',
  },
  {
    id: 'nit-rourkela',
    name: 'NIT Rourkela',
    tag: 'Engineering • Odisha',
    border: 'border-emerald-200 hover:border-emerald-400',
    dot: 'bg-emerald-600',
  },
  {
    id: 'bit-mesra',
    name: 'BIT Mesra',
    tag: 'Engineering • Jharkhand',
    border: 'border-purple-200 hover:border-purple-400',
    dot: 'bg-purple-600',
  },
  {
    id: 'bit-sindri',
    name: 'BIT Sindri',
    tag: 'Engineering • Jharkhand',
    border: 'border-orange-200 hover:border-orange-400',
    dot: 'bg-orange-500',
  },
]

const VISION_STATS = [
  { value: '100+',    label: 'Campuses Connected',  bg: '#f0f4ec', border: '#c8d9b8', text: '#487531' },
  { value: '25,000+', label: 'Students Empowered',   bg: '#f0f2f4', border: '#c0cbdc', text: '#2c4a6e' },
  { value: '10+',     label: 'States Across India',  bg: '#f5f0f8', border: '#d5c0e0', text: '#6b3fa0' },
  { value: 'Zero',    label: 'Carbon Emissions',     bg: '#f4f1ec', border: '#ddd0b8', text: '#8B6914' },
]

const WHY_FEATURES = [
  { icon: '⏱️', title: 'Save Time',             desc: 'Reach classes, hostels, and hotspots faster than walking — every single day.' },
  { icon: '🌱', title: 'Zero Emissions',         desc: 'Electric-powered. No fuel. No pollution. Just clean, green campus transit.' },
  { icon: '💰', title: 'Student-Affordable',     desc: 'Priced from the ground up for students, not corporates.' },
  { icon: '📱', title: 'Scan & Ride',            desc: 'Unlock with your phone in seconds. Park anywhere on campus.' },
  { icon: '🔋', title: 'Pedal-Assist Electric',  desc: 'E-cycles that make even the longest campus distances feel effortless.' },
  { icon: '🛡️', title: 'Safe & Maintained',     desc: 'GPS-tracked fleet with regular servicing and campus-wide coverage.' },
]

const STARTING_CAMPUSES = ['IIM Calcutta', 'BIT Mesra', 'BIT Sindri', 'NIT Rourkela']

export default function Home() {
  const navigate = useNavigate()

  const handleCampusClick = async (campusId) => {
    try {
      await api.post('/api/campus/view', { campus: campusId })
    } catch {
      // non-blocking
    }
    navigate(`/campus/${campusId}`)
  }

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F5F2' }}>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(246,245,242,0.95)', borderColor: '#d0cfc8' }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-4">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="PedalUp" className="h-28 w-auto object-contain" />
          </div>
          <div className="hidden md:flex items-center gap-10 text-base font-bold" style={{ color: '#487531' }}>
            <button onClick={() => scrollTo('why')}      className="hover:opacity-70 transition-opacity">Why E-Cycles</button>
            <button onClick={() => scrollTo('vision')}   className="hover:opacity-70 transition-opacity">Our Vision</button>
            <button onClick={() => scrollTo('campuses')} className="hover:opacity-70 transition-opacity">Campuses</button>
          </div>
          <button
            onClick={() => scrollTo('campuses')}
            className="text-white text-base font-bold px-7 py-3 rounded-full transition-all shadow-sm hover:opacity-90"
            style={{ backgroundColor: '#487531' }}
          >
            Early Access →
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-20 text-center">
        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full mb-10 uppercase tracking-wider"
          style={{ backgroundColor: '#e8f0df', border: '1px solid #c8d9b8', color: '#487531' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ backgroundColor: '#8FB135' }} />
          Now Launching · Early Bird Phase
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6" style={{ color: '#1D3215' }}>
          Smart Mobility<br />
          <span style={{ color: '#487531' }}>for Every Campus.</span>
        </h1>
        <p className="text-xl font-normal max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#8F8E7F' }}>
          Sustainable, electric, and affordable e-cycle mobility — built
          for the 25,000+ students who walk too far, every single day.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <button
            onClick={() => scrollTo('campuses')}
            className="text-white font-bold px-9 py-4 rounded-2xl shadow-lg transition-all duration-200 text-base hover:opacity-90 hover:-translate-y-0.5"
            style={{ backgroundColor: '#487531' }}
          >
            Get Early Access
          </button>
          <button
            onClick={() => scrollTo('vision')}
            className="font-semibold px-9 py-4 rounded-2xl transition-all duration-200 text-base border-2"
            style={{ color: '#487531', borderColor: '#c8d9b8', backgroundColor: 'white' }}
          >
            Our Vision →
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-14" style={{ borderTop: '1px solid #d0cfc8' }}>
          {[
            { value: '100+',    label: 'Campuses Targeted' },
            { value: '25,000+', label: 'Students to Empower' },
            { value: '10+',     label: 'States Across India' },
            { value: 'Zero',    label: 'Carbon Emissions' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black tracking-tight" style={{ color: '#1D3215' }}>{s.value}</div>
              <div className="text-sm mt-2 uppercase tracking-wider font-semibold" style={{ color: '#8F8E7F' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Collage Photo ── */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl shadow-2xl" style={{ maxHeight: '520px' }}>
            <img
              src="/images/ecycles/mainpage.jpeg"
              alt="PedalUp e-cycles on campus"
              className="w-full object-cover"
              style={{ maxHeight: '520px', objectPosition: 'center' }}
            />
          </div>
        </div>
      </section>

      {/* ── Video ── */}
      <section className="py-16 px-6" style={{ backgroundColor: '#1D3215' }}>
        <div className="max-w-4xl mx-auto">
          <video
            src="/videos/ecycle.mp4"
            controls
            playsInline
            className="w-full rounded-3xl shadow-2xl"
            style={{ maxHeight: '520px', objectFit: 'cover', ring: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
      </section>

      {/* ── Our Vision ── */}
      <section id="vision" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#8FB135' }}>Our Vision</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6" style={{ color: '#1D3215' }}>
                Connecting campuses,<br />empowering students.
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#8F8E7F' }}>
                India's first sustainable smart campus mobility network.
                We're building an affordable, zero-emission transportation
                layer for every residential campus across the country.
              </p>
              <div className="mb-3">
                <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#8F8E7F' }}>Starting With</p>
                <div className="flex flex-wrap gap-2">
                  {STARTING_CAMPUSES.map((c) => (
                    <span
                      key={c}
                      className="text-sm font-semibold px-4 py-2 rounded-full"
                      style={{ backgroundColor: '#e8f0df', border: '1px solid #c8d9b8', color: '#487531' }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm mt-4 font-medium" style={{ color: '#8F8E7F' }}>Pilot campuses · Many more coming soon</p>
            </div>

            {/* Right: stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {VISION_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-7"
                  style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
                >
                  <div className="text-3xl font-black mb-1 tracking-tight" style={{ color: s.text }}>{s.value}</div>
                  <div className="text-sm font-medium leading-snug" style={{ color: '#8F8E7F' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why PedalUp ── */}
      <section id="why" className="py-24 px-6" style={{ backgroundColor: '#F6F5F2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#8FB135' }}>Why PedalUp</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: '#1D3215' }}>Built for campus life.</h2>
            <p className="mt-3 max-w-lg mx-auto text-lg" style={{ color: '#8F8E7F' }}>Everything a student needs. Nothing they don't.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {WHY_FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid #d8d5cc', boxShadow: '0 1px 4px rgba(29,50,21,0.06)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(29,50,21,0.12)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(29,50,21,0.06)'}
              >
                <div className="text-3xl mb-5">{f.icon}</div>
                <div className="font-bold text-base mb-2" style={{ color: '#1D3215' }}>{f.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: '#8F8E7F' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 text-white" style={{ backgroundColor: '#1D3215' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#8FB135' }}>Early Feedback</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">What people are saying.</h2>
          </div>

          {/* Column labels */}
          <div className="grid md:grid-cols-2 gap-5 mb-4 px-1">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#8FB135' }}>🎓 What Students Say</p>
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#8FB135' }}>👨‍🏫 What Professors Say</p>
          </div>

          {/* Symmetric 2×2 grid */}
          <div className="grid md:grid-cols-2 gap-5" style={{ gridAutoRows: '1fr' }}>

            {/* S1 */}
            <div className="rounded-2xl p-8 flex flex-col transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-base leading-relaxed flex-1 mb-6" style={{ color: '#d4e8c8' }}>
                "PedalUp is a great initiative for large residential campuses where students travel long distances every day. I would definitely like to see this on our campus."
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white" style={{ backgroundColor: '#487531' }}>S</div>
                <div>
                  <div className="font-semibold text-white text-sm">Student</div>
                  <div className="text-xs" style={{ color: '#8F8E7F' }}>MBA Campus</div>
                </div>
              </div>
            </div>

            {/* P1 */}
            <div className="rounded-2xl p-8 flex flex-col transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-base leading-relaxed flex-1 mb-6" style={{ color: '#d4e8c8' }}>
                "PedalUp is an innovative and sustainable initiative that can significantly improve mobility within educational campuses."
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white" style={{ backgroundColor: '#8FB135' }}>P</div>
                <div>
                  <div className="font-semibold text-white text-sm">Professor</div>
                  <div className="text-xs" style={{ color: '#8F8E7F' }}>Faculty Member</div>
                </div>
              </div>
            </div>

            {/* S2 */}
            <div className="rounded-2xl p-8 flex flex-col transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-base leading-relaxed flex-1 mb-6" style={{ color: '#d4e8c8' }}>
                "Most of us are always rushing between hostels, classes, labs, and club activities. Faster campus mobility would make daily life much easier."
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white" style={{ backgroundColor: '#487531' }}>S</div>
                <div>
                  <div className="font-semibold text-white text-sm">Student</div>
                  <div className="text-xs" style={{ color: '#8F8E7F' }}>Engineering Campus</div>
                </div>
              </div>
            </div>

            {/* P2 */}
            <div className="rounded-2xl p-8 flex flex-col transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-base leading-relaxed flex-1 mb-6" style={{ color: '#d4e8c8' }}>
                "Smart mobility solutions like PedalUp align well with the vision of future-ready and environmentally conscious campuses."
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white" style={{ backgroundColor: '#8F8E7F' }}>F</div>
                <div>
                  <div className="font-semibold text-white text-sm">Faculty Member</div>
                  <div className="text-xs" style={{ color: '#8F8E7F' }}>Senior Academic</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Pilot Campuses ── */}
      <section id="campuses" className="py-24 px-6" style={{ backgroundColor: '#F6F5F2' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#8FB135' }}>Pilot Campuses</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3" style={{ color: '#1D3215' }}>
            Is PedalUp on your campus?
          </h2>
          <p className="mb-14 text-lg" style={{ color: '#8F8E7F' }}>
            Select your campus, learn more, and get early access.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {CAMPUSES.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCampusClick(c.id)}
                className={`group flex items-center justify-between border-2 ${c.border} bg-white text-left px-6 py-5 rounded-2xl transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5`}
              >
                <div>
                  <div className="font-bold text-base" style={{ color: '#1D3215' }}>{c.name}</div>
                  <div className="text-sm mt-1 font-medium" style={{ color: '#8F8E7F' }}>{c.tag}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                  <span className="text-gray-300 group-hover:text-gray-600 transition-colors font-semibold text-lg">→</span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-base mt-8 font-semibold" style={{ color: '#8F8E7F' }}>More campuses joining soon · Stay tuned&nbsp;·&nbsp;·&nbsp;·</p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 px-6 text-white text-center" style={{ backgroundColor: '#1D3215' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#8FB135' }}>Limited Early Bird Spots</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
            Ready to ride<br />smarter?
          </h2>
          <p className="text-lg mb-12 max-w-xl mx-auto leading-relaxed" style={{ color: '#8F8E7F' }}>
            Help us build the future of sustainable campus mobility in India.
            Secure your early bird spot today.
          </p>
          <button
            onClick={() => scrollTo('campuses')}
            className="text-white font-bold px-12 py-5 rounded-2xl shadow-2xl transition-all duration-200 text-lg hover:-translate-y-1 hover:opacity-90"
            style={{ backgroundColor: '#487531' }}
          >
            Get Early Access
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t text-center py-8 text-sm" style={{ backgroundColor: '#1D3215', borderColor: '#2d5020' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/images/logo.png" alt="PedalUp" className="h-8 w-auto object-contain opacity-70" />
        </div>
        <p style={{ color: '#8F8E7F' }}>Smart Campus Mobility &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
