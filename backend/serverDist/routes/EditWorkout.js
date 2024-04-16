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
const editWorkoutRoute = express_1.default.Router();
editWorkoutRoute.patch('/:name', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const param = req.params;
    const request = req;
    const updatedWorkout = req.body;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName === param.name) {
                user.workouts[i] = updatedWorkout;
                break;
            }
        }
        yield user.save();
        res.send('User Successfully Updated');
    }
    catch (error) {
        next(error);
    }
}));
exports.default = editWorkoutRoute;
