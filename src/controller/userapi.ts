import { Container, Service, Inject } from 'typedi';

/** 
 * @Author: venkeymee@gmail.com
 * @description: Audio to Text file coverter Services. 
 * 
 * */
import express from 'express';
import { UserServices } from "../services/userservices";
import Logger from '../config/winstonlogger';

const router = express.Router();

const userServices = Container.get(UserServices);

router.get('/signup',async (req,res)=>{

const response = await userServices.userSignUp();

});

export default router;