import {body} from 'express-validator';

let validateRegister = [
    body('email',{email : "Email address is not in correct order"})
    .notEmpty()
    .escape()
    .trim()
    .isEmail(),
    body('password',{password:"The Password must be of minimum 4 characters length"})
    .notEmpty()
    .trim()
    .isLength({ min: 4 }),
]
let validateLogin = [
    body('email',{username:"Email address is not in correct order"})
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',{password:"The Password must be of minimum 4 characters length"})
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
]

export {
    validateRegister,
    validateLogin 
}