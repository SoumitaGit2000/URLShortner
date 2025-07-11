//const sessionIdToUserMap = new Map()
const jwt = require("jsonwebtoken")
const secret = "$Soumita$89651@#"

/*function setUser(id, User){
    //console.log("UID from cookie:", id);
    //console.log("User fetched from session map:", userGetId);
    console.log("Session created for:", id, "User:", User.email);
    sessionIdToUserMap.set(id,User)
}*/

//token making function
function setUser(user){
   return jwt.sign({_id: user._id, email: user.email, role: user.role},secret);
}


function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,secret) // verifying user's token with secret key
    } catch (error) {
        console.error("Invalid token:", err.message);
        return null;
    }
}


module.exports = {
    setUser,
    getUser
}