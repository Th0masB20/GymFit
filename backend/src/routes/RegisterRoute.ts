import express, { Router, Request, Response, NextFunction } from "express";
import { IRegisterReqest, isRegisterCorrect } from "../interfaces/IRegiesterRequest";
import { IUser } from "../interfaces/IUser";
import bcrypt from 'bcrypt';
import User from "../mongodb/models/User";

const registerRouter: Router = express.Router();

registerRouter.post('/submit', async (req: Request<{}, {}, IRegisterReqest>, res: Response, next: NextFunction) => {
    const payload: IRegisterReqest = req.body;
    try {
        if (!isRegisterCorrect(payload)) {
            throw new Error('wrong inputs');
        }
        if ((await User.find({ email: payload.email })).length != 0) {
            throw new Error('existing email');
        }

        const hashPassword = await bcrypt.hash(payload.password, 10);
        const newUserObject: IUser = {
            name: payload.name,
            lastName: payload.lastName,
            email: payload.email,
            password: hashPassword,
            age: undefined,
            height: undefined,
            workouts: [],
            activityLog: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            weeklyCalendar: new Map(),
            workoutHistory: new Map(),
        }

        const newUser = new User<IUser>(newUserObject);
        await newUser.save();

        res.json({ message: "Successfully Saved" });
    }
    catch (error) {
        next(error);
    }
}
);

export default registerRouter;

