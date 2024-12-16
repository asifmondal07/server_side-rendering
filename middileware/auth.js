const {getUser}=require("../service/auth");




 function checkForAuthorization(req,res,next){
    const cookietoken=req.cookies?.token;
    if(!cookietoken)return next();
    const token=cookietoken;
    const user=getUser(token);
    req.user=user;
    next();
}

 function restrictTo(role){
    return function(req,res,next){
        if(!req.user)return res.redirect("/login")
        if(!role.includes(req.user.role))return res.end("unauthorize");
        next();
    }
    
}


module.exports={
    checkForAuthorization,
    restrictTo
};