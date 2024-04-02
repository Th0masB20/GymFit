import { isObjectEmpty } from "../utilities/utilityFunctions";

interface ILogin {
    email:string,
    password:string
}

export function isLoginCorrect(obj:ILogin){
    if(isObjectEmpty(obj)) return false;
    if(!obj.email) return false;
    if(!obj.password) return false;

    return true;
}

export default ILogin;