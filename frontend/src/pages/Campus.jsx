import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/client'

const CAMPUSES = {
  'iim-calcutta': {
    name: 'IIM Calcutta',
    tagline: 'Smart mobility for one of India\'s premier B-schools.',
    description:
      'A lush residential campus known for its intense academic schedule, monsoon weather, and long movement routes between hostels and academic blocks. Students frequently commute across campus multiple times a day, making quick and convenient mobility highly valuable.',
    benefits: [
      'Faster hostel-to-classroom movement',
      'Reduced fatigue during humid summers',
      'Easier mobility during rains',
      'Better late-night campus connectivity'
    ],
    images: [
      '/images/iim-calcutta/photo4.jpg', // big hero — lush campus building
      '/images/iim-calcutta/photo1.jpg',
      '/images/iim-calcutta/photo2.jpg',
      '/images/iim-calcutta/photo3.jpg',
      '/images/iim-calcutta/photo5.jpg',
      '/images/iim-calcutta/photo6.jpg',
    ],
    header: 'from-blue-700 to-blue-900',
    btn: 'bg-blue-700 hover:bg-blue-800',
    accent: 'text-blue-700'
  },
  'nit-rourkela': {
    name: 'NIT Rourkela',
    tagline: 'Seamless mobility across a sprawling smart campus.',
    description:
      'A sprawling smart campus with extensive academic, residential, and recreational infrastructure spread over a large area. Students often travel long internal distances daily for classes, labs, sports, clubs, and campus events.',
    benefits: [
      'Seamless movement across campus zones',
      'Faster access to academic and recreational areas',
      'Reduced commuting fatigue',
      'Sustainable transportation for daily campus life'
    ],
    images: [
      '/images/nit-rourkela/photo1.jpg',
      '/images/nit-rourkela/photo2.jpg',
      '/images/nit-rourkela/photo3.jpg',
      '/images/nit-rourkela/photo4.jpg',
      '/images/nit-rourkela/photo5.jpg',
      '/images/nit-rourkela/photo6.jpg',
    ],
    header: 'from-emerald-600 to-emerald-800',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
    accent: 'text-emerald-700'
  },
  'bit-mesra': {
    name: 'BIT Mesra',
    tagline: 'Effortless connectivity across one of India\'s largest campuses.',
    description:
      'One of India\'s largest residential engineering campuses, spread across a vast green landscape with extensive student movement throughout the day. Long distances between hostels, departments, labs, and activity centers create a strong need for efficient mobility.',
    benefits: [
      'Quick movement across the large campus',
      'Reduced travel time between classes',
      'Convenient transportation for students carrying books/laptops',
      'Improved night-time accessibility'
    ],
    images: [
      '/images/bit-mesra/photo1.jpg',
      '/images/bit-mesra/photo2.jpg',
      '/images/bit-mesra/photo3.jpg'
    ],
    header: 'from-purple-600 to-purple-800',
    btn: 'bg-purple-600 hover:bg-purple-700',
    accent: 'text-purple-700'
  },
  'bit-sindri': {
    name: 'BIT Sindri',
    tagline: 'Cleaner, faster campus transport for a historic institution.',
    description:
      'A historic engineering campus with a large student community and expansive internal connectivity requirements. Students regularly travel between hostels, academic buildings, and student activity zones throughout the day.',
    benefits: [
      'Efficient campus transportation',
      'Reduced dependency on personal vehicles',
      'Faster travel during busy schedules',
      'Cleaner and smarter mobility solution'
    ],
    images: [
      '/images/bit-sindri/photo1.jpg',
      '/images/bit-sindri/photo2.jpg',
      '/images/bit-sindri/photo3.jpg',
      '/images/bit-sindri/photo4.jpg',
      '/images/bit-sindri/photo5.jpg',
      '/images/bit-sindri/photo6.jpg',
    ],
    header: 'from-orange-500 to-orange-700',
    btn: 'bg-orange-500 hover:bg-orange-600',
    accent: 'text-orange-600'
  }
}

export default function Campus() {
  const { campusId } = useParams()
  const navigate = useNavigate()
  const campus = CAMPUSES[campusId]

  if (!campus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Campus not found.</p>
          <button onClick={() => navigate('/')} className="text-blue-600 underline text-sm">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleInterest = async (interested) => {
    try {
      await api.post('/api/campus/interest', { campus: campusId, interested })
    } catch {
      // non-blocking
    }
    if (interested) navigate(`/register/${campusId}`)
    else navigate('/')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F5F2' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(246,245,242,0.95)', borderColor: '#d0cfc8' }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
            <img src="/images/logo.png" alt="PedalUp" className="h-28 w-auto object-contain" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-base font-bold hover:opacity-70 transition-opacity flex items-center gap-1"
            style={{ color: '#487531' }}
          >
            ← All Campuses
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className={`relative bg-gradient-to-br ${campus.header} text-white py-24 px-6 text-center`}>
        <div className="max-w-3xl mx-auto">
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-4">Pilot Campus</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">{campus.name}</h1>
          <p className="text-white/75 text-xl max-w-xl mx-auto leading-relaxed font-light">{campus.tagline}</p>
        </div>
      </header>

      {/* Campus Photos — perfect 3-col box, no blank spaces
            [  0  ][1]   row 1  (0 spans 2×2)
            [  0  ][2]   row 2
            [3][4][5]    row 3
            Always 6 photos shown, grid is always a clean filled box.
      */}
      <section className="py-14 px-6" style={{ backgroundColor: '#F6F5F2' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 auto-rows-[210px] gap-3">
            {campus.images.slice(0, 6).map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl bg-gray-200 ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={src}
                  alt={`${campus.name} ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Benefits */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">

          {/* Description */}
          <div>
            <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${campus.accent}`}>About the Campus</p>
            <p className="text-gray-600 text-lg leading-relaxed">{campus.description}</p>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className={`text-base font-black uppercase tracking-widest mb-6 ${campus.accent}`}>
              How PedalUp Helps
            </h2>
            <ul className="space-y-4">
              {campus.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-600 text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-white text-center" style={{ backgroundColor: '#1D3215' }}>
        <div className="max-w-xl mx-auto">
          <p className="text-green-400 font-bold text-sm uppercase tracking-widest mb-4">Be Among The First</p>
          <h3 className="text-4xl font-black tracking-tight mb-4">
            Ready to ride smarter<br />at {campus.name}?
          </h3>
          <p className="text-gray-400 text-base mb-10 leading-relaxed">
            Secure your early bird spot and be among the first to experience PedalUp on your campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleInterest(true)}
              className={`${campus.btn} text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-base`}
            >
              Get Early Access
            </button>
            <button
              onClick={() => handleInterest(false)}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-200 text-base border border-white/20"
            >
              Not Interested
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t text-center py-8 text-sm" style={{ backgroundColor: '#1D3215', borderColor: '#2d5020' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/images/logo.png" alt="PedalUp" className="h-8 w-auto object-contain opacity-70" />
        </div>
        <p style={{ color: '#8F8E7F' }}>Smart Campus Mobility &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
