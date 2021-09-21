import { Service } from "typedi";
import Logger from "../config/winstonlogger";
import { User, UserInstance } from "../entity/user";

@Service()
export class UserService{

    constructor(public IUserModal:User){

    }

    async createUser(user:UserInstance){

       try{
      Logger.info(' user modal obkect::'+JSON.stringify(user));
       const res=await this.IUserModal.user.create(user);
       return res.dataValues;
    }catch(e){
        Logger.error("UserService::createUser::excepiotn::");
        return e;

    }
    }
}