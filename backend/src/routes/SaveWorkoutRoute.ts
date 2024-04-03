import express, { Request, Response, NextFunction } from 'express';
import { IReqVerification } from '../interfaces/IAuthorization';
import User from '../mongodb/models/User';
import { IWorkout, isWorkoutCorrect } from '../interfaces/IWorkout';

const saveWorkoutRoute = express.Router();

saveWorkoutRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const request: IReqVerification = req as IReqVerification;
    const newWorkoutJson: IWorkout = req.body as IWorkout;
    try {
        const user = await User.findById(request.token.id);
        if (!user) throw new Error('user DNE');

        if (!isWorkoutCorrect(newWorkoutJson)) {
            throw new Error('incorrect workout format');
        }

        for (let workouts of user.workouts) {
            if (workouts.workoutName === newWorkoutJson.workoutName) {
                throw new Error('workout exists');
            }
        }
        user.workouts.push(newWorkoutJson);
        for (let weekday of newWorkoutJson.calendarDay) {
            if (!user.weeklyCalendar.has(weekday)) {
                user.weeklyCalendar.set(weekday, newWorkoutJson);
                continue;
            }
        }

        await user.save();
        res.send('Workout added Successfully');
    }
    catch (error) {
        next(error);
    }
});


export default saveWorkoutRoute;