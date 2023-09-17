import {Request, Response, Router} from 'express';
import PlanRepository from '../repositories/PlanRepository';
import IPlan from '../interfaces/IPlan';

const planRouter = Router();


planRouter.post('/',async (req: Request, res: Response) => {

    try {

        const planData: IPlan = req.body;

        const newPlan = await PlanRepository.postPlan(planData);

        return res.status(201).json({
            message: 'Plano criado com sucesso!',
            code: 201,
            message_code: 'user_created',
            data: newPlan,
        });
        
    } catch (error: any) {
        return res.status(500).json({
            message: 'Erro ao criar plano',
            code: 500,
            message_code: 'plan_creation_error',
            data: error.message,
        });
        
    }
    
});

planRouter.get('/',async (_req: Request, res: Response) => {
    try {
        const plans = await PlanRepository.getPlans();
        return res.status(200).json({
            message: 'Get de planos com sucesso!',
            code: 200,
            message_code: "plan_get_sucess",
            data: plans
        });
        
    } catch (error:any) {
        
    }
});

planRouter.post('/selecionar',async (req: Request, res: Response) => {
    try {
        const {id, planID} = req.body;
    
        await PlanRepository.postPlanToUser(id, planID);
    
        return res.status(200).json({
            message: 'Plano associado ao usuário com sucesso',
            code: 200,
            message_code: 'plan_associated',
            data: req.body
        });

    } catch (error:any) {
        return res.status(500).json({
            message: 'Erro ao associar plano ao usuário',
            code: 500,
            message_code: 'plan_association_error',
            data: error.message,
        });
        
    }
    
})

planRouter.delete('/delete',async (req: Request, res: Response) => {
    try {

        const {id} = req.body;

        const plan = await PlanRepository.findByName(id);

        if(!plan){
            return res.status(401).json({
                message: 'Plano não encontrado',
                code: 401,
                message_code: "plan_not_found",
                data: req.body
            })
        }

        PlanRepository.deletePlan(id);

        return res.status(200).json({
            message: 'Plano deletado com sucesso',
            code: 200,
            message_code : 'delete_sucessful',
            data: id
        })


        
    } catch (error:any) {
        return res.status(500).json({
            message: 'Erro ao deletar plano',
            code: 500,
            message_code: 'delete_error',
            data: error.message
        })
    }
})

planRouter.patch('/update',async (req: Request, res: Response) => {

    try {
        const {id, name, description, price} = req.body;

        const plan = await PlanRepository.updatePlan(id, name, description, price);

        if(!plan){
            return res.status(401).json({
                message: 'Plano não encontrado',
                code: 401,
                message_code: "plan_not_found",
                data: req.body
            })
        }

        return res.status(200).json({
            message: 'Plano atualizado com sucesso',
            code: 200,
            message_code : 'update_sucessful',
            data: req.body
        })

        
    } catch (error:any) {
        return res.status(500).json({
            message: 'Erro ao atualizar plano',
            code: 500,
            message_code: 'delete_error',
            data: error.message
        })
    }
    
})



export default planRouter;