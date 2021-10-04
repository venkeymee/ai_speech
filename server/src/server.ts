import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors  from 'cors';
import morgan from 'morgan';
import chalk from "chalk";
import Logger from './config/winstonlogger';
import { DataBaseConfig } from './config/dbconfig';
import Container from 'typedi';
import audioConvert from './controller/audioConvert';
import userController from './controller/usercontroller';
import https from "https";

import fileUpload from 'express-fileupload';
dotenv.config();
const dbConnection=Container.get(DataBaseConfig);


 const app = express();
// const app = express<ICustomRequest, express.Response>();
const PORT = process.env.PORT || 8445;
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

app.use(express.static(path.join(__dirname, '../../build')));

app.use('/audio', audioConvert);
app.use('/user', userController);


https.createServer({
  key: fs.readFileSync(path.join(__dirname,'../../cert/server.key')),
  cert: fs.readFileSync(path.join(__dirname,'../../cert/server.cert'))
}, app).listen(PORT, async () => {
      await dbConnection.checkConnection(); 
      Logger.info(chalk.yellow(`⚡️ [server]: Server is running at ${chalk.blue(PORT)}`));
  });
  