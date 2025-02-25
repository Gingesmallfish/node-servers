function authMiddleware(req, res, next) {
  // 假设简单的身份验证逻辑
  const isAuthenticated = true; // 这里可以替换为实际的身份验证逻辑

  if (!isAuthenticated) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

module.exports = authMiddleware;