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
const finishWorkoutRoute = express_1.default.Router();
finishWorkoutRoute.post('/submit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const finishWorkoutJson = req.body;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        const d = new Date();
        //finish workout has time attribute
        user.workoutHistory.set(`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`, finishWorkoutJson);
        user.activityLog[d.getMonth()] += 1;
        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName == finishWorkoutJson.workoutName) {
                user.workouts[i] = Object.assign(Object.assign({}, user.workouts[i]), { previousWorkout: finishWorkoutJson });
                break;
            }
        }
        yield user.save();
        console.log(user.workouts[0]);
        res.status(200).send('Finished Workout');
    }
    catch (error) {
        next(error);
    }
}));
exports.default = finishWorkoutRoute;
