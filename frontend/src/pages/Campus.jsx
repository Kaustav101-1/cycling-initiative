import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/client'

const CAMPUSES = {
  'iim-calcutta': {
    name: 'IIM Calcutta',
    tagline: 'Leading sustainable commuting at one of India\'s premier B-schools.',
    description:
      'IIM Calcutta\'s lush, sprawling campus is tailor-made for cycling. Join fellow students and faculty in making two-wheeled travel the default way to get around.',
    images: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80'
    ],
    header: 'from-blue-700 to-blue-900',
    btn: 'bg-blue-700 hover:bg-blue-800'
  },
  'nit-trichy': {
    name: 'NIT Trichy',
    tagline: 'Engineering a greener future — one pedal at a time.',
    description:
      'NIT Trichy\'s vibrant campus community is ready to embrace cycling as a sustainable lifestyle. Be part of the engineering revolution that powers itself forward.',
    images: [
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80',
      'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    ],
    header: 'from-emerald-600 to-emerald-800',
    btn: 'bg-emerald-600 hover:bg-emerald-700'
  },
  'bits-pilani': {
    name: 'BITS Pilani',
    tagline: 'BITSians cycling towards a sustainable tomorrow.',
    description:
      'BITS Pilani\'s iconic campus stretches across the Rajasthan landscape. Help us build a cycling culture that connects every corner and every community.',
    images: [
      'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80'
    ],
    header: 'from-orange-500 to-orange-700',
    btn: 'bg-orange-500 hover:bg-orange-600'
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
    if (interested) {
      navigate(`/register/${campusId}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`relative bg-gradient-to-br ${campus.header} text-white py-20 px-6 text-center`}>
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 left-5 text-white/60 hover:text-white text-sm flex items-center gap-1 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold mb-3">{campus.name}</h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto">{campus.tagline}</p>
      </header>

      {/* Photo grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {campus.images.map((url, i) => (
            <div key={i} className="aspect-video overflow-hidden rounded-2xl shadow-md">
              <img
                src={url}
                alt={`${campus.name} cycling`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">{campus.description}</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-7">
            Would you like to join the cycling initiative at {campus.name}?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleInterest(true)}
              className={`${campus.btn} text-white font-semibold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-base`}
            >
              Yes, I'm Interested!
            </button>
            <button
              onClick={() => handleInterest(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold py-4 px-10 rounded-2xl transition-all duration-200 text-base"
            >
              Not Interested
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-500 text-center py-6 text-sm">
        Campus Cycling Initiative &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
