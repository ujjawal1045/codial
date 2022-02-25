//creating schema(to create schema we need mongoose)
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: True
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    }
} {
    //storing data of user crestion snd updstion
    timestamps: true
});
//telling mongoose that this is model
const user = mongoose.Model('user',userSchema);
module.exports = user;
