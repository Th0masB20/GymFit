"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (error, _req, res, next) => {
    if (error.message == 'wrong inputs') {
        return res.status(400).send('Please fill out all fields');
    }
    if (error.message == 'existing email') {
        return res.status(400).send('Email already in our system, enter a new Email');
    }
    if (error.message == 'existing password') {
        return res.status(400).send('Password already exists, enter a new Password');
    }
    if (error.message == 'incorrect login') {
        return res.status(400).send('Incorrect Login, try again');
    }
    if (error.message == 'incorrect password') {
        return res.status(400).send('Incorrect password, try again');
    }
    if (error.message == 'user DNE') {
        return res.status(400).send('Email does not exist, register first before logging in');
    }
    if (error.message == 'jwt expired') {
        return res.status(400).send('authoritation failed');
    }
    if (error.message == 'incorrect workout format') {
        return res.status(400).send('workout json received is incorrect');
    }
    if (error.message == 'workout exists') {
        return res.status(400).send('This Workout Already Exists');
    }
    if (error.message == 'day occupied') {
        return res.status(400).send('One or more days are occupied with an existing workout');
    }
    if (error.message == 'workout not found') {
        return res.status(400).send('This workout does not exist');
    }
    next(error);
};
exports.default = ErrorHandler;
