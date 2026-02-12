import { isObjectEmpty } from "../utilities/utilityFunctions";

export interface IRegisterReqest extends Request {
    name: string,
    lastName: string,
    email: string,
    password: string,
}

export function isRegisterCorrect(obj: IRegisterReqest): boolean {
    if (isObjectEmpty(obj)) return false;
    if (!obj.email) return false;
    if (!obj.password) return false;
    if (!obj.name) return false;
    if (!obj.lastName) return false;

    return true;
}

