const path = require('path')

const express = require('express');


const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(80, () => console.log('server: alive'));