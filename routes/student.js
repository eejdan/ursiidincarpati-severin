


const express = require('express');

const { check } = require('express-validator');

const Student = require('../models/Student');
const PracticeStage = require('../models/PracticeStage');
const StudentPracticeSession = require('../models/StudentPracticeSession');
const Firm = require('../models/Firms')
const Profesor = require('../models/Profesor')

const router = express.Router();

const serverValidation = require('../middleware/serverValidation');


router.post('/login',
    check('username').notEmpty().isAlphanumeric({max:48}),
    check('password').notEmpty().isString({max:48}),
    serverValidation,
    async (req, res) => {
    let hashObject = crypto.createHash("sha256");
    let student = await Student.findOne({
        username: req.body.username,
        password: hashObject.update(req.body.password).digest('hex')
    }).exec();
    if(!student) {
        return res.sendStatus(401);
    }
    req.session.loggedIn = 'user';
    req.session.dbid = student._id;
    return res.redirect('/login/');
})
    
router.post('/register',
    check('username').notEmpty().isAlphanumeric({max:48}),
    check('password').notEmpty().isString({max:48}),
    check('prof').notEmpty().isString({ max: 200 }),
    serverValidation,
    async (req, res) => {
    let hashObject = crypto.createHash("sha256");
    let profesor = await Profesor.findOne({ uid: req.body.prof }).exec();
    if(!profesor) return res.sendStatus(401);
    let student = new Student({
        username: req.body.username,
        password: hashObject.update(req.body.password).digest('hex'),
        prof: profesor._id
    }).exec();
    await student.save();
    return res.redirect('/student/login');
})

var studentFind = (req, res, next)  => {
    if(req.session.loggedIn != 'user' || req.session.dbid) {
        return res.redirect('/');
    }
    let st =  await Student.findById(req.session.dbid).exec();
    if(!st) { req.session.loggedIn = false; res.redirect('/student/login/') }
    res.locals.student = st;
}

router.get('/', 
    studentFind,
    async (req, res) => {
    res.render('index', { user: res.locals.student });
})

router.get('/practica', 
    studentFind,
    async (req,res) => {
    let pr = await PracticeStage.find({ registrationEnded: false }).exec();
    res.render('practica', { user: res.locals.student, practices: pr });
})

router.get('/firme',
    studentFind,
    async (req,res) => {
    let firms = await Firms.find().exec();
    res.render('firme', { user: res.locals.student, firms: firms });
})

router.get('cont', 
    studentFind, 
    async (req,res) => {
    let cont = await 
})