import express, { Request, Response, NextFunction } from 'express';
import { IWorkout, IWorkoutStartFinish } from '../interfaces/IWorkout';
import { IReqVerification } from '../interfaces/IAuthorization';
import User from '../mongodb/models/User';

const finishWorkoutRoute = express.Router();

finishWorkoutRoute.post('/submit', async (req: Request, res: Response, next: NextFunction) => {
    const request: IReqVerification = req as IReqVerification;
    const finishWorkoutJson: IWorkoutStartFinish = req.body as IWorkoutStartFinish;
    try {
        const user = await User.findById(request.token.id);
        if (!user) throw new Error('user DNE');
        const d = new Date();
        //finish workout has time attribute
        user.workoutHistory.set(`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`, finishWorkoutJson as IWorkout);
        user.activityLog[d.getMonth()] += 1;

        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName == finishWorkoutJson.workoutName) {
                user.workouts[i] = { ...user.workouts[i], previousWorkout: finishWorkoutJson };
                break;
            }
        }

        await user.save();
        console.log(user.workouts[0]);

        res.status(200).send('Finished Workout');
    }
    catch (error) {
        next(error);
    }
})

export default finishWorkoutRoute;