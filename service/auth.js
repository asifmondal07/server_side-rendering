
const jwt=require("jsonwebtoken");
const secret="@Asifmondal7ai@"



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
        const decodedToken= jwt.verify(token,secret);
        return decodedToken;
    }catch(error){
        console.error("Token verification failed:", error.message); // Log error
        return null;
    }
}

module.exports={
    setUser,
    getUser
}