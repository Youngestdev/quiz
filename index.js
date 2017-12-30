const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen((3000), () => {
    console.log('App started on port 3000');
});

app.post('/start', (req, res) => {
    res.render('start');
});

app.get('/login', (req, res) => {
        res.render('login');

});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/score', (req, res) => {
    res.render('score');
});

app.use('/profile', (req, res) => {
    res.render('profile')
});

app.post('/confirm', (req, res) => {
    res.render('confirm');
});

app.post('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
    // res.redirect('main');
});
