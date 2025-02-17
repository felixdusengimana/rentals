export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Not authenticated' });
  };
  
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    res.status(403).json({ message: 'Access denied' });
};

export const isSeller = (req, res, next) => {
    if (req.user && req.user.role === 'seller') {
      return next();
    }
    res.status(403).json({ message: 'Access denied' });
}