import express, { Response, Request, NextFunction } from 'express';
import User from '../mongodb/models/User';
import { IReqVerification } from '../interfaces/IAuthorization';
import { IWorkout } from '../interfaces/IWorkout';

const editWorkoutRoute = express.Router();

editWorkoutRoute.patch('/:name', async (req: Request, res: Response, next: NextFunction) => {
    const param = req.params;
    const request: IReqVerification = req as IReqVerification;
    const updatedWorkout: IWorkout = req.body as IWorkout;

    try {
        const user = await User.findById(request.token.id);
        if (!user) throw new Error('user DNE');

        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName === param.name) {
                user.workouts[i] = updatedWorkout;
                break;
            }
        }

        await user.save();
        res.send('User Successfully Updated');
    }
    catch (error) {
        next(error);
    }
})

export default editWorkoutRoute;