import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService'


const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({ email, password })

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }

        return response.json({userWithoutPassword, token});
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
});

export default sessionRouter;