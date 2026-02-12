import express, { NextFunction, Request, Response } from 'express'
import { IReqVerification } from '../interfaces/IAuthorization';
import User from '../mongodb/models/User';
import { IUserAgeHeightWeight } from '../interfaces/IUser';

const mainUserRoutes = express.Router();

mainUserRoutes.get('/user', async (req: Request, res: Response, next: NextFunction) => {
    const request: IReqVerification = req as IReqVerification;
    try {
        const user = await User.findById(request.token.id);
        if (!user) throw new Error('User DNE');
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});

mainUserRoutes.get('/getCalendar', async (req: Request, res: Response, next: NextFunction) => {
    const request: IReqVerification = req as IReqVerification;
    try {
        const user = await User.findById(request.token.id);
        if (!user) throw new Error('User DNE');
        res.status(200).json(user.generalWeeklyCalendar);
    }
    catch (error) {
        next(error);
    }
});

mainUserRoutes.put('/updateUser', async (req: Request, res: Response, next: NextFunction) => {
    const request: IReqVerification = req as IReqVerification;
    const reqBody: IUserAgeHeightWeight = req.body;
    try {
        const user = await User.findOneAndUpdate({ _id: request.token.id }, { age: reqBody.age, height: reqBody.height, weight: reqBody.weight }, { new: true });
        if (!user) throw new Error('update user fail');
        res.status(200).send();
    }
    catch (error) {
        next(error);
    }
})

export default mainUserRoutes;