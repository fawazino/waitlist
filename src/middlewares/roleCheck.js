

function roleCheck(req,res,next){

if(req.body.role === "asset lister"){

    if(req.body.assetName || req.body.assetDesc !== undefined){

 next();

} 
else {res.status(401).json({error: "Must Include Asset Name And Description"}) }

}
else if(req.body.role === "investor"){
 
    next();
}

else {res.status(401).json({error: "Role Must be either investor or asset lister"}) }

}

module.exports = {
    roleCheck
}