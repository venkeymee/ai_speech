import { Sequelize } from "sequelize";
import { Service } from "typedi";
import Logger from "./winstonlogger";


@Service()
export class DataBaseConfig {
 sequelize:Sequelize;       
     
      constructor(){
        Logger.info("dbConfig:::constructor::connectionString::"+process.env.DB_CONNECTION);
        
        this.sequelize = new Sequelize(process.env.DB_CONNECTION);
      }
   getConnection(){
       Logger.info("dbConfig:::GetConnection::connectionString::"+process.env.DB_CONNECTION);

       this.sequelize=(this.sequelize)?this.sequelize:new Sequelize(process.env.DB_CONNECTION);
        return this.sequelize;
   }
    async checkConnection(){
       await this.getConnection().authenticate()
        .then(() => {
          Logger.info('⚡️ [DataBase]: Connection has been established successfully.');
        })
        .catch(err => {
          Logger.error('⚡️ [DataBase]:Unable to connect to the database:', err);
        });
    }
   


}