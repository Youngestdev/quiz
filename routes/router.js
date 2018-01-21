// require core modules required for routing and database interactions.
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// GET route for home page

router.get('/', function (req, res) {
  res.render('home', { title: 'Home '});
});

//POST route for user registration and  logging in..
router.post('/profile', function (req, res, next) {
  if (req.body.email &&
    req.body.username &&
    req.body.password) {

    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }

    // create user from passed data.
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.send(`
        <title>My profile</title>
        <link rel="shortcut icon" href="/images/favico.ico" />
        <link rel="stylesheet" href="/css/paper.css" />
        <div class="paper container">
            <nav align="right"><a type="button" href="/logout" class="paper-btn">Logout</a></nav>
            <h4>My Details</h4><b><strong style="font-family: Operator Mono">Name: </strong>` + user.username +  `<br /><br /><strong style="font-family: Operator Mono"> E-Mail: </strong>` + user.email + `<br /><br /></b>
            <align style="font-family: Operator Mono">Score : </align> ' + user.score + '
            <hr>
            <p> Want to take my simple test ? Click the button below to begin !</p>
            <form action="start" method="POST"><button type="submit">Start</button></form>
        </div>`);
      }
    });

    // if its a login request , then take him to his profile page
  } else if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        // otherwise if the user is logged in and wants to visit his profile page directly from url argument .
        req.session.userId = user._id;
        return res.send(`
        <title>My profile</title>
        <link rel="shortcut icon" href="/images/favico.ico" />
        <link rel="stylesheet" href="/css/paper.css" />
        <div class="paper container">
            <nav align="right"><a type="button" href="/logout" class="paper-btn">Logout</a></nav>
            <h4>My Details</h4><b><strong style="font-family: Operator Mono">Name: </strong>` + user.username +  `<br /><br /><strong style="font-family: Operator Mono"> E-Mail: </strong>` + user.email + `<br /><br /></b>
            <align style="font-family: Operator Mono">Score : </align> ' + user.score + '
            <hr>
            <p> Want to take my simple test ? Click the button below to begin !</p>
            <form action="start" method="POST"><button type="submit">Start</button></form>
        </div>`);
      }
    });
  } else {
    // if user ongoing registration us leaving some fields empty send the warning !
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route for profile page
router.get('/profile', function (req, res, next) {
// check if the user is logged in by checking session id.
  User.findById(req.session.userId)
    .exec(function (error, user) {
// if he is not. execute !
      if (error) {
        return next(error);
      } else if (user === null) {
          const err = new Error('Not authorized! Go back!');
          err.status = 400;
          // next(err);
          return res.render('login');
        } else {
          // if he has an active session the send him to his profile page !
          return res.send(`
          <title>My profile</title>
          <link rel="shortcut icon" href="/images/favico.ico" />
          <link rel="stylesheet" href="/css/paper.css" />
          <div class="paper container">
              <nav align="right"><a type="button" href="/logout" class="paper-btn">Logout</a></nav>
              <h4>My Details</h4><b><strong style="font-family: Operator Mono">Name: </strong>` + user.username +  `<br /><br /><strong style="font-family: Operator Mono"> E-Mail: </strong>` + user.email + `<br /><br /></b>
              <align style="font-family: Operator Mono">Score : </align> ' + user.score + '
              <hr>
              <p> Want to take my simple test ? Click the button below to begin !</p>
              <form action="start" method="POST"><button type="submit">Start</button></form>
          </div>`);
        }
    });
});

// GET route for user who wants to visit the start page.

router.get('/start', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } 
        else if (user === null) {
          const err = new Error('Not authorized! Go back!');
          err.status = 400;
          return res.redirect('login');
        } else {
            res.render('start', { title: 'Start Quiz' });
        }
      
    });
});

// GET for logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.post('/score', (req, res) => {
  // let ans;
    console.log(req.body);
    // ans += req.body;
    // console.log(ans);
  res.send('Gratias');
});

// Routes declaration.. 

router.post('/start', (req, res) => {
    res.render('start', { title: 'Start Quiz'});
});

router.get('/login', (req, res) => {
        res.render('login', { title: 'Login'});
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Registration'});
});

router.post('/score', (req, res) => {
    // res.render('score', { title: 'Your Score'});
}); 
router.use('/profile', (req, res) => {
  });

router.post('/confirm', (req, res) => {
    res.render('confirm', { title: 'Confirm your account.'});
});

router.post('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.use((req, res) => {
    res.status(404);
    res.render('404');
});

// Let's begin !!
module.exports = router;