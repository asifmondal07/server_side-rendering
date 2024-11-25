// const seassionIdToUserMap=new Map();     //that is statefull method
const jwt=require("jsonwebtoken");
const secret="@Asifmondal7ai@"

// function setUser(id,user){
//     seassionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return seassionIdToUserMap.get(id);
// }

function setUser(user){
    token= jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret)
    return token;
}

function getUser(token){
    if(!token)return null;
    try{
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }
}

module.exports={
    setUser,
    getUser
}