import { where } from "sequelize/types";
import { Service } from "typedi";
import Logger from "../config/winstonlogger";
import bcrypt from "bcryptjs";
import { errJsonMsg, catchError, generateToken} from "../utility/constdata";
import { User, UserInstance } from "../entity/user";

@Service()
export class UserService {

    constructor(public IUserModal: User) { }

    async createUser(user: UserInstance) {
        try {
            Logger.info(' user modal object::' + JSON.stringify(user));
            const checkemail = await this.IUserModal.user.findOne({where : { email: user.email }});
            if (!(checkemail && checkemail.dataValues && checkemail.dataValues.email)) {
                const res = await this.IUserModal.user.create(user);
                return { user_id: res.dataValues.id, add_user: "success" };
            } else {
                return { status :508 ,data : "The Email already in use!"}
            }
        } catch (e) {
            return catchError(e, "userservice", "createUser")
        }
    };
    async loginUser(user: UserInstance) {
        try {
            // Logger.info(' user modal object::' + JSON.stringify(user));
            const checkemail = await this.IUserModal.user.findOne({where : { email: user.email }});
            if (checkemail && checkemail.dataValues && checkemail.dataValues.password) {
                const passwordMatch = await bcrypt.compareSync(user.password, checkemail.dataValues.password);
                if (passwordMatch) {
                    const theToken = generateToken(checkemail.dataValues.email);
                    return { user_id: checkemail.dataValues.id, accessToken: theToken };
                } else {
                    return { status :508 ,data : "Invalid user credentials!"};
                }
            } else {
                return { status :508 ,data : "User does not exist!"};
            }
        } catch (e) {
            return catchError(e, "userservice", "loginUser")
        }
    };
    async findAllusers() {
        try {
            const res = await this.IUserModal.user.findAll();
            // console.log(res.every(user => user instanceof this.IUserModal.user)); // true
            // console.log("All users:", JSON.stringify(res, null, 2))
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
                return {status:508 ,data : "user is does not exist!"};
            }
        } catch (e) {
            return catchError(e, "userservice", "findUserById");
        }
    };
    async delteUser(user: UserInstance) {
        try {
            // Logger.info(' user modal object::' + JSON.stringify(user));
            const res = await this.IUserModal.user.destroy({ where: { id: user } });
            return (res > 0) ? "success" : "failure";
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
                return (res[0] > 0) ? "success" : "failure";
            } else {
                return {status:508 ,data : "user is does not exist!"};
            }
        } catch (e) {
            return catchError(e, "userservice", "updateUser");
        }
    }
}