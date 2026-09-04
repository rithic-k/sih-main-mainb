// rbac.js - Role-Based Access Control
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.accountType)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden. Role '${req.user?.accountType || 'anonymous'}' is not authorized to access this resource.`
      });
    }
    next();
  };
};

// privacyGuard.js - Privacy boundary enforcement for parents and third parties
export const protectPrivateJournals = (req, res, next) => {
  // If request is from parent/guardian, block raw journal reading
  if (req.user && req.user.accountType === 'parent') {
    return res.status(403).json({
      success: false,
      error: 'Privacy Boundary: Raw private journal and voice contents are protected from guardian inspection by default.'
    });
  }
  next();
};
