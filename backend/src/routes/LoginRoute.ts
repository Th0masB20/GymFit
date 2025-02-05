import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ILogin, { isLoginCorrect } from '../interfaces/ILogin';
import User from '../mongodb/models/User';
import getExercises from '../utilities/GetExercises';

const loginRouter = express.Router();

loginRouter.post('/loginUser', async (req: Request<{}, {}, ILogin>, res: Response, next: NextFunction) => {
    const payload: ILogin = req.body;
    console.log("trying to login")

    try {
        if (!isLoginCorrect(payload)) {
            throw new Error('incorrect login');
        }
        const user = await User.findOne({ email: payload.email });

        if (!user) {
            throw new Error('user DNE');
        }
        const isLoggedIn = await bcrypt.compare(payload.password, user.password);

        if (!isLoggedIn) {
            throw new Error('incorrect password');
        }

        const accessToken = await jwt.sign({ id: user.id }, process.env.SECRET_STRING as jwt.Secret, { expiresIn: `${Number(process.env.ACCESS_TIME)}s` });
        const refreshToken = await jwt.sign({ id: user.id }, process.env.REFRESH_STRING as jwt.Secret, { expiresIn: `${Number(process.env.REFRESH_TIME)}s` })

        res.cookie('ticket', accessToken, {
            maxAge: 1000 * Number(process.env.ACCESS_TIME),
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
        });

        res.cookie('ticket_r', refreshToken, {
            maxAge: 1000 * Number(process.env.REFRESH_TIME),
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
        });

        console.log("has logged in")
        //once its logged in, get exercises from api and store it
        const exercises = await getExercises();
        user.JsonExercise = exercises;
        await user.save();
        res.status(200).json({ message: 'Successfully Signed In' });
    }
    catch (error) {
        next(error);
    }
})

export default loginRouter;