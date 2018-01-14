const express = require('express');
const router = express.Router();
const User = require('../models/user');
//  import  body  from './body';

// GET route for reading data
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Home '});
});


//POST route for updating data
router.post('/profile', function (req, res, next) {
  // confirm that user typed same password twice
  // if (req.body.password !== req.body.passwordConf) {
  //   const err = new Error('Passwords do not match.');
  //   err.status = 400;
  //   res.send("passwords dont match");
  //   return next(err);
  // }

  if (req.body.email &&
    req.body.username &&
    req.body.password) {

    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          const err = new Error('Not authorized! Go back!');
          err.status = 400;
          return res.render('404');
        } else {
          return res.send('<link rel="shortcut icon" href="/images/favico.ico" /><link rel="stylesheet" href="/css/paper.css" /><div class="paper container"><nav align="right"><a type="button" href="/logout" class="paper-btn">Logout</a></nav><h4>My Details</h4><b><strong>Name: </strong>' + user.username + ' <br /><br /><strong> E-Mail: </strong>' + user.email + '<br /><br /></b><align>Score : </align> ' + user.score + ' <hr><p> Want to take my simple test ? Click the button below to begin !</p><form action="start" method="POST"><button type="submit">Start</button></form></div>')
        }
      }
    });
});

// GET for logout logout
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
    res.render('score', { title: 'Your Score'});
});

router.use('/profile', (req, res) => {
//     if (req.body.email && req.body.password) {
//     User.authenticate(req.body.email, req.body.password, function (error, user) {
//       if (error || !user) {
//         const err = new Error('Wrong email or password.');
//         err.status = 401;
//         return next(err);
//       } else {
//         req.session.userId = user._id;
//         return res.redirect('/profile');
//       }
//     });
//   }
    // res.send('<link rel="stylesheet" href="/css/paper.css" /><div class="container paper"><h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a></div>')
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
    // res.redirect('main');
});


module.exports = router;