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
}
import path from 'path';
import fs, { mkdir, mkdirSync } from 'fs';
import { User } from '../entity/user';
import { AudioServices } from '../services/audioConvertService';
import responseMesg, { RESPONSEMSG, RESPONSESTATUS, RESPONSE_EMPTY_DATA } from '../responsemessages/responseMessages';

/**
 * @TODO move this below const to const files or util file
 */
export const CONST_PARAMS = {
    AUDIO_FILE_PATH: '../../ai_audios/'
}


const audioServices = Container.get(AudioServices);

const router = express.Router();

router.post('/upload_audio_file', async (req:ICustomRequest, res) => {
    let uploadedfile;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    Logger.info("audiConver::upload_audio_file::name" + fs.existsSync(CONST_PARAMS.AUDIO_FILE_PATH));
    uploadedfile = req.files.audio;
   
    if (!fs.existsSync(path.join(__dirname, CONST_PARAMS.AUDIO_FILE_PATH))) 
        { mkdirSync(path.join(__dirname, CONST_PARAMS.AUDIO_FILE_PATH)) }
    const filePath = path.join(__dirname, CONST_PARAMS.AUDIO_FILE_PATH.concat(uploadedfile.name));
   
    uploadedfile.mv(filePath, (err) => {
        if (err) { return res.status(500).send(err); }
        res.send({ status: 200, message: "fileuploaded successful.." });

    });

    // const audio_file =  {
    //     user_id: req.body.user_id,
    //     wav_file_path :req.body.wav_file_path || '',
    //     text_file_path : req.body.text_file_path || '',
    //     status : req.body.status || '',
    // }

//     const result  = await audioServices.uploadTextFileorWaveFile(<any>audio_file);
//     const response = (result instanceof Error)
//         ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
//         : responseMesg(RESPONSESTATUS.SUCCESS, RESPONSEMSG.RETRIVE_SUCCESS, result)
//     return res.send(response);
});

export default router;