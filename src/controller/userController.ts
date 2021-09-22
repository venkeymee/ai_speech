import { Container, Service, Inject } from 'typedi';

/** 
 * @Author: venkeymee@gmail.com
 * @description: Audio to Text file coverter Services. 
 * 
 * */
import express from 'express';
import Logger from '../config/winstonlogger';
import { User, UserInstance } from '../entity/user';
import { UserService } from '../services/userservice';
import bcrypt from "bcryptjs";
import {validateLogin,validateRegister} from "../middlewars/uservallidations"; 
import responseMesg, { RESPONSEMSG, RESPONSESTATUS, RESPONSE_EMPTY_DATA } from '../responsemessages/responseMessages';

const userservice = Container.get(UserService);

const router = express.Router();

router.post('/signup',validateRegister, async (req, res) => {
    var salt = await bcrypt.genSaltSync(10);
    let hashPass = await bcrypt.hashSync(req.body.password, salt)
    const user = {
        lastname: req.body.lastname || '',
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashPass,
        isAdmin : req.body.isAdmin,
        address: req.body.address || '',
        status: req.body.status 
    } as UserInstance;
    const result = await userservice.createUser(user);
    const response = (result instanceof Error)
        ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
        : responseMesg(RESPONSESTATUS.SUCCESS, RESPONSEMSG.INSERT_SUCCESS, result)
    return res.send(response);
});
router.post('/login',validateLogin, async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    } as UserInstance;
    const result = await userservice.loginUser(user);
    const response = (result instanceof Error)
        ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
        : responseMesg(RESPONSESTATUS.SUCCESS, RESPONSEMSG.RETRIVE_SUCCESS, result)
    return res.send(response);
});

router.get('/userbyid', async (req, res) => {
    const user =  req.query.id;
    const result = await userservice.findUserById(<any>user)
    const response = (result instanceof Error)
        ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
        : responseMesg(RESPONSESTATUS.SUCCESS, RESPONSEMSG.RETRIVE_SUCCESS, result)
    return res.send(response);
})

router.get('/all-users', async (req, res) => {
    const result = await userservice.findAllusers();
    const response = (result instanceof Error)
        ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
        : responseMesg(RESPONSESTATUS.SUCCESS, RESPONSEMSG.RETRIVE_SUCCESS, result)
    return res.send(response);
})

router.post('/delete-user', async (req, res) => {
    const user =  req.body.id;
    const result = await userservice.delteUser(user)
    const response = (result instanceof Error)
        ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
        : responseMesg(RESPONSESTATUS.SUCCESS, RESPONSEMSG.DELETE_SUCCESS, result)
    return res.send(response);
})

router.post('/update-user', async (req, res) => {
    const user = req.body;
    const result = await userservice.updateUser(user)
    const response = (result instanceof Error)
        ? responseMesg(RESPONSESTATUS.EXCEPTION, RESPONSEMSG.EXCEPTION, RESPONSE_EMPTY_DATA)
        : responseMesg(RESPONSESTATUS.SUCCESS, RESPONSEMSG.UPDATE_SUCCESS, result)
    return res.send(response);
})
export default router;
