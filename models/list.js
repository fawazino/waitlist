const mongoose = require('mongoose')
const { isEmail } = require('validator')
 
const listSchema = new mongoose.Schema({

email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    name:{
        type: String,
        required: [true, 'Please enter a name']
    },
    role:{
        type: String,
        lowercase: true,
        required: [true, 'Please enter a role']
    },
    assetName: {
        type:String
    },
    assetDesc: {
        type:String
    }
}, {timestamps: true})

const List = mongoose.model('List', listSchema)

module.exports = List
