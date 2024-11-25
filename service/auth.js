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
        const decodedToken= jwt.verify(token,secret);
        console.log("Decoded Token:", decodedToken); // Debug decoded payload
        return { id: decodedToken.id, role: decodedToken.role }; // Ensure 'role' is present
    }catch(error){
        console.error("Token verification failed:", error.message); // Log error
        return null;
    }
}

module.exports={
    setUser,
    getUser
}