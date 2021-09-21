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



const userservice = Container.get(UserService);

const router = express.Router();

router.post('/signup',async(req,res)=>{

    const user = {
        lastname: req.body.lastname || '',
        firstname: req.body.firstname ,
        email: req.body.email,
        password: req.body.password ,
        address: req.body.address || ''
         } as UserInstance
       const result= await  userservice.createUser(user);
       if (result instanceof Error){
       res.send(result)
    }
    res.send(result);

})
export default router;
