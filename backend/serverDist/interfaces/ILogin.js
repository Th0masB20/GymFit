"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoginCorrect = void 0;
const utilityFunctions_1 = require("../utilities/utilityFunctions");
function isLoginCorrect(obj) {
    if ((0, utilityFunctions_1.isObjectEmpty)(obj))
        return false;
    if (!obj.email)
        return false;
    if (!obj.password)
        return false;
    return true;
}
exports.isLoginCorrect = isLoginCorrect;
