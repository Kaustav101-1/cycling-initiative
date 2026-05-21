import { useParams, useNavigate } from 'react-router-dom'

const CAMPUS_NAMES = {
  'iim-calcutta': 'IIM Calcutta',
  'nit-trichy': 'NIT Trichy',
  'bits-pilani': 'BITS Pilani'
}

export default function Success() {
  const { campusId } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">You're In!</h1>
        <p className="text-gray-600 mb-1">
          Welcome to the cycling initiative at{' '}
          <span className="font-semibold">{CAMPUS_NAMES[campusId] || campusId}</span>!
        </p>
        <p className="text-gray-400 text-sm mb-8">
          We'll keep you updated on events, routes, and community rides.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
