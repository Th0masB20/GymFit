import express, { Response, Request, NextFunction } from 'express'
import { ICookieTicket, IUserToken } from '../interfaces/IAuthorization';
import jwt from 'jsonwebtoken'

const refreshTokenRoute = express.Router();

refreshTokenRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const token: ICookieTicket = req.cookies as ICookieTicket;
    try {
        //if validation is wrong it will normally throw an error
        const validation = jwt.verify(token.ticket_r, process.env.REFRESH_STRING as jwt.Secret) as IUserToken;
        //create new access token and set it in the cookies
        const newAccessTicket = await jwt.sign({ id: validation.id }, process.env.SECRET_STRING as jwt.Secret, { expiresIn: '20s' })
        res.cookie('ticket', newAccessTicket, {
            maxAge: 1000 * Number(process.env.ACCESS_TIME),
            sameSite: 'none',
            httpOnly: true,
            secure: true,
            domain: process.env.FRONTEND_URL,
        });
        res.status(200).end();
    }
    catch (error) {
        (error as Error).message += ' refresh';
        next(error);
    }
})

export default refreshTokenRoute;