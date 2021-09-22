import { where } from "sequelize/types";
import { Service } from "typedi";
import Logger from "../config/winstonlogger";
import { catchError, userData } from "../utility/constdata";
import { AudioToTextSpeech,Audio_To_Text_Speech } from "../entity/audioToSpeech";

@Service()
export class AudioServices {

    constructor(public IAudioToTextModal: AudioToTextSpeech) { }

    async uploadTextFileorWaveFile(audio_file: Audio_To_Text_Speech) {
        try {
            // Logger.info(' user modal object::' + JSON.stringify(audio_file));
            const res = await this.IAudioToTextModal.audio.create(audio_file);
            return res;
        } catch (e) {
            return catchError(e, "audioConvertService", "uploadTextFileorWaveFile")

        }
    }
}