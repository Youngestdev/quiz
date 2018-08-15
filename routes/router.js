const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/user");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// GET route for home page

router.get("/", function(req, res) {
    res.render("home", {
        title: "Home "
    });
});
//POST route for user registration and  logging in..
router.post("/profile", (req, res, next) => {
    if (req.body.email &&
        req.body.username &&
        req.body.password
    ) {

        const userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            score: 0
        }

        // create user from passed data.
        User.create(userData, (error, user) => {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.render("profile", {
                    username: user.username,
                    useremail: user.email,
                    userscore: 0
                });
            }
        });

        // if its a login request , then take him to his profile page
    } else if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                const err = new Error("Wrong email or password.");
                err.status = 401;
                return res.render("loginerr");
            } else {
                // otherwise if the user is logged in and wants to visit his profile page directly from url argument .
                req.session.userId = user._id;
                return res.render("profile", {
                    username: user.username,
                    useremail: user.email,
                    userscore: user.score
                });
            }
        });
    } else {
        // if user ongoing registration us leaving some fields empty send the warning !
        const err = new Error("All fields are required.");
        err.status = 400;
        return next(err);
    }
})

// GET route for profile page
router.get("/profile", (req, res, next) => {
    // check if the user is logged in by checking session id.
    User.findById(req.session.userId)
        .exec((error, user) => {
            // if he is not. execute !
            if (error) {
                return next(error);
            } else if (user === null) {
                const err = new Error("Not authorized! Go back!");
                err.status = 400;
                // next(err);
                return res.render("login");
            } else {
                return res.render("profile", {
                    username: user.username ,
                    useremail: user.email,
                    userscore: user.score
                });
            }
        });
});

// GET route for user who wants to visit the start page.

router.get("/start", (req, res, next) => {
    User.findById(req.session.userId)
        .exec((error, user) => {
            if (error) {
                return next(error);
            } else if (user === null) {
                const err = new Error("Not authorized! Go back!");
                err.status = 400;
                return res.redirect("login");
            } else {
                res.render("start", {
                    title: "Start Quiz"
                });
            }

        });
});

// GET for logout
router.get("/logout", (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                return res.redirect("/");
            }
        });
    }
});

// Lets fix a reset password route here..

router.get("/reset/:userID", (req, res, next) => {
    User.findById(req.params.userID)
        .exec((error, user) => {
            if (error) {
                return next(error)
            } else if (user === null) {
                const err = new Error("Well, you shouldn't be here !")
                err.status = 404;
                return res.render("home")
            } else {
                return res.render("resetpass", {
                    user_email: user.email
                })
            }
        })
})

router.post("/reset", (req, res, next) => {
    
})

// router.post("/passreset", (req, res, next) => {
//     if (req.body.password)
// })

router.post("/score", (req, res, next) => {
    let total = 0;
    // req.session.userId = user._id;

    // Probably this should have been in JSON format ...
    const a = "abdul";
    const b = "15";
    const c = "2";
    const d = "eating";
    const e = "vscode";
    const f = "js";
    const g = "python";
    const h = "express";
    const i = "cool";
    const j = "10";

    // Getting passed data to calculate score.
    let json = req.body;
    // this will handle total score

    // Let the spaghetti code begin !.
    if (json["answer"]["0"] == a) {
        total++;
    }
    if (json["answer"]["1"] == b) {
        total++;
    }
    if (json["answer"]["2"] == c) {
        total++;
    }
    if (json["answer"]["3"] == d) {
        total++;
    }
    if (json["answer"]["4"] == e) {
        total++;
    }
    if (json["answer"]["5"] == f) {
        total++;
    }
    if (json["answer"]["6"] == g) {
        total++;
    }
    if (json["answer"]["7"] == h) {
        total++;
    }
    if (json["answer"]["8"] == i) {
        total++;
    }
    if (json["answer"]["9"] == j) {
        total++;
    } else {
        // console.log("Looser");
    }

    let total2 = total;

    res.render("score", {
        score: total2
    });
    User.findByIdAndUpdate(req.session.userId, { score: total2 }, (err, user) => {
        if (err) throw err;
    })
});

// Get route for score page.
router.get("/score", (req, res, next) => {
    // check if the user is logged in by checking session id.
    User.findById(req.session.userId)
        .exec((error, user) => {
            // if he is not. execute !
            if (error) {
                return next(error);
            } else if (user === null) {
                const err = new Error("Not authorized! Go back! ");
                err.status = 400;
                // next(err);
                return res.render("login");
            } else {
                return res.render("score", {
                    score: user.score
                });
            }
        });
});

// Routes declaration.. 

router.post("/start", (req, res) => {
    res.render("start", {
        title: "Start Quiz"
    });
});

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Registration"
    });
});

router.use("/profile", (req, res) => {
    res.render("profile", {
        username: user.username,
        useremail: user.email,
        userscore: total,
        userpass: user.password
    });
});

router.post("/confirm", (req, res) => {
    res.render("confirm", {
        title: "Confirm your account."
    });
});

router.post("/dashboard", (req, res) => {
    res.render("dashboard");
});

router.use((req, res) => {
    res.status(404);
    res.render("404");
});

// Let"s begin !!
module.exports = router;