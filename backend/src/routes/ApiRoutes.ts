import express, {NextFunction, Request, Response} from 'express'
import { IReqVerification } from '../interfaces/IAuthorization';
import User from '../mongodb/models/User';

const mainUserRoutes = express.Router();

mainUserRoutes.get('/', async (req:Request, res:Response, next:NextFunction) => 
{
    const request:IReqVerification = req as IReqVerification;
    try
    {
        const user = await User.findById(request.token.id);
        if(!user) throw new Error('User Not Found');
        res.json(user);
    }
    catch(error)
    {
        next(error);
    }
});


export default mainUserRoutes;