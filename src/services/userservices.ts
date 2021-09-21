import { Container, Service, Inject } from 'typedi';

import { userRepository } from "../repository/userrepository";

@Service()
export class UserServices{
    constructor(public userRepository: userRepository){ }

    async userSignUp(){
        return await this.userRepository.userSignUp()
    }
}