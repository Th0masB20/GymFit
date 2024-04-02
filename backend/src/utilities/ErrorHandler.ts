import { NextFunction, Response, Request, ErrorRequestHandler } from "express";

const ErrorHandler:ErrorRequestHandler = (error:any, _req:Request, res:Response, next:NextFunction) =>
{
    console.log('in here: ' + error.message);
    if(error.message == 'wrong inputs')
    {
        return res.status(400).send('Please fill out all fields');
    }
    if(error.message == 'existing email')
    {
        return res.status(400).send('Email already in our system, enter a new Email');
    }
    if(error.message == 'existing password')
    {
        return res.status(400).send('Password already exists, enter a new Password');
    }
    if(error.message == 'incorrect login')
    {
        return res.status(400).send('Incorrect Login, try again');
    }
    if(error.message == 'incorrect password')
    {
        return res.status(400).send('Incorrect password, try again');
    }
    if(error.message == 'user DNE')
    {
        return res.status(400).send('Email does not exist, register first before logging in');
    }
    if(error.message == 'jwt expired')
    {
        return res.status(400).send('authoritation failed');
    }
    if(error.message == 'incorrect workout format')
    {
        return res.status(400).send('workout json received is incorrect');
    }
    
    next(error);
}

export default ErrorHandler;