// const {v4:uuidv4}=require("uuid");  //uuid method use for cookie_id set in statefull
const user = require("../models/user");
const {setUser}=require("../service/auth")



async function handelUserSigbUp(req,res){
    const {name,email,password}=req.body;
    await user.create({
        name,
        email,
        password
    });
    return res.redirect("/login");
};

async function handelUserLogin(req,res){
    const {email,password}=req.body;
    const User=await user.findOne({email,password});
        if(!User)return res.render("login",{
            error:"Invalid Email And Password"
            
        });
        // const seassionId=uuidv4();  // that use for statefull method
        // setUser(seassionId,User);
        // res.cookie("uid",seassionId)
        const token=setUser(User);
        res.cookie("token",token);    //set token inside cookie
    return res.redirect("/")
    // return res.json({token});    //that use for authorizetion
}

module.exports={
    handelUserSigbUp,
    handelUserLogin
}