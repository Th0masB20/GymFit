"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWorkoutCorrect = void 0;
const utilityFunctions_1 = require("../utilities/utilityFunctions");
const IExercise_1 = require("./IExercise");
function isWorkoutCorrect(obj) {
    if ((0, utilityFunctions_1.isObjectEmpty)(obj))
        return false;
    if (!obj.workoutName)
        return false;
    if (!obj.calendarDay)
        return false;
    if (!obj.exercises)
        return false;
    if (!obj.previousWorkout)
        return false;
    for (let exercises of obj.exercises) {
        if (!(0, IExercise_1.isExerciseCorrect)(exercises)) {
            return false;
        }
    }
    return true;
}
exports.isWorkoutCorrect = isWorkoutCorrect;
