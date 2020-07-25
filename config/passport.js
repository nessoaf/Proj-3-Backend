require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const passport = require('passport')
const User = mongoose.model('users')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        // use user model to findById if jwt_payload exists
        User.findById(jwt_payload.id).then(user => {
            if (user) {
                //if yes, then return user
                return done(null, user)
            }
            //  if not return false
            return done(null, false)
        })
            // catch for errors
            .catch(err => console.log(err))
    }))
}