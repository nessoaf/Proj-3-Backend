require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

//init server
const app = express()

// require router
const users = require('./routes/api/users')

//middleware to cors requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    next()
})
//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// config GB
const db = process.env.MONGO_URI

//connect to mongoDB atlas
mongoose.connect(db)
    .then(() => { console.log('MongoDB Connected... (^///^)') })
    .catch(err => console.log(err))

// test routing
app.get('/', (req, res) => {
res.send('Hello World \n Server in up and Running! 🐱‍🐉')
})

// passport middleware
app.use(passport.initialize())

//passport JWT token set/config
require('./config/passport')(passport)

//setup out routes
app.use('/api/users', users)

//start our server


app.listen(process.env.PORT || 3001, console.log(`Hamsters have began running! ${process.env.PORT}`))