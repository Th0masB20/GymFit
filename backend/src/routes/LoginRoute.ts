import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ILogin, { isLoginCorrect } from '../interfaces/ILogin';
import User from '../models/User';

const loginRouter = express.Router();

loginRouter.post('/loginUser', async (req: Request<{}, {}, ILogin>, res: Response, next: NextFunction) => {
    const payload: ILogin = req.body;
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

        const ticket = await jwt.sign({ id: user.id }, process.env.SECRET_STRING as jwt.Secret, { expiresIn: '1m' });
        res.cookie('tick', ticket, {
            maxAge: 1000 * 60 * 60,
            sameSite: 'strict',
            httpOnly: true
        });
        res.send('Successfully Signed In');
    }
    catch (error) {
        next(error);
    }
})

export default loginRouter;