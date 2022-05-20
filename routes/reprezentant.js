
const express = require('express');

const { check } = require('express-validator');



const router = express.Router();




router.post('/login',
    check('username').notEmpty().isAlphanumeric({max:48}),
    check('password').notEmpty().isString({max:48}),
    async (req, res) => {


})
    