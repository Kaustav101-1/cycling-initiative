const express = require('express')
const router = express.Router()
const supabase = require('../lib/supabase')
const adminAuth = require('../middleware/adminAuth')

const CAMPUSES = ['iim-calcutta', 'nit-rourkela', 'bit-mesra', 'bit-sindri']

router.get('/analytics', adminAuth, async (req, res) => {
  const [viewsRes, interestsRes, regsRes] = await Promise.all([
    supabase.from('campus_views').select('campus'),
    supabase.from('interest_responses').select('campus, interested'),
    supabase.from('registrations').select('*').order('created_at', { ascending: false })
  ])

  if (viewsRes.error) return res.status(500).json({ error: viewsRes.error.message })
  if (interestsRes.error) return res.status(500).json({ error: interestsRes.error.message })
  if (regsRes.error) return res.status(500).json({ error: regsRes.error.message })

  const views = viewsRes.data
  const interests = interestsRes.data
  const registrations = regsRes.data

  const analytics = CAMPUSES.map((campus) => {
    const campusViews = views.filter((v) => v.campus === campus).length
    const campusInterested = interests.filter((i) => i.campus === campus && i.interested).length
    const campusNotInterested = interests.filter((i) => i.campus === campus && !i.interested).length
    const campusRegistrations = registrations.filter((r) => r.campus === campus).length
    const conversionRate =
      campusViews > 0 ? parseFloat(((campusRegistrations / campusViews) * 100).toFixed(1)) : 0
    return { campus, views: campusViews, interested: campusInterested, notInterested: campusNotInterested, registrations: campusRegistrations, conversionRate }
  })

  const totals = {
    views: views.length,
    interested: interests.filter((i) => i.interested).length,
    notInterested: interests.filter((i) => !i.interested).length,
    registrations: registrations.length,
    conversionRate:
      views.length > 0
        ? parseFloat(((registrations.length / views.length) * 100).toFixed(1))
        : 0
  }

  res.json({ analytics, registrations, totals })
})

module.exports = router
