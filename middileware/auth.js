const {getUser}=require("../service/auth");

// async function restrictToLoggedinUserOnly(req,res,next){
    
//     // const  userUid=req.cookies?.uid;     //after req get the uid from cookie

//     const userUid = req.headers["authorization"]; // Retrieve the authorization header
//     console.log(req.headers);
//     if(!userUid) return res.redirect("/login");
//     const token = userUid?.split("Bearer ")[1] || req.query.token;
//     // const User=getUser(userUid);     //that use for using cookie
//     const User=getUser(token);
//     if(!User) return res.redirect("/login");
//     req.user=User;      
//     next();

// }       
// async function checkAuth(req,res,next){
//     // const  userUid=req.cookies?.uid; //after req get the uid from cookie
//     const userUid = req.headers["authorization"]; // Retrieve the authorization header
//     const token = userUid?.split("Bearer ")[1] || req.query.token;
//     // const User=getUser(userUid); //that use for using cookie
//     const User=getUser(token);
//     req.user=User;
//     next(); 
// }       


 function checkForAuthorization(req,res,next){
    const cookietoken=req.cookies?.token;
    if(!cookietoken)return next();
    const token=cookietoken;
    const user=getUser(token);
    req.user=user;
    next();
}

 function restrictTo(role=[]){
    return function(req,res,next){
        if(!req.user)return res.redirect("/login")
        if(!role.includes(req.user.role))return res.end("unauthorize")
        next();
    }
    
}


module.exports={
    checkForAuthorization,
    restrictTo
};