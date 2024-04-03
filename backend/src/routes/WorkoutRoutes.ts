import express, { Request, Response, NextFunction } from 'express';
import { IReqVerification } from '../interfaces/IAuthorization';
import User from '../mongodb/models/User';
import { IWorkout, IWorkoutStartFinish, isWorkoutCorrect } from '../interfaces/IWorkout';

const workoutRoute = express.Router();

workoutRoute.post('/saveWorkout', async (req: Request, res: Response, next: NextFunction) => {
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
                user.weeklyCalendar.set(weekday, newWorkoutJson.workoutName);
                continue;
            }
            else {
                throw new Error('day occupied');
            }
        }

        await user.save();
        res.send('Workout added Successfully');
    }
    catch (error) {
        next(error);
    }
});


workoutRoute.post('/finishWorkout', async (req: Request, res: Response, next: NextFunction) => {
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
        res.status(200).send('Finished Workout');
    }
    catch (error) {
        next(error);
    }
});


workoutRoute.patch('/:name/updateWorkout', async (req: Request, res: Response, next: NextFunction) => {
    const param: { name: string } = req.params as { name: string };
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

workoutRoute.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
    const request: IReqVerification = req as IReqVerification;
    const params: { name: string } = req.params as { name: string };
    try {
        const user = await User.findById(request.token.id);
        if (!user) throw new Error('user DNE');
        let theWorkout: IWorkout | null = null;

        for (let workout of user.workouts) {
            if (workout.workoutName == params.name) {
                theWorkout = workout;
                break;
            }
        }

        res.send(theWorkout);

    } catch (error) {
        next(error);
    }
})


export default workoutRoute;