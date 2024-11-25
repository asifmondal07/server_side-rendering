const seassionIdToUserMap=new Map();

function setUser(id,user){
    seassionIdToUserMap.set(id,user);
}

function getUser(id){
    return seassionIdToUserMap.get(id);
}

module.exports={
    setUser,
    getUser
}