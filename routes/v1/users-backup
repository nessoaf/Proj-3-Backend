require("dotenv").config()
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


//API ROUTES
//GET api user already registered
//if not registered, register user
// get log people in and check their creds against existing user data
//GET if already logged in, set user data to current

//shows all documents in collection 'users'
router.get('/', (req, res) => {
    db.User.find()
        .then(users => {
            res.send(users)
        })
        .catch(err => console.log(err))
})

//find a user by email (unique according to Schema rules)
router.get('/view/:id', (req, res) => {
    db.User.findById(req.params.id)
        .then(user => {
            res.send(user)
        })
        .catch(err => console.log(err))
})


//a fun test function to test connectivity with postman
router.get('/test', function (req, res) {
    res.send(process.env.EVENTFUL_KEY)
})

// GET api/users/register (Public)
router.post('/register', (req, res) => {
    // Find User By Email
    User.findOne({ email: req.body.email })
        .then(user => {
            // If email already exists, send 400 response
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
                // If email does not already exist, create new user
            } else {
                // Get avatar from Gravatar
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // avatar size option
                    r: 'pg', // avatar rating option
                    d: 'mm', // default avatar option
                });

                // Create new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    zipcode: req.body.zipcode,
                });

                // Salt and Hash password with bcryptjs, then save new user
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })

            }
        })
});

// GET api/users/login (Public)

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('post login')

    // Find User by email
    User.findOne({ email })
        .then(user => {
            // Check for user
            if (!user) {
                return res.status(404).json({ email: 'User not found' })
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched, send JSON Web Token

                        // Create token payload (you can include anything you want)
                        const payload = { id: user.id, name: user.name, email: user.email, zipcode: user.zipcode }

                        // Sign token
                        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                            res.json({ success: true, token: 'Bearer ' + token })
                        });
                    } else {
                        return res.status(400).json({ password: 'Password or email is incorrect' })
                    }
                })
        })
});

// GET api/users/current (Private)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    // res.json({ msg: 'Success' })
    // res.json(req.user);
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
    })
});

module.exports = router;