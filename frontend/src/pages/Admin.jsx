import { useState } from 'react'
import api from '../api/client'

const CAMPUS_LABELS = {
  'iim-calcutta': 'IIM Calcutta',
  'nit-rourkela': 'NIT Rourkela',
  'bit-mesra':    'BIT Mesra',
  'bit-sindri':   'BIT Sindri'
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 text-center">
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{label}</div>
    </div>
  )
}

function ConversionBadge({ rate }) {
  const color =
    rate >= 50 ? 'bg-green-100 text-green-700' :
    rate >= 20 ? 'bg-yellow-100 text-yellow-700' :
                 'bg-red-100 text-red-600'
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
      {rate}%
    </span>
  )
}

export default function Admin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const fetchAnalytics = async (pwd) => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${pwd}` }
      })
      setData(res.data)
      setAuthed(true)
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Incorrect password.'
          : 'Failed to load analytics. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password.trim()) fetchAnalytics(password)
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔐</div>
            <h1 className="text-xl font-bold text-gray-800">Admin Access</h1>
            <p className="text-gray-400 text-sm mt-1">Enter password to view analytics</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {loading ? 'Verifying…' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const { analytics, registrations, totals } = data

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-0.5">Campus Cycling Initiative — Analytics</p>
          </div>
          <button
            onClick={() => fetchAnalytics(password)}
            className="text-sm bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Totals row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total Views" value={totals.views} />
          <StatCard label="Interested" value={totals.interested} />
          <StatCard label="Not Interested" value={totals.notInterested} />
          <StatCard label="Registrations" value={totals.registrations} />
          <StatCard label="Conversion Rate" value={`${totals.conversionRate}%`} />
        </div>

        {/* Per-campus table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-700">Per-Campus Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Campus', 'Views', 'Interested', 'Not Interested', 'Registrations', 'Conversion'].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analytics.map((row) => (
                  <tr key={row.campus} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {CAMPUS_LABELS[row.campus] || row.campus}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.views}</td>
                    <td className="px-6 py-4 text-emerald-600 font-medium">{row.interested}</td>
                    <td className="px-6 py-4 text-red-500">{row.notInterested}</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">{row.registrations}</td>
                    <td className="px-6 py-4">
                      <ConversionBadge rate={row.conversionRate} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registrations list */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-700">
              Registrations ({registrations.length})
            </h2>
          </div>
          {registrations.length === 0 ? (
            <p className="px-6 py-10 text-center text-gray-400 text-sm">No registrations yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Email', 'Batch', 'Campus', 'Registered At'].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{reg.name}</td>
                      <td className="px-6 py-4 text-gray-600">{reg.email || '—'}</td>
                      <td className="px-6 py-4 text-gray-600">{reg.batch}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {CAMPUS_LABELS[reg.campus] || reg.campus}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(reg.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
