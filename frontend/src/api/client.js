import axios from 'axios'

// In dev, VITE_API_URL is unset and Vite proxies /api/* to localhost:3001.
// In prod, set VITE_API_URL=https://your-backend.railway.app (no trailing slash).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000 // 30 seconds — handles Railway cold start
})

export default api
