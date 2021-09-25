import { where } from "sequelize/types";
import { Service } from "typedi";
import Logger from "../config/winstonlogger";
import bcrypt from "bcryptjs";
import {  catchError, generateToken} from "../apiresponse/responseTemplate";
import { User, UserInstance } from "../entity/user";

@Service()
export class UserService {

    constructor(public IUserModal: User) { }

    async createUser(user: UserInstance) {
        try {
            // Logger.info(' user modal object::' + JSON.stringify(user));
            const checkemail = await this.IUserModal.user.findOne({where : { email: user.email }});
            if (!(checkemail && checkemail.dataValues && checkemail.dataValues.email)) {
                const res = await this.IUserModal.user.create(user);
                return { user_id: res.dataValues.id, add_user: "success" };
            } else {
                return { status :422 ,data : "The Email already in use!"}
            }
        } catch (e) {
            return catchError(e, "userservice", "createUser")
        }
    };
    async loginUser(user: UserInstance) {
        try {
            // Logger.info(' user modal object::' + JSON.stringify(user));
            const checkemail = await this.IUserModal.user.findOne({where : { email: user.email }});
            if (checkemail && checkemail.dataValues && checkemail.dataValues.email == user.email) {
                // const passwordMatch = await bcrypt.compareSync(user.password, checkemail.dataValues.password);
                if (checkemail && checkemail.dataValues && checkemail.dataValues.password == user.password) {
                    const theToken = generateToken(checkemail.dataValues.email);
                    // console.log("thevalues",Object.assign(checkemail.dataValues,theToken))
                    return Object.assign(checkemail.dataValues,{accesToken : theToken});
                } else {
                    return { status :401 ,data : "Invalid user credentials!"};
                }
            } else {
                return { status :401 ,data : "User does not exist!"};
            }
        } catch (e) {
            return catchError(e, "userservice", "loginUser")
        }
    };
    async findAllusers() {
        try {
            const res = await this.IUserModal.user.findAll();
            return res;
        } catch (e) {
            return catchError(e, "userservice", "findAllusers")

        }
    };
    async findUserById(user: UserInstance) {
        try {
            // Logger.info(' user modal object::' + JSON.stringify(user));
            const res = await this.IUserModal.user.findOne({ where: { id: user } });
            if (res) {
                return res.dataValues;
            } else {
                return {status:422 ,data : "user is does not exist!"};
            }
        } catch (e) {
            return catchError(e, "userservice", "findUserById");
        }
    };
    async delteUser(user: UserInstance) {
        try {
            // Logger.info(' user modal object::' + JSON.stringify(user));
            const res = await this.IUserModal.user.destroy({ where: { id: user } });
            return (res > 0) ? "success" : {status: 422, data: "failure"};
        } catch (e) {
            return catchError(e, "userservice", "delteUser");
        }
    };
    async updateUser(user: UserInstance) {
        try {
            // Logger.info(' user modal object::' + JSON.stringify(user));
            const finduserbyid = await this.IUserModal.user.findOne({where : { email: user.email }});
            if (finduserbyid.dataValues) {
                const res = await this.IUserModal.user.update(user, { where: { id: user.id } });
                // Logger.info("userservice:::updateuser::info"+ res);
                return (res[0] > 0) ?  "success" : {status: 422, data: "failure"};
            } else {
                return {status:422 ,data : "user is does not exist!"};
            }
        } catch (e) {
            return catchError(e, "userservice", "updateUser");
        }
    }
}