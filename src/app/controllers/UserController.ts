import jwt from 'jsonwebtoken';
import {Request, Response, Router} from 'express';
import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';
import bcrypt from 'bcrypt';
import PlanRepository from '../repositories/PlanRepository';


const userRouter = Router();



userRouter.get('/',async (req: Request, res: Response): Promise<Response> => {

    const {id} = req.body;

    try {
        const users = await UserRepository.getUsers(id);
        return res.status(200).json({
            message: "Dados dos usuarios obtidos com sucesso",
            code: 200,
            message_code: "user_get_sucess",
            data: users
        });
    } catch (error:any) {
        return res.status(500).json({
            message: "Erro ao obter dados dos usuarios",
            code : 200,
            message_code: "user_get_error",
            data: error.message
        })
        
    }
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

        
        const token = jwt.sign(
            { userId: user.id, username: user.email },
            'da_certo_amem', 
            { expiresIn: '1h' } 
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
                message_code: 'email_not_found',
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
            data: error.message,

        })
        
    }

})

userRouter.patch('/update',async (req: Request, res: Response) => {
    try {
        const {email, newEmail} = req.body

        const updatedUser = UserRepository.updateUser(email, newEmail);

        return res.status(200).json({
            message: "email atualizado com sucesso",
            code: 200,
            message_code: 'email_update_sucess',
            data: req.body
        })
        
    } catch (error:any) {
        return res.status(500).json({
            message: 'Erro ao atualizar email',
            code: 500,
            message_code: 'update_error',
            data: error.message,

        })
        
    }
})

export default userRouter;