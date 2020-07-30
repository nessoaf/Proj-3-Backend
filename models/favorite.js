const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//

//favorites Schema
const FavoriteSchema = new Schema({

    eventId: {
        type: String,
    },
    // location: {
    //     type: String,
    // },
    // date: {
    //     type: String,
    //     required: true,
    // },
    // description: {
    //     type: String,
    // },
    // userId: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // }],
    // comments: [{
    //     commentBy: mongoose.Types.ObjectId,
    //     ref: 'User',
    //     comment: String
    // }],
}, {
    timestamps: true
});


module.exports = Favorite = mongoose.model('Favorite', FavoriteSchema);