function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

module.exports = adminAuth
