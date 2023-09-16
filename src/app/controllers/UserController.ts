import jwt from 'jsonwebtoken';
import {Request, Response, Router} from 'express';
import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';
import bcrypt from 'bcrypt';


const userRouter = Router();

userRouter.get('/',async (_req: Request, res: Response): Promise<Response> => {
    const users = await UserRepository.getUsers();
    return res.status(200).json(users);
});

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        
        const userData: IUser = req.body;

        const newUser = await UserRepository.postUsers(userData);
        
        return res.status(201).json({
            message: 'Usuário criado com sucesso!',
            code: 201,
            message_code: 'user_created',
            data: newUser,
        });
    } catch (error: any) {
        
        return res.status(500).json({
            message: 'Erro ao criar o usuário',
            code: 500,
            message_code: 'user_creation_error',
            error: error.message,
        });
    }
});

userRouter.post('/login', async (req: Request, res: Response) => {
    try {

        const {email, password} = req.body;
        
        if (!email || !password){
            return res.status(400).json({
                message: 'Campos email e password são obrigatórios',
                code: 400,
                messagecode: 'missing_fields',
            });
        }

        const user = await UserRepository.findByEmail(email);

        if(!user){
            return res.status(401).json({
                message: 'Email não encontrado',
                code: 401,
                messagecode: 'email_not_found',
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // console.log('senha fornecida: ', password)
            // console.log('senha do bd: ', user.password)

            return res.status(401).json({
                message: 'Credenciais inválidas',
                code: 401,
                message_code: 'invalid_credentials',
            });
        }

        // Se as credenciais estiverem corretas, criar um token JWT
        const token = jwt.sign(
            { userId: user.id, username: user.email },
            'da_certo_amem', // Substitua pela sua chave secreta real
            { expiresIn: '1h' } // Define a expiração do token (por exemplo, 1 hora)
        );

        
        return res.status(200).json({
            message: 'Login bem-sucedido',
            code: 200,
            message_code: 'login_successful',
            token: token,
        });

    } catch (error: any) {

        return res.status(500).json({
            message: 'Erro ao fazer login',
            code: 500,
            message_code: 'login_error',
            error: error.message,

        })
        
    }

});

userRouter.delete('/delete', async(req: Request, res: Response) => {

    try {

        const {email} = req.body;

        const user = await UserRepository.findByEmail(email)

        if(!user){
            return res.status(401).json({
                message: 'Email não encontrado',
                code: 401,
                messagecode: 'email_not_found',
            });
        }

        UserRepository.deleteUser(email);

        return res.status(200).json({
            message: 'Email deletado com sucessp',
            code: 200,
            message_code : 'delete_sucessful',
            data: email

        })
        
    } catch (error: any) {
        return res.status(500).json({
            message: 'Erro ao deletar email',
            code: 500,
            message_code: 'login_error',
            error: error.message,

        })
        
    }

})

export default userRouter;