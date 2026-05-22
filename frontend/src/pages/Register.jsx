import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/client'

const CAMPUS_NAMES = {
  'iim-calcutta': 'IIM Calcutta',
  'nit-rourkela': 'NIT Rourkela',
  'bit-mesra':    'BIT Mesra',
  'bit-sindri':   'BIT Sindri'
}

export default function Register() {
  const { campusId } = useParams()
  const navigate = useNavigate()
  const campusName = CAMPUS_NAMES[campusId] || campusId

  const [form, setForm] = useState({ name: '', email: '', batch: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.batch.trim()) {
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

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#F6F5F2' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <img src="/images/logo.png" alt="PedalUp" className="h-20 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#1D3215' }}>Get Early Access</h1>
            <p className="mt-1 text-sm font-medium" style={{ color: '#8F8E7F' }}>{campusName}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: '#1D3215' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
                style={{ '--tw-ring-color': '#487531' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: '#1D3215' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: '#1D3215' }}>
                Batch / Year
              </label>
              <input
                type="text"
                name="batch"
                value={form.batch}
                onChange={handleChange}
                placeholder="e.g. 2023–2025 or 3rd Year CSE"
                className={inputClass}
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold py-3 rounded-xl shadow transition-all text-base hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#487531' }}
            >
              {loading ? 'Submitting…' : 'Get Early Access'}
            </button>
          </form>

          <button
            onClick={() => navigate(`/campus/${campusId}`)}
            className="mt-5 w-full text-center text-sm transition-colors hover:opacity-70"
            style={{ color: '#8F8E7F' }}
          >
            ← Back to campus page
          </button>
        </div>
      </div>
    </div>
  )
}
