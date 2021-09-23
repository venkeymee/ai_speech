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
import { audioConvertServices } from '../services/audioConvertService';
import responseMesg, { RESPONSEMSG, RESPONSESTATUS, RESPONSE_EMPTY_DATA } from '../responsemessages/responseMessages';
import { apiResponse } from '../utility/constdata';

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
        return res.status(400).send('No files were uploaded.');
    }
    Logger.info("audiConver::upload_audio_file::name" + fs.existsSync(CONST_PARAMS.AUDIO_FILE_PATH));
    uploadedfile = req.files.audio;

    if (!fs.existsSync(path.join(__dirname, CONST_PARAMS.AUDIO_FILE_PATH))) { mkdirSync(path.join(__dirname, CONST_PARAMS.AUDIO_FILE_PATH)) }
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

    //     const result  = await audioConvertServicess.uploadTextFileorWaveFile(<any>audio_file);
    //     const response = (result instanceof Error)
    //         ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
    //         : responseMesg(RESPONSESTATUS.SUCCESS, RESPONSEMSG.RETRIVE_SUCCESS, result)
    //     return res.send(response);
});

router.get('/download', async (req, res) => {
    const filename = req.body.file;
    const directoryPath = path.join(__dirname, '../../tempuploads/');
    res.download(directoryPath + filename, filename, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Unable to read ' + filename + ' file. Please check',
            });
    }
});
});

router.get('/audiobyid', async (req, res) => {
    const audio = req.query.id;
    const result = await audioConvertServicess.findAudioById(<any>audio)
    return res.send(apiResponse(result,RESPONSEMSG.RETRIVE_SUCCESS));
})

router.get('/all-audios', async (req, res) => {
    const result = await audioConvertServicess.findAllAudios();
    return res.send(apiResponse(result,RESPONSEMSG.RETRIVE_SUCCESS));
})

router.post('/delete-audio', async (req, res) => {
    const audio = req.body.id;
    const result = await audioConvertServicess.delteAudio(audio)
    return res.send(apiResponse(result,RESPONSEMSG.DELETE_SUCCESS));
})

router.post('/update-audio', async (req, res) => {
    const audio = req.body;
    const result = await audioConvertServicess.updateAudio(audio)
  return res.send(apiResponse(result,RESPONSEMSG.UPDATE_SUCCESS));  
})


export default router;