import { where } from "sequelize/types";
import { Service } from "typedi";
import Logger from "../config/winstonlogger";
import { catchError} from "../apiresponse/responseTemplate";
import { AudioToTextSpeech,Audio_To_Text_Speech } from "../entity/audioToSpeech";

@Service()
export class audioConvertServices {

    constructor(public IAudioToTextModal: AudioToTextSpeech) { }

    // async uploadTextFileorWaveFile(audio_file: Audio_To_Text_Speech) {
    //     try {
    //         // Logger.info(' audio modal object::' + JSON.stringify(audio_file));
    //         const res = await this.IAudioToTextModal.audio.create(audio_file);
    //         return res;
    //     } catch (e) {
    //         return catchError(e, "audioConvertService", "uploadTextFileorWaveFile")

    //     }
    // }
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
}