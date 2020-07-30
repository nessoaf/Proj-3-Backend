require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const bodyParser = require('body-parser')

//config DB

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGOD_URI
// console.log(process.env.MONGOD_URI)
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


const users = require('./routes/v1/users')
const mongoose = require('mongoose')

// middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}))
//body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/v1/users', require('./routes/v1/users'))
app.use('/v1/events', require('./routes/v1/events'))
app.use('/v1/favorites', require('./routes/v1/favorites'))

//setup out routes
app.use('/v1/users', users)

//Call passport
require('./config/passport')(passport)




// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// app.options('/bounties/:id', cors())
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://abc.com/', true);
// xhr.withCredentials = true;
// xhr.send(null);

// routes
//mongoose.connect(mdb)
mongoose.connect(uri)
    .then(() => { console.log('MongoDB Connected! Congrats!') })
    .catch(err => console.log(err))

// test routing
app.get('/', (req, res) => {
    res.send('Hello World \n Server in up and Running! 🐱‍🐉')
})


//todo: delete test route
// app.get('/test', (req,res) => {
//     db.Bounty.find()
//         .then(bounties => res.send(bounties))
//         .catch(err => {
//             console.error(err)
//             res.send({message: 'Server Error'})
//         })
// })




//listen
app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on ${process.env.PORT || 3001}`)
})
