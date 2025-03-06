export const checkAdmin = (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'admin';
    
    if(isAdmin) {
      next()
    } else {
      return res.status(400).json({ message: "Доступ запрещен!" })
    }
  } catch (error) {
    res.status(400).json({ message: "Доступ запрещен!" });
  }
}