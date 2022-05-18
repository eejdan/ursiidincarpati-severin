const path = require('path')

const express = require('express');


const app = express();
const ejs = require("ejs");
const req = require('express/lib/request');
const res = require('express/lib/response');



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
     


app.listen(80, () => console.log('server: alive'));