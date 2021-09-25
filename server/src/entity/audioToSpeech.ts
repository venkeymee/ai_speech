import { DataTypes, Model } from "sequelize"
import { Service } from "typedi";
import { DataBaseConfig } from "../config/dbconfig";

// interface Audio_To_Text_Speech extends Model {
//     id : number; // Note that the `null assertion` `!` is required in strict mode.
//     firstname: string;
//     lastname : string | null; // for nullable fields
//     email : string;
//     password:string;
//     address:string;
// }
export interface Audio_To_Text_Speech extends Model {
    id : number; // Note that the `null assertion` `!` is required in strict mode.
    user_id: string;
    wav_file_path : string; // for nullable fields
    text_file_path : string;
    cmdOperationData : string;
    description : string,
    error_file_path : string;
    status : number;
}
  

@Service()
export class AudioToTextSpeech{
    public audio;
    constructor(public dataBaseConfig:DataBaseConfig){
        this.audio=this.dataBaseConfig.sequelize.define<Audio_To_Text_Speech>("audio_to_texts",
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
          },
          description: {
            type: new DataTypes.STRING(1500),
            allowNull: false,
          },
          error_file_path: {
            type: new DataTypes.STRING(1500),
            allowNull: false,
          },
          status: {
            type: new DataTypes.INTEGER,
            defaultValue : '0',
            allowNull: false,
          }
        })
    }


}