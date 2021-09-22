import { Sequelize } from "sequelize";
import { Service } from "typedi";
import Logger from "./winstonlogger";


@Service()
export class DataBaseConfig {
 sequelize:Sequelize;       
     
      constructor(){
        Logger.info("dbConfig:::constructor::connectionString::"+process.env.DB_CONNECTION);
         // with database, username, and password 
        this.sequelize = new Sequelize('ai_speech', 'root', '', {
          host: 'localhost',
          dialect: 'mysql'// pick one of 'mysql','sqlite','postgres','mssql',
        });
      }
   getConnection(){
       Logger.info("dbConfig:::GetConnection::connectionString::"+process.env.DB_CONNECTION);
      // with database, username, and password 
       this.sequelize=(this.sequelize)?this.sequelize:new Sequelize('ai_speech', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'// pick one of 'mysql','sqlite','postgres','mssql',
      });;
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