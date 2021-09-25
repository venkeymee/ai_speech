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
import { validateLogin, validateRegister } from "../middlewars/uservallidations";
import responseMesg, { RESPONSEMSG, RESPONSESTATUS, RESPONSE_EMPTY_DATA } from '../responsemessages/responseMessages';
import { apiResponses } from '../apiresponse/responseTemplate';

const userservice = Container.get(UserService);

const router = express.Router();

router.post('/signup', validateRegister, async (req, res) => {
    // var salt = await bcrypt.genSaltSync(10);
    // let hashPass = await bcrypt.hashSync(req.body.password, salt)
    const user = {
        lastname: req.body.lastname || '',
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin || '',
        address: req.body.address || '',
        status: req.body.status || ''
    } as UserInstance;
    const result: any = await userservice.createUser(user);
    return apiResponses(result,res,RESPONSEMSG.INSERT_SUCCESS);
});
router.post('/login', validateLogin, async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    } as UserInstance;
    const result: any = await userservice.loginUser(user);
   return apiResponses(result,res,RESPONSEMSG.RETRIVE_SUCCESS);
});

router.get('/userbyid', async (req, res) => {
    const user = req.query.id;
    const result = await userservice.findUserById(<any>user)
    return apiResponses(result,res,RESPONSEMSG.RETRIVE_SUCCESS);
})

router.get('/all-users', async (req, res) => {
    const result = await userservice.findAllusers();
    return apiResponses(result,res,RESPONSEMSG.RETRIVE_SUCCESS);
})

router.post('/delete-user', async (req, res) => {
    const user = req.body.id;
    const result = await userservice.delteUser(user)
    return apiResponses(result,res,RESPONSEMSG.DELETE_SUCCESS);
})

router.post('/update-user', async (req, res) => {
    const user = req.body;
    const result = await userservice.updateUser(user)
    return apiResponses(result,res,RESPONSEMSG.UPDATE_SUCCESS);
})
export default router;
