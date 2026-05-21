import { useNavigate } from 'react-router-dom'
import api from '../api/client'

const CAMPUSES = [
  { id: 'iim-calcutta', name: 'IIM Calcutta', style: 'from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800' },
  { id: 'nit-trichy',   name: 'NIT Trichy',   style: 'from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700' },
  { id: 'bits-pilani',  name: 'BITS Pilani',  style: 'from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600' }
]

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Road cyclist' },
  { url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80', alt: 'Mountain biking' },
  { url: 'https://images.unsplash.com/photo-1476092963032-f4a1da9b18f1?w=800&q=80', alt: 'City cycling' },
  { url: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800&q=80', alt: 'Group ride' },
  { url: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80', alt: 'Cycling path' },
  { url: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80', alt: 'Scenic ride' }
]

export default function Home() {
  const navigate = useNavigate()

  const handleCampusClick = async (campusId) => {
    try {
      await api.post('/api/campus/view', { campus: campusId })
    } catch {
      // non-blocking — tracking failure should not block navigation
    }
    navigate(`/campus/${campusId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="relative bg-gradient-to-br from-green-800 to-green-600 text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=60"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center py-24 px-6">
          <div className="text-6xl mb-5">🚴</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Campus Cycling Initiative
          </h1>
          <p className="text-green-100 text-lg md:text-xl leading-relaxed">
            Join a movement making campus commutes sustainable, healthy, and joyful.
            Select your institution below to learn more.
          </p>
        </div>
      </header>

      {/* Photo gallery */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Life on Two Wheels
          </h2>
          <p className="text-gray-400 text-center mb-10 text-sm">
            Thousands of students are already pedalling. Here's why.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className="aspect-video overflow-hidden rounded-2xl shadow-md group"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus selection */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Campus</h2>
          <p className="text-gray-400 mb-10">
            Discover how cycling is transforming campus life at your institution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {CAMPUSES.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCampusClick(c.id)}
                className={`bg-gradient-to-br ${c.style} text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-base`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-500 text-center py-6 text-sm">
        Campus Cycling Initiative &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
