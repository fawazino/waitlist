const mongoose = require('mongoose')
const Joi = require('joi')
 
const listSchema = new mongoose.Schema({

email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
        
    },
    name:{
        type: String,
        required: true
    },
    role:{
        type: String,
        lowercase: true,
        required: true,
    },
    assetName: {
        type:String
    },
    assetDesc: {
        type:String
    }
}, {timestamps: true})

const List = mongoose.model('List', listSchema)

const validateUser = (user) =>{
    const schema = Joi.object({
        email: Joi.string().email().required()
        .messages({"string.empty": "Email cannot be empty",
                   "string.email": "Email must be Valid"
    }),
        name: Joi.string().required()
        .messages({"string.empty": "Name cannot be empty"}), 
        role: Joi.string().valid('investor', 'asset lister').required()
        .messages({"any.only": "Role must be either investor or asset lister "}),
        assetName: Joi.string(),
        assetDesc: Joi.string()
    })
    return schema.validate(user)
}

module.exports = {
    List,
    validateUser
}
