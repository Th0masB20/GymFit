import {Request,Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { IReqVerification, ICookieTicket, IUserToken } from '../interfaces/IAuthorization';

async function authorize(req:Request, _res:Response, next:NextFunction)
{
    const token:ICookieTicket = req.cookies as ICookieTicket;
    try
    {
        const validation = jwt.verify(token.tick, process.env.SECRET_STRING as jwt.Secret) as IUserToken;
        (req as IReqVerification).token = validation;
        next();
    }
    catch(error)
    {
        next(error);
    }
}

export default authorize;