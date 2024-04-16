"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExerciseCorrect = void 0;
const utilityFunctions_1 = require("../utilities/utilityFunctions");
function isExerciseCorrect(obj) {
    if ((0, utilityFunctions_1.isObjectEmpty)(obj))
        return false;
    if (!obj.exerciseName)
        return false;
    if (!obj.numberOfSets)
        return false;
    if (!obj.reps)
        return false;
    if (!obj.weights)
        return false;
    return true;
}
exports.isExerciseCorrect = isExerciseCorrect;
