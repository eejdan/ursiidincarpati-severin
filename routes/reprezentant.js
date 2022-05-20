
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
const Reprezentant = require('../models/Reprezentant');

router.get('/login', async (req,res) => res.render('login_page_reprezentant'));

router.post('/login',
    check('username').notEmpty().isAlphanumeric({max:48}),
    check('password').notEmpty().isString({max:48}),
    serverValidation,
    async (req, res) => {
    let hashObject = crypto.createHash("sha256");
    let rep = await Reprezentant.findOne({
        username: req.body.username,
        password: hashObject.update(req.body.password).digest('hex')
    }).exec();
    if(!rep) {
        return res.sendStatus(401);
    }
    req.session.loggedIn = 'rep';
    req.session.dbid = rep._id; 
    return res.redirect('/login/');
})
    
router.get('/register', async (req,res) => res.render('register-reprezentanti'));
/* router.post('/register',
    check('username').notEmpty().isAlphanumeric({max:48}),
    check('password').notEmpty().isString({max:48}),
    check('prof').notEmpty().isString({ max: 200 }),
    serverValidation,
    async (req, res) => {
    let hashObject = crypto.createHash("sha256");
    if(!rep) return res.sendStatus(401);
    let rep = new Reprezentant({
        username: req.body.username,
        password: hashObject.update(req.body.password).digest('hex'),
    }).exec();
    await student.save();
    return res.redirect('/student/login');
})
 */
const findRep = (req, res, next) => {
    if(req.session.loggedIn != 'rep' || req.session.dbid) {
        return res.redirect('/');
    }
    let rep =  await Reprezentant.findById(req.session.dbid).exec();
    if(!st) { req.session.loggedIn = false; res.redirect('/student/login/') }
    res.locals.student = st;
}


router.get('/creare-practica', 
    async (req, res) => {
        res.render('creeare-practica')
    }
)
router.get('/cereri-practica', 
    async (req, res) => {
        res.render('cereri-practica')
    })
router.get('/lista-practica',
    async (req, res) => {
        res.render('lista-practica')
    })
router.get('/prezenta-elev-reprezentant', 
    async (req, res) => {
        res.render('prezenta-elev-reprezentant')
    })