import { DataTypes, Model } from "sequelize"
import { Service } from "typedi";
import { DataBaseConfig } from "../config/dbconfig";

interface Audio_To_Text_Speech extends Model {
    id : number; // Note that the `null assertion` `!` is required in strict mode.
    firstname: string;
    lastname : string | null; // for nullable fields
    email : string;
    password:string;
    address:string;
}
  

@Service()
export class AudioToTextSpeech{
    public user;
    constructor(public dataBaseConfig:DataBaseConfig){
        this.user=this.dataBaseConfig.sequelize.define<Audio_To_Text_Speech>("audio_to_text",
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
          },
          user_id: {
            type:  DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
          },
          wav_file_path: {
            type: new DataTypes.STRING(1500),
            allowNull: false,
          },
          text_file_path: {
            type: new DataTypes.STRING(1500),
            allowNull: false,
          }
        })
    }


}