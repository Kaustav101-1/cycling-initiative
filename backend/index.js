require('dotenv').config()
const express = require('express')
const cors = require('cors')

const campusRoutes = require('./routes/campus')
const registerRoutes = require('./routes/register')
const adminRoutes = require('./routes/admin')

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error('Not allowed by CORS'))
    },
    credentials: true
  })
)
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.get('/debug-auth', (_req, res) => {
  res.json({
    adminPasswordSet: !!process.env.ADMIN_PASSWORD,
    adminPasswordLength: process.env.ADMIN_PASSWORD?.length ?? 0
  })
})

app.use('/api/campus', campusRoutes)
app.use('/api/register', registerRoutes)
app.use('/api/admin', adminRoutes)

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
