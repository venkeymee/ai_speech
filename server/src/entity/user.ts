import { DataTypes, Model } from "sequelize"
import { Service } from "typedi";
import { DataBaseConfig } from "../config/dbconfig";

export interface UserInstance extends Model {
    id : number; // Note that the `null assertion` `!` is required in strict mode.
    firstname: string;
    lastname : string | null; // for nullable fields
    email : string;
    password:string;
    address:string;
    status: number,
    isAdmin : number
}
  

@Service()
export class User{
    public user;
    constructor(public dataBaseConfig:DataBaseConfig){
        this.user=this.dataBaseConfig.sequelize.define<UserInstance>("users",
        {id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
          },
          lastname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
          },
          firstname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
          },
          email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
          },
          password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
          },
          address: {
            type: new DataTypes.STRING(500),
            allowNull: true,
          },
          status: {
            type: new DataTypes.INTEGER,
            defaultValue : '0',
            allowNull: true,
          },
          isAdmin: {
            type: new DataTypes.INTEGER,
            defaultValue : '0',
            allowNull: true,
          }
        })
    }


}