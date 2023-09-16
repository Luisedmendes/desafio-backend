import User from "../entities/User";
import IUser from "../interfaces/IUser";
import bcrypt from 'bcrypt';
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
}

const postUsers = async (userData: IUser): Promise<User | null> => {
    try {
        const { email, password, ...userDataWithoutPassword } = userData;

        
        const existingUser = await userRepository.findOne({ where: { email } });

        if (existingUser) {
            throw new Error('Email já existente');
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = userRepository.create({
            ...userDataWithoutPassword,
            email,
            password: hashedPassword, 
        });

        
        await userRepository.save(newUser);

        return newUser;
    } catch (error: any) {
        throw new Error("Erro ao criar email: " + error.message);
    }
};

const deleteUser = async (email: string) => {
    try {
        userRepository.delete({email})
    } catch (error: any) {
        throw new Error("Erro ao deletar email: "+ error.message)
        
    }
}




const findByEmail = async (email: string): Promise<User | undefined> => {
    try {
      const user = await userRepository.findOne({ where: { email } });
      return user || undefined;
    } catch (error: any) {
      throw new Error("Erro ao buscar usuário por nome de usuário: " + error.message);
    }
  };




  



export default {getUsers, postUsers, findByEmail, deleteUser};