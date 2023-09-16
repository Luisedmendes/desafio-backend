import {Request, Response, Router} from 'express';
import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';

const userRouter = Router();

userRouter.get('/',async (_req: Request, res: Response): Promise<Response> => {
    const users = await UserRepository.getUsers();
    return res.status(200).json(users);
});

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        // Extrair os dados da solicitação POST do corpo da solicitação
        const userData: IUser = req.body;


        // Chamar a função para criar o novo usuário
        const newUser = await UserRepository.postUsers(userData);

        // Responder com sucesso e os detalhes do novo usuário
        return res.status(201).json({
            message: 'Usuário criado com sucesso!',
            code: 201,
            message_code: 'user_created',
            data: newUser,
        });
    } catch (error: any) {
        // Lidar com erros e retornar uma resposta de erro
        return res.status(500).json({
            message: 'Erro ao criar o usuário',
            code: 500,
            message_code: 'user_creation_error',
            error: error.message,
        });
    }
});

export default userRouter;