import { where } from "sequelize/types";
import { Service } from "typedi";
import Logger from "../config/winstonlogger";
import { catchError} from "../utility/constdata";
import { AudioToTextSpeech,Audio_To_Text_Speech } from "../entity/audioToSpeech";
import * as child from 'child_process';
import path from 'path';
import util, { CustomPromisifyLegacy } from 'util';



@Service()
export class audioConvertServices {
     public CMdEexcution=util.promisify(child.exec);
    constructor(public IAudioToTextModal: AudioToTextSpeech) { }

    async uploadAudioFile(audio_file: Audio_To_Text_Speech) {
        try {
           /**
            * @Description : convert audio file to text file implimentation 
            * 
            */
            
            const audioInformation=await this.audio2Text(audio_file);
            const res = await this.IAudioToTextModal.audio.create(audioInformation);
            return res;
        } catch (e) {
            return catchError(e, "audioConvertService", "uploadTextFileorWaveFile")

        }
    }
    async findAllAudios() {
        try {
            return await this.IAudioToTextModal.audio.findAll();
            // console.log(res.every(audio => audio instanceof this.IAudioToTextModal.audio)); // true
            // console.log("All audios:", JSON.stringify(res, null, 2))
        } catch (e) {
            return catchError(e, "audioConvertService", "findAllaudios")

        }
    };
    async findAudioById(audio: Audio_To_Text_Speech) {
        try {
            // Logger.info(' audio modal object::' + JSON.stringify(audio));
            const res = await this.IAudioToTextModal.audio.findOne({ where: { id: audio } });
            if (res) {
                return res.dataValues;
            } else {
                return {status: 508, data : "audio is not exist"};
            }
        } catch (e) {
            return catchError(e, "audioConvertService", "findAudioById");
        }
    };
    async delteAudio(audio: Audio_To_Text_Speech) {
        try {
            // Logger.info(' audio modal object::' + JSON.stringify(audio));
            const res = await this.IAudioToTextModal.audio.destroy({ where: { id: audio } });
            return (res > 0) ? {status: 508, data: "success"} : {status: 508, data: "failure"};
        } catch (e) {
            return catchError(e, "audioConvertService", "delteAudio");
        }
    };
    async updateAudio(audio: Audio_To_Text_Speech) {
        try {
            // Logger.info(' audio modal object::' + JSON.stringify(audio));
            const findaudiobyid = await this.IAudioToTextModal.audio.findOne({where : {id: audio.id}});
            if (findaudiobyid.dataValues) {
                const res = await this.IAudioToTextModal.audio.update(audio, { where: { id: audio.id } });
                return (res[0] > 0) ? {status: 508, data: "success"} : {status: 508, data: "failure"};
            } else {
                return {status: 508, data : "audio is not exist"};
            }
        } catch (e) {
            return catchError(e, "audioConvertService", "updateAudio");
        }
    }

    async audio2Text(audioRequest){
        Logger.info(":::::Converting Audio to Text file  Begin:::");
       const toolFile=path.join(__dirname, '../../../a2text/SpeechToText.exe');  
       const commond=toolFile+" "+audioRequest.wav_file_path;
       Logger.info(":::::Execution Commond::::"+commond);
       try{
        let processData=await this.CMdEexcution(commond); 
        Logger.info(":::::Execution Commond Response Data"+processData);           
        const textFilePath=path.format({ ...path.parse(audioRequest.wav_file_path), base: undefined, ext: '.docx' })
        const audioInfo={...audioRequest,...{text_file_path:textFilePath,cmdOperationData:JSON.stringify(processData)}} as Audio_To_Text_Speech;
        Logger.info("AudioConvertService:audio2Text:after converting object::"+JSON.stringify(audioInfo))
        Logger.info(":::::Converting Audio to Text file  END:::");

        return audioInfo; 
      }catch(exe){
        Logger.error("AudioConvertService:audio2Text:Error"+exe);
        Logger.info(":::::Converting Audio to Text file  END:::");
        throw new Error("Error while converting audio to text::"+exe);
      };
     
    }
}