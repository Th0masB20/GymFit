import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express';

//for cookies
export interface ICookieTicket extends Request {
    ticket: string;
    ticket_r: string;
}

//for jwt.verify return 
//user id
export interface IUserToken extends JwtPayload {
    id: string;
}

//for req.token 
export interface IReqVerification extends Request {
    token: IUserToken;
}
