import { useParams, useNavigate } from 'react-router-dom'

const CAMPUS_NAMES = {
  'iim-calcutta': 'IIM Calcutta',
  'nit-rourkela': 'NIT Rourkela',
  'bit-mesra':    'BIT Mesra',
  'bit-sindri':   'BIT Sindri'
}

export default function Success() {
  const { campusId } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F6F5F2' }}>
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="PedalUp" className="h-20 w-auto object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">You're an Early Bird! 🎉</h1>
        <p className="text-gray-600 mb-1">
          Thanks for joining PedalUp at{' '}
          <span className="font-semibold">{CAMPUS_NAMES[campusId] || campusId}</span>!
        </p>
        <p className="text-gray-400 text-sm mb-8">
          We'll reach out as soon as PedalUp launches on your campus. Stay tuned! ⚡
        </p>
        <button
          onClick={() => navigate('/')}
          className="text-white font-semibold py-3 px-8 rounded-xl shadow transition-all hover:opacity-90"
          style={{ backgroundColor: '#487531' }}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
