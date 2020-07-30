require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const gravatar = require('gravatar')

//load models
// const User = require('../../models/user')
const db = require('../../models')


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
router.get('/findUserByEmail/:email', (req, res) => {
    db.User.find({ email: req.params.email })
        .then(user => {
            console.log(user)
        })
        .catch(err => console.log(err))
})


//a fun test function to test connectivity with postman
router.get('/test', function (req, res) {
    console.log(`successfully connected to backend!!!!!!!! auth.js`)
})

//modified from AZocher's mern-auth codealong
// GET api/users/register (Public)
router.post('/addUser', (req, res) => {
    // Find User By Email
    db.User.findOne({ email: req.body.email })
        .then(user => {
            // If email already exists, send 400 response
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
                // If email does not already exist, create new user
            } else {
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
                    DOB: req.body.DOB,
                    zipcode: req.body.zipcode,
                    avatar
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

//updates a user, email is unique, 
//TODO 0 passing {$set: reqBody} would be preferred to {name:req.body.name, ...}
router.put('/updateUserByEmail/:email', (req, res) => {
    // let reqBody = JSON.stringify(req.body)
    // console.log(reqBody)
    db.User.findOneAndUpdate(
        { email: req.body.email },
        // console.log(req.body)
        //fix me
        // {reqBody}
        { name: req.body.name, email: req.body.email, password: req.body.password, DOB: req.body.DOB, zipcode: req.body.zipcode }
    )
        .then(updatedUser => {
            res.send(updatedUser)
        })
        .catch(err => console.log(err))
})


//deletes user, no body argument is sent.
router.delete('/deleteUserByEmail/:email', (req, res) => {
    db.User.findOneAndDelete({ email: req.params.email })
        .then(deletedItem => {
            console.log(deletedItem)
            res.send({ message: 'Successfully destroyed' })
        })
        .catch(err => console.log(err))
})

module.exports = router