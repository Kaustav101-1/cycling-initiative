import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/client'

const CAMPUS_NAMES = {
  'iim-calcutta': 'IIM Calcutta',
  'nit-trichy': 'NIT Trichy',
  'bits-pilani': 'BITS Pilani'
}

export default function Register() {
  const { campusId } = useParams()
  const navigate = useNavigate()
  const campusName = CAMPUS_NAMES[campusId] || campusId

  const [form, setForm] = useState({ name: '', batch: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.batch.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/api/register', { campus: campusId, ...form })
      navigate(`/success/${campusId}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🚴</div>
            <h1 className="text-2xl font-bold text-gray-800">Join the Initiative</h1>
            <p className="text-gray-400 mt-1 text-sm">{campusName}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch / Year
              </label>
              <input
                type="text"
                name="batch"
                value={form.batch}
                onChange={handleChange}
                placeholder="e.g. 2023–2025 or 3rd Year CSE"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl shadow transition-colors text-base"
            >
              {loading ? 'Registering…' : 'Register Now'}
            </button>
          </form>

          <button
            onClick={() => navigate(`/campus/${campusId}`)}
            className="mt-5 w-full text-center text-gray-400 hover:text-gray-600 text-sm transition-colors"
          >
            ← Back to campus page
          </button>
        </div>
      </div>
    </div>
  )
}
