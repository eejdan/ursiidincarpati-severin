require('dotenv').config();

const path = require('path')


const mongoose = require('mongoose');

const express = require('express');

const app = express();
const ejs = require("ejs");


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index')
})
app.get('/profil', (req, res) =>
 {     res.render('profil') })

 app.get('/practica', (req, res) =>
 {     res.render('practica') })

 app.get('/setari', (req, res) =>
 {     res.render('setari') })

 app.get('/firme', (req, res) =>
 {     res.render('firme') })

 app.get('/cv', (req, res) =>
 {     res.render('cv') })
     
 app.get('/login_page', (req, res) =>
 {     res.render('login_page') })

 app.get('/first-page', (req, res) =>
 {     res.render('first-page') })

   app.get('/register-page', (req, res) =>
 {     res.render('register-page') })

 app.get('/register-profesori', (req, res) =>
 {     res.render('register-profesori') })

 app.get('/register-student', (req, res) =>
 {     res.render('register-student') })

 app.get('/register-reprezentanti', (req, res) =>
 {     res.render('register-reprezentanti') })
              

 app.get('/reprezentant', (req, res) =>
 {     res.render('reprezentant') })
              
 app.get('/creeare-practica', (req, res) =>
 {     res.render('creeare-practica') })
                               
 app.get('/profesor', (req, res) =>
 {     res.render('profesor') })
                           
 app.get('/prezenta-elevi', (req, res) =>
 {     res.render('prezenta-elevi') })
                               

 app.get('/date-elevi', (req, res) =>
 {     res.render('date-elevi') })
                               
 app.get('/lista-practica', (req, res) =>
 {     res.render('lista-practica') })
                               
 app.get('/detalii-firma', (req, res) =>
 {     res.render('detalii-firma') })
                               
 app.get('/prezenta-elevi-reprezentant', (req, res) =>
 {     res.render('prezenta-elevi-reprezentant') })
                               



app.listen(80, () => console.log('server: alive'));



async function init() {
  mongoose.connect(process.env.MONGO_URI)
}