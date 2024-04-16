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
const IWorkout_1 = require("../interfaces/IWorkout");
const saveWorkoutRoute = express_1.default.Router();
saveWorkoutRoute.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const newWorkoutJson = req.body;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        if (!(0, IWorkout_1.isWorkoutCorrect)(newWorkoutJson)) {
            throw new Error('incorrect workout format');
        }
        for (let workouts of user.workouts) {
            if (workouts.workoutName === newWorkoutJson.workoutName) {
                throw new Error('workout exists');
            }
        }
        user.workouts.push(newWorkoutJson);
        for (let weekday of newWorkoutJson.calendarDay) {
            if (!user.weeklyCalendar.has(weekday)) {
                user.weeklyCalendar.set(weekday, newWorkoutJson);
                continue;
            }
        }
        yield user.save();
        res.send('Workout added Successfully');
    }
    catch (error) {
        next(error);
    }
}));
exports.default = saveWorkoutRoute;
