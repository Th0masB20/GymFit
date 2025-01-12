"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (error, _req, res, next) => {
    if (error.message == 'wrong inputs') {
        return res.status(400).json({ error: 'Please fill out all fields' });
    }
    if (error.message == "jwt must be provided access") {
        return res.status(401).json({ error: "Token expired or not provided" });
    }
    if (error.message == "jwt must be provided refresh") {
        return res.status(401).json({ error: "Token expired" });
    }
    if (error.message == 'jwt expired access') {
        return res.status(403).json({ error: 'Access token expired' });
    }
    if (error.message == 'jwt expired refresh') {
        return res.status(403).json({ error: 'Need to login' });
    }
    if (error.message == 'existing email') {
        return res.status(400).json({ error: 'Email already in our system, enter a new Email' });
    }
    if (error.message == 'existing password') {
        return res.status(400).json({ error: 'Password already exists, enter a new Password' });
    }
    if (error.message == 'incorrect login') {
        return res.status(400).json({ error: 'Username or Password is empty' });
    }
    if (error.message == 'incorrect password') {
        return res.status(400).json({ error: 'Incorrect password, try again' });
    }
    if (error.message == 'user DNE') {
        return res.status(400).json({ error: 'Email does not exist' });
    }
    if (error.message == 'incorrect workout format') {
        return res.status(400).json({ error: 'workout json received is incorrect' });
    }
    if (error.message == 'workout exists') {
        return res.status(400).json({ error: 'This Workout Already Exists' });
    }
    if (error.message == 'day occupied') {
        return res.status(400).json({ error: 'One or more days are occupied with an existing workout' });
    }
    if (error.message == 'workout not found') {
        return res.status(400).json({ error: 'This workout does not exist' });
    }
    if (error.message == 'update user fail') {
        return res.status(400).json({ error: 'User could not be updated' });
    }
    next(error);
};
exports.default = ErrorHandler;
