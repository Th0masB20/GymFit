import express, { Request, Response, NextFunction } from 'express';
import { IReqVerification } from '../interfaces/IAuthorization';
import User from '../mongodb/models/User';
import { IWorkout, IWorkoutStartFinish, isWorkoutCorrect } from '../interfaces/IWorkout';
import { ICalendarWorkoutName, IMonthName, INumberedWeekCalendar, IWeekDay, IWeeklyCalendar } from '../interfaces/ICalendar';
import { createMonthlyCalendar, createNumberedWeeklyCalendar } from '../utilities/CreateMonthlyCalendar';
import moment from 'moment';

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
            if (!user.generalWeeklyCalendar[weekday].workoutName) {
                const calendar = { ...user.generalWeeklyCalendar };
                calendar[weekday] = { ...calendar[weekday], workoutName: newWorkoutJson.workoutName };
                user.generalWeeklyCalendar = calendar;
                continue;
            }
            else {
                throw new Error('day occupied');
            }
        }

        user.monthlyCalendar = createMonthlyCalendar(user.generalWeeklyCalendar);
        user.yearWeeklyCalendar = createNumberedWeeklyCalendar(user.generalWeeklyCalendar);

        await user.save();
        res.status(200).json(user);
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

        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName == finishWorkoutJson.workoutName) {
                user.workouts[i] = { ...user.workouts[i], previousWorkout: finishWorkoutJson };
                break;
            }
        }

        //finish workout has time attribute
        const history = { ...user.workoutHistory }
        if (!history[`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`])
            history[`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`] = []
        else {
            history[`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`].push(finishWorkoutJson)
        }

        user.workoutHistory = {};
        user.workoutHistory = history
        user.activityLog[d.getMonth()] += 1;

        await user.save();
        res.status(200).json(user);
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

        const calendar = { ...user.generalWeeklyCalendar };
        //add new entries
        for (let weekday of updatedWorkout.calendarDay) {
            if (!calendar[weekday].workoutName) {
                calendar[weekday] = { ...calendar[weekday] as ICalendarWorkoutName, workoutName: updatedWorkout.workoutName };
                continue;
            }
            else if (calendar[weekday].workoutName != updatedWorkout.workoutName) {
                calendar[weekday] = { ...calendar[weekday] as ICalendarWorkoutName, workoutName: updatedWorkout.workoutName };
            }
            else {
                continue
            }
        }

        //remove days not in the new callendar
        for (let weekday in calendar) {
            if (calendar[weekday as IWeekDay].workoutName == updatedWorkout.workoutName) {
                if (!updatedWorkout.calendarDay.includes(weekday as IWeekDay)) {
                    calendar[weekday as IWeekDay] = { ...calendar[weekday as IWeekDay], workoutName: '' };
                    continue;
                }
            }
        }
        user.generalWeeklyCalendar = calendar;
        //if you want a repeated workout routine
        user.monthlyCalendar = createMonthlyCalendar(calendar);
        user.yearWeeklyCalendar = createNumberedWeeklyCalendar(calendar);
        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
})

workoutRoute.patch('/updateWorkoutDate/:year-:month-:date', async (req: Request, res: Response, next: NextFunction) => {
    const request: IReqVerification = req as IReqVerification;
    const params: { year: string, month: string, date: string } = req.params as { year: string, month: string, date: string };
    const body: { name: string } = req.body as { name: string };

    const monthIndex: IMonthName[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days: IWeekDay[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    try {
        const user = await User.findById(request.token.id);
        if (!user) throw new Error('user DNE');
        const monthNumber = Number(params.month);
        const dateNumber = Number(params.date);
        const yearNumber = Number(params.year)
        if (!monthNumber || !dateNumber || !yearNumber) throw new Error('user DNE');
        const month = monthIndex[monthNumber - 1]
        //{name: workoutName, updated: true}
        const newWorkout: ICalendarWorkoutName = { ...user.monthlyCalendar[month][dateNumber] };
        newWorkout.updated = true;
        newWorkout.workoutName = body.name;

        // {3: workoutObject }
        const newMonthlyObject = { ...user.monthlyCalendar[month] };
        newMonthlyObject[dateNumber] = newWorkout;

        const newCalendar = { ...user.monthlyCalendar };
        newCalendar[month] = newMonthlyObject
        user.monthlyCalendar = newCalendar;


        //-1 since its a 0 based index
        const weekWhichIsUpdated = moment().year(yearNumber).month(month).date(dateNumber).week() - 1;
        const weekdayIndex = moment().year(yearNumber).month(month).date(dateNumber).day();

        const newWeek: IWeeklyCalendar = { ...user.yearWeeklyCalendar[weekWhichIsUpdated] }
        newWeek[days[weekdayIndex]] = newWorkout;

        const newWeeklyCalendar: INumberedWeekCalendar = { ...user.yearWeeklyCalendar };
        newWeeklyCalendar[weekWhichIsUpdated] = newWeek;

        user.yearWeeklyCalendar = newWeeklyCalendar

        await user.save();
    }
    catch (error) {
        next(error);
    }

    res.status(200).json({ message: "Saved Successfully" });
})

workoutRoute.get('/:workoutName', async (req: Request, res: Response, next: NextFunction) => {
    const request: IReqVerification = req as IReqVerification;
    const params: { workoutName: string } = req.params as { workoutName: string };
    try {
        const user = await User.findById(request.token.id);
        if (!user) throw new Error('user DNE');
        let theWorkout: IWorkout | null = null;

        for (let workout of user.workouts) {
            if (workout.workoutName == params.workoutName) {
                theWorkout = workout;
                break;
            }
        }

        res.status(200).json(theWorkout);

    } catch (error) {
        next(error);
    }
});

workoutRoute.delete('/:workoutName/deleteWorkout', async (req: Request, res: Response, next: NextFunction) => {
    const request: IReqVerification = req as IReqVerification;
    const params: { workoutName: string } = req.params as { workoutName: string };
    const days: IWeekDay[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    try {
        const user = await User.findById(request.token.id);
        if (!user) throw new Error('user DNE');
        const newCalendar: IWeeklyCalendar = {} as IWeeklyCalendar;
        const newWorkoutPlan: IWorkout[] = [...user.workouts]

        for (const weekDay of days) {
            newCalendar[weekDay] = { ...user.generalWeeklyCalendar[weekDay] }
        }

        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName == params.workoutName) {

                for (let days of user.workouts[i].calendarDay) {
                    newCalendar[days].workoutName = "";
                    newCalendar[days].updated = false;
                }
                newWorkoutPlan.splice(i, 1);
                break;
            }

            if (i == user.workouts.length) {
                throw new Error('workout not found');
            }
        }

        user.generalWeeklyCalendar = newCalendar;
        user.workouts = newWorkoutPlan;

        user.monthlyCalendar = createMonthlyCalendar(newCalendar)
        user.yearWeeklyCalendar = createNumberedWeeklyCalendar(newCalendar);
        await user.save();
        res.status(200).json(user);

    }
    catch (error) {
        next(error);
    }
});

//body is the IWorkoutStartFinish
workoutRoute.patch('/updatePreviousWorkout', async (req: Request, res: Response, next: NextFunction) => {
    const verRequest: IReqVerification = req as IReqVerification
    try {
        const user = await User.findById(verRequest.token.id);
        if (!user) throw new Error('user DNE');
        const userFinishedWorkout: IWorkoutStartFinish = req.body as IWorkoutStartFinish;

        user.previousWorkout = { ...userFinishedWorkout };
        await user.save();
        res.status(200).json(user)
    }
    catch (error) {
        next(error)
    }
})

export default workoutRoute;