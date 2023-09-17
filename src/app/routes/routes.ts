import {Router} from 'express';
import userRouter from '../controllers/UserController';
import planRouter from '../controllers/PlanController';

const routers = Router();

routers.use('/users', userRouter);
routers.use('/planos', planRouter);




export default routers;