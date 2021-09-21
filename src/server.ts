import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors  from 'cors';
import morgan from 'morgan';
import Logger from './config/winstonlogger';
import { DataBaseConfig } from './config/dbconfig';
import Container from 'typedi';
import audioConvert from './controller/audioConvert';
 import userController from './controller/usercontroller';

import fileUpload from 'express-fileupload';
dotenv.config();
const dbConnection=Container.get(DataBaseConfig);


 const app = express();
// const app = express<ICustomRequest, express.Response>();
const PORT = 8445;
app.use(morgan('common', {
  stream: fs.createWriteStream('./logs/application.log', {flags: 'a'})
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(fileUpload({
  limits: { fileSize: 5000 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : 'tempuploads/',
  preserveExtension: true,
  debug:true
}));


app.use('/audio', audioConvert);
app.use('/user', userController);





app.listen(PORT, async () => {
      await dbConnection.checkConnection(); 
      Logger.info(`⚡️ [server]: Server is running at ${PORT}`);
  });
  