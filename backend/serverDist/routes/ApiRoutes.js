"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../mongodb/models/User"));
const mainUserRoutes = express_1.default.Router();
mainUserRoutes.get('/user', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('User DNE');
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
mainUserRoutes.get('/getCalendar', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('User DNE');
        res.status(200).json(user.generalWeeklyCalendar);
    }
    catch (error) {
        next(error);
    }
}));
mainUserRoutes.put('/updateUser', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const reqBody = req.body;
    try {
        const user = yield User_1.default.findOneAndUpdate({ _id: request.token.id }, { age: reqBody.age, height: reqBody.height }, { new: true });
        if (!user)
            throw new Error('update user fail');
        res.status(200).send();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = mainUserRoutes;
