import { verifyToken } from '../services/auth.service.js';

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' }); 
  }

  const decoded = verifyToken(token);
  if(!decoded) { 
    return res.status(401)
    .send({ auth: false, message: 'Failed to authenticate token.' }); 
  }
  req.user = decoded;

  // if everything good, save to request for use in other routes
  next();
};

export default auth;
