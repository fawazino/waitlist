require('dotenv').config()
const http = require("http")
const express = require('express')
const mongoose = require('mongoose')
const {List, validateUser} = require('./src/models/list')
const {roleCheck} = require('./src/middlewares/roleCheck')
const validateMiddleware = require('./src/middlewares/validate')
const port = process.env.PORT || 3000

const app = express()

const server = http.createServer(app)

// database connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    try {
         server.listen(port, ()=>{
            console.log(`server running on port ${port} and db connected`);
        })
    } catch (error) {

        server.close();
        console.log(error);
        
    }
    
})


  const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: ''}

    if(err.code === 11000){
        errors.email = 'Email already taken'
        return errors
    }
    
}

app.use(express.json())


//Endpoint to view all members in the waitlist
app.get('/waitlist', (req, res)=>{
    List.find()
    .then((result)=>{
        res.json({result})
    })
    .catch((err)=>{console.log(err)})
})

//Endpoint to add a new member to the waitlist
app.post('/waitlist', [validateMiddleware(validateUser)], roleCheck, (req,res)=>{
    const {email, name, role, assetName, assetDesc} = req.body

        var list = List.create({email, name, role, assetName, assetDesc})
        .then(result => res.status(200).json({list: result}))
        .catch((err) =>{
            console.log(err)
            const errors =  handleErrors(err)
            res.status(401).json({errors})
        } )
      
})

//Endpoint to view users with a specific role
app.get('/waitlist/:role', (req,res)=>{
    const roles = req.params.role
    const list = List.find({role: roles})
    .then((result)=>{res.json({list: result})})
})

