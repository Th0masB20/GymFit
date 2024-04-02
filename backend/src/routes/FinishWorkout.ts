import express, {Request, Response, NextFunction} from 'express';
import { IWorkoutStartFinish } from '../interfaces/IWorkout';
import { IReqVerification } from '../interfaces/IAuthorization';

const finishWorkoutRoute = express.Router();

finishWorkoutRoute.post('/submit', (req:Request, res:Response, next:NextFunction) =>
{
    const request:IReqVerification = req as IReqVerification;
    const finishWorkoutJson:IWorkoutStartFinish = req.body as IWorkoutStartFinish;
})

export default finishWorkoutRoute;