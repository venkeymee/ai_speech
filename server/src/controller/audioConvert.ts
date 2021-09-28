import { Container, Service, Inject } from 'typedi';

/** 
 * @Author: venkeymee@gmail.com
 * @description: Audio to Text file coverter Services. 
 * 
 * */
import express from 'express';
import Logger from '../config/winstonlogger';
interface ICustomRequest extends express.Request {
    files: any;
    user_id: string
}
import path from 'path';
import fs, { mkdir, mkdirSync } from 'fs';
import { User } from '../entity/user';
import { audioConvertServices } from '../services/audioConvertService';
import responseMesg, { RESPONSEMSG, RESPONSESTATUS, RESPONSE_EMPTY_DATA } from '../responsemessages/responseMessages';
import { apiResponses } from '../apiresponse/responseTemplate';
import { Audio_To_Text_Speech } from '../entity/audioToSpeech';

/**
 * @TODO move this below const to const files or util file
 */
export const CONST_PARAMS = {
    AUDIO_FILE_PATH: '../../ai_audios/'
}


const audioConvertServicess = Container.get(audioConvertServices);

const router = express.Router();

router.post('/upload_audio_file', async (req: ICustomRequest, res) => {
    let uploadedfile;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({status: 400, message : 'No files were uploaded.'});
    }
    Logger.info("audiConver::upload_audio_file::name" + fs.existsSync(CONST_PARAMS.AUDIO_FILE_PATH));
    uploadedfile = req.files.audio;
    let usrId=req.body.user_id || '';
    let error_file_path = req.body.error_file_path || '';
    let description = req.body.description || '';
    Logger.info("usrId:::",uploadedfile, "uploadfile::",uploadedfile);
    if (!fs.existsSync(path.join(__dirname, CONST_PARAMS.AUDIO_FILE_PATH))) { mkdirSync(path.join(__dirname, CONST_PARAMS.AUDIO_FILE_PATH)) }
    Logger.info("uploadfile:::",uploadedfile)
    const filePath = path.join(__dirname, CONST_PARAMS.AUDIO_FILE_PATH.concat(uploadedfile.name));
    uploadedfile.mv(filePath, async(err) => {
        if (err) {
             return res.send(responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)); 
            }
        const audioRequest={user_id:usrId,wav_file_path:filePath,error_file_path: error_file_path,description: description} as Audio_To_Text_Speech;
        const result= await audioConvertServicess.uploadAudioFile(audioRequest);
        return apiResponses(result,res,RESPONSEMSG.INSERT_SUCCESS);
    });
 
});

router.get('/download', async (req, res) => {
    const filename: any = req.query.filename;
    const directoryPath = path.join(__dirname, '../../ai_audios/');
    res.download(directoryPath + filename, filename, (err) => {
        if (err) {
            res.status(500).send({status :500,
                message: '' + filename + ' file not found!',
            });
    }
});
});

router.get('/audiobyid', async (req, res) => {
    const audio = req.query.id;
    const result = await audioConvertServicess.findAudioById(<any>audio)
    return apiResponses(result,res,RESPONSEMSG.RETRIVE_SUCCESS);
})

router.get('/all-audios', async (req, res) => {
    const result = await audioConvertServicess.findAllAudios();
    return apiResponses(result,res,RESPONSEMSG.RETRIVE_SUCCESS);
})

router.post('/delete-audio', async (req, res) => {
    const audio = req.body.id;
    const result = await audioConvertServicess.delteAudio(audio)
    return apiResponses(result,res,RESPONSEMSG.DELETE_SUCCESS);
})

router.post('/update-audio', async (req, res) => {
    const audio = req.body;
    const result = await audioConvertServicess.updateAudio(audio)
    return apiResponses(result,res,RESPONSEMSG.UPDATE_SUCCESS);  
})


export default router;