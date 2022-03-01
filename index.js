require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const List = require('./models/list')
const port = process.env.PORT || 3000

const app = express()


app.use(express.json())


// database connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('db connected'))
  .catch((err) => console.log(err));


  const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: ''}

  

    if(err.code === 11000){
        errors.email = 'Email already taken'
        return errors
    }

  
    return errors
}


//Endpoint to view all members in the waitlist
app.get('/waitlist/all', (req, res)=>{
    List.find()
    .then((result)=>{
        res.json({result})
    })
    .catch((err)=>{console.log(err)})
})

//Endpoint to add a new member to the waitlist
app.post('/waitlist', (req,res)=>{
    const {email, name, role, assetName, assetDesc} = req.body

    if(req.body.role === "asset lister"){
        if(req.body.assetName || req.body.assetDesc !== undefined){

       
      
        var list = List.create({email, name, role, assetName, assetDesc})
        .then(result => res.status(200).json({list: result}))
        .catch((err) =>{
            const errors =  handleErrors(err)
            res.status(401).json({errors})
        } )
    } else {res.status(401).json({error: "Must Include Asset Name And Description"}) }
    
    
}
    if(req.body.role === "investor"){
      var list = List.create({email, name, role})
        .then(result => res.status(200).json({list: result}))
        .catch((err) =>{
            const errors =  handleErrors(err)
            res.status(401).json({errors})
        } )
    }
   
   
})

//Endpoint to view users with a specific role
app.get('/waitlist/:role', (req,res)=>{
    const roles = req.params.role
    const list = List.find({role: roles})
    .then((result)=>{res.json({list: result})})
})

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})