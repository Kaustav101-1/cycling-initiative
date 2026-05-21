const express = require('express')
const router = express.Router()
const supabase = require('../lib/supabase')

const VALID_CAMPUSES = ['iim-calcutta', 'nit-trichy', 'bits-pilani']

router.post('/view', async (req, res) => {
  const { campus } = req.body
  if (!campus || !VALID_CAMPUSES.includes(campus)) {
    return res.status(400).json({ error: 'Invalid campus' })
  }
  const { error } = await supabase.from('campus_views').insert({ campus })
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

router.post('/interest', async (req, res) => {
  const { campus, interested } = req.body
  if (!campus || !VALID_CAMPUSES.includes(campus) || typeof interested !== 'boolean') {
    return res.status(400).json({ error: 'Invalid request body' })
  }
  const { error } = await supabase.from('interest_responses').insert({ campus, interested })
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

module.exports = router
