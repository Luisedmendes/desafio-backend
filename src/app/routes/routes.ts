import {Router} from 'express';
import userRouter from '../controllers/UserController';
import planRouter from '../controllers/PlanController';
import authenticateToken from '../middleware/authMiddleware';

const routers = Router();

// Rotas publicas
routers.use('/users/login', userRouter);
routers.use('/users/cadastro', userRouter);

// Rotas privadas
routers.use('/users', authenticateToken, userRouter)
routers.use('/planos', authenticateToken, planRouter);




export default routers;