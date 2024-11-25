const {getUser}=require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){
    
    const  userUid=req.cookies?.uid;
    if(!userUid) return res.redirect("/login");

    const User=getUser(userUid);
    if(!User) return res.redirect("/login");
    req.user=User;
    next();

}

module.exports={restrictToLoggedinUserOnly};