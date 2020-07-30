require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const db = require('../models')
// const User = mongoose.model('users')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        //use user model to findbyid if jwt_payload id exists
        db.User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        })
        .catch(err => console.log(err))
    }))
}