import Logger from "../config/winstonlogger";
import jwt from "jsonwebtoken";
import responseMesg, { RESPONSEMSG, RESPONSESTATUS, RESPONSE_EMPTY_DATA } from "../responsemessages/responseMessages";

const catchError = (e,service,method) => {
    Logger.error(`${service}::${method}::exception or error::",${e}`);
    return e;
}

function generateToken(value)  {
    return jwt.sign({ id: value }, 'the-super-strong-secrect', { expiresIn: '2h' });

}
const errJsonMsg = (err) => {
    return { code: 508, status: 'FAILD', message: `${err}` }
}
const apiResponse =(result,msg)=>{
    return (result instanceof Error)
        ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
        : responseMesg(RESPONSESTATUS.SUCCESS, msg, result)
}

export {
    catchError,
    generateToken,
    errJsonMsg,
    apiResponse
}