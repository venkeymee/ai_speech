import Logger from "../config/winstonlogger";
import jwt from "jsonwebtoken";
import responseMesg, { RESPONSEMSG, RESPONSESTATUS, RESPONSE_EMPTY_DATA } from "../responsemessages/responseMessages";

const catchError = (e,service,method) => {
    Logger.error(`${service}::${method}::exception or error::",${e}`);
    return {status:508 ,data:e.message};
}

function generateToken(value)  {
    return jwt.sign({ id: value }, 'the-super-strong-secrect', { expiresIn: '2h' });

}
const apiResponses =(result,res,msg)=>{
    if (result && result.status == 508) {
        return res.status(result.status || 200).send(responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, result.data));
    } else {
        const response:any = (result instanceof Error)
        ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
        : responseMesg(RESPONSESTATUS.SUCCESS, msg, result)
        return res.status(response.status || 200).send(response);
    }
}

export {
    catchError,
    generateToken,
    apiResponses
}