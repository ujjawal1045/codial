//creating schema(to create schema we need mongoose)
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    }
}, {
    //storing data of user crestion snd updstion
    timestamps: true
});
//telling mongoose that this is model
const User = mongoose.model('User',userSchema);
module.exports = User;