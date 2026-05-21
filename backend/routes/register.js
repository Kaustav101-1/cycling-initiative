const express = require('express')
const router = express.Router()
const supabase = require('../lib/supabase')

const VALID_CAMPUSES = ['iim-calcutta', 'nit-trichy', 'bits-pilani']

router.post('/', async (req, res) => {
  const { campus, name, batch } = req.body
  if (!campus || !VALID_CAMPUSES.includes(campus)) {
    return res.status(400).json({ error: 'Invalid campus' })
  }
  if (!name?.trim() || !batch?.trim()) {
    return res.status(400).json({ error: 'Name and batch are required' })
  }
  const { error } = await supabase
    .from('registrations')
    .insert({ campus, name: name.trim(), batch: batch.trim() })
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

module.exports = router
