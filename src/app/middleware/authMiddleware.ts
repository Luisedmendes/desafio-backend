import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  if (req.path === '/cadastro' || req.path === '/login') {
    return next();
  }

  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticação ausente' });
  }
  
  
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

 
  jwt.verify(token, 'da_certo_amem', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    
    req.user = user;

    
    next();
  });
}

export default authenticateToken;
