import Plan from "../entities/Plan";
import IPlan from "../interfaces/IPlan";
import { AppDataSource } from "../../database/data-source";
import User from "../entities/User";

const planRepository = AppDataSource.getRepository(Plan);

const postPlan =async (planData: IPlan): Promise<Plan> => {
    try {

        const {name, description, price} = planData;

        const newPlan = planRepository.create({
            name,
            description,
            price
        })

        await planRepository.save(newPlan);

        return newPlan;
        
    } catch (error:any) {
        throw new Error("Erro ao criar email: "+ error.message);
    }
}

const getPlans = (): Promise<IPlan[]> => {
    return planRepository.find();
}

const postPlanToUser = async (id: number, planId: number) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({ where: { id } });
      
      const planRepository = AppDataSource.getRepository(Plan);
      const plan = await planRepository.findOneOrFail({ where: { id: planId } });
  
      user.plan = plan;
  
      await userRepository.save(user);
    } catch (error:any) {
      throw new Error('Erro ao associar plano ao usuário: ' + error.message);
    }
  };
  
  
  
  

const findByName =async (id: number): Promise<Plan | undefined> => {
   try {
    const plan = await planRepository.findOne({where: {id}});
    return plan || undefined;
    
   } catch (error:any) {
    throw new Error('Erro ao deletar plano: '+ error.message);
    
   }
}

const deletePlan =async (id: number) => {
    try {
        planRepository.delete({id});
        
    } catch (error:any) {
        throw new Error("Erro ao deletar plano: "+ error.message);
    }
}

const updatePlan = async (id: number, name: string, description: string, price: number) => {
    try {
        const result = await planRepository.update(id, {
            name: name,
            description: description,
            price: price
        });

        return result;
    } catch (error:any) {
        throw new Error('Erro ao atualizar o plano: '+ error.message);
    }
}

export default {postPlan, getPlans, postPlanToUser, findByName, deletePlan, updatePlan};