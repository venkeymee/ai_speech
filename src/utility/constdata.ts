import { Service } from "typedi";
import Logger from "../config/winstonlogger";
import {User,UserInstance} from "../entity/user";
import jwt from "jsonwebtoken";

@Service()
class constData {
    constructor(public IUserModal: User) { }

     findUser(user){
         console.log("user",user);
        return this.IUserModal.user.findOne({where : user});
    }
}

const userData = "user is does not exists in records!";

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

export {
    userData,
    constData,
    catchError,
    generateToken,errJsonMsg
}