// require('dotenv').config()
const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

//load User model from file location
const User = require('../../models/user')
const { response } = require('express')
const e = require('express')

// API Routes

//dev route for testing, please do not delete
router.get('/', (req,res) => {
    User.find()
    .then(users => {
        res.send(users)
    })
})

//dev route for testing, please do not delete
router.get('/view/:id', (req,res) => {
    User.findOne({_id: req.params.id})
    .then(user => {
        res.send(user)
    })
})

//Get api user registered
router.get('/test', (req, res) => {
    res.json({ msg: "Users endpoint working eyyyy okayyy" })
})

// GET route to handle registration
router.post('/register', (req, res) => {
    console.log('##############req.body is: ' + JSON.stringify(req.body) + ' ###############')
    console.log('#############req.body.email is: ' + req.body.email + "####################")
    console.log('#############req.body.zipcode is: ' + req.body.zipcode + "####################")
    // send error if user already exists
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log("RRRRRRRRRRRR user is: " + user + "RRRRRRRRRRRRRRRRRRR")
            if (user) {
                //Error if User already exists
                return console.log(user.email + ': Email already exists' )
                //else create newUser
            } else {
                //create n avatar from Gravatar
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                const newUser = new User(
                    req.body
                )
                // const newUser = new User({
                //     name: req.body.name,
                //     email: req.body.email,
                //     zipcode: req.zipcode,
                //     password: req.body.password,
                // })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        //if error
                        if (err) {
                            throw err
                        }
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})
//delete .json(user) for long term security


//Get log people in and check their credentials against existing User data
// route that handles login info
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //check for user credentials agains out existing user data
    User.findOne({ email })
        .then(user => {
            //See if hashed pass matched inputted pass
            if (!user) {
                return res.status(400).json({ email: 'user not found' })
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    //if we are good to go sign out jwt
                    if (isMatch) {
                        //create token payload
                        const payload = { id: user.id, name: user.name, email: user.email, zipcode: user.zipcode, createdAt: user.createdAt, favorite: user.favorite }
                        //sign the token
                        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                            res.json({ success: true, token: 'Bearer ' + token })
                        })
                        //if passowrd does not match
                    } else {
                        return res.status(400).json({ password: 'Password is incorrect' })
                    }
                })
        })


})

// GET if already logged in, set user data to current

module.exports = router