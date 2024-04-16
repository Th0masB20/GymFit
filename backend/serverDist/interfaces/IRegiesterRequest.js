"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegisterCorrect = void 0;
const utilityFunctions_1 = require("../utilities/utilityFunctions");
function isRegisterCorrect(obj) {
    console.log(obj.password);
    if ((0, utilityFunctions_1.isObjectEmpty)(obj))
        return false;
    if (!obj.email)
        return false;
    if (!obj.password)
        return false;
    if (!obj.name)
        return false;
    if (!obj.lastName)
        return false;
    return true;
}
exports.isRegisterCorrect = isRegisterCorrect;
