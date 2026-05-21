require('dotenv').config()
const express = require('express')

const campusRoutes = require('./routes/campus')
const registerRoutes = require('./routes/register')
const adminRoutes = require('./routes/admin')

const app = express()
const PORT = process.env.PORT || 3001

// Manual CORS — set headers on every response, handle preflight immediately
app.use((req, res, next) => {
  const origin = req.headers.origin || '*'
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Vary', 'Origin')
  if (req.method === 'OPTIONS') {
    console.log(`Preflight from origin: ${origin}`)
    return res.sendStatus(200)
  }
  next()
})

app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/campus', campusRoutes)
app.use('/api/register', registerRoutes)
app.use('/api/admin', adminRoutes)

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
