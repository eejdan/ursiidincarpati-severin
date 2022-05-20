


const express = require('express');

const { check } = require('express-validator');

const Student = require('../models/Student');
const PracticeStage = require('../models/PracticeStage');
const StudentPracticeSession = require('../models/StudentPracticeSession');
const Firm = require('../models/Firms')
const Profesor = require('../models/Profesor')

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+ '\\..\\static\\')
    }
})
const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1000000 //1mb
    } 
})


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
router.post('/practica',
    check('prid').notEmpty().isAlphanumeric(),
    studentFind, 
    async (req, res) => {
    let pr = await PracticeStage.find({ _id: req.body.prid, registrationEnded: false}).exec();
    if(!pr) { res.redirect('/student/'); }
    let sps = new StudentPracticeSession({
        practiceStage: pr._id,
        presence: ['unset'],
        student: res.locals.student._id,
        firmReview: 0
    });
    await sps.save();
    return res.sendStatus(200);
})

router.get('/firme',
    studentFind,
    async (req,res) => {
    let firms = await Firm.find().exec();
    res.render('firme', { user: res.locals.student, firms: firms });
})

router.get('/profil', 
    studentFind, 
    async (req,res) => {
    res.render('profil', { user: res.locals.student });
})
router.post('/profil', 
    async (req, res) => {
    res.locals.student.meta = {
        firstName: req.body.prenume,
        lastName: req.body.nume,
        email: req.body.email,
        aptitudes: req.body.aptitudes
    }
    await res.locals.student.save();
    res.redirect('/student/');
})
router.post('/cv',
    upload.single('cv'),
    async (req, res) => {
    if(res.locals.student.cvMedia) {
        res.locals.student.cvMedia = req.file.name;
    }
    return res.redirect('/student/')
})