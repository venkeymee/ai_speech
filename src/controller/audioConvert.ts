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

/**
 * @TODO move this below const to const files or util file
 */
export const CONST_PARAMS = {
    AUDIO_FILE_PATH: '../../ai_audios/'
}


const user = Container.get(User);

const router = express.Router();

router.post('/upload_audio_file', async (req: ICustomRequest, res) => {
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


});

export default router;