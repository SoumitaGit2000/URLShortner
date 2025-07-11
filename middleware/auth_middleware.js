const {getUser} = require("../service/auth")

function checkAuthentication(req,res,next){
    
    const tokenCookie = req.cookies?.token
    req.user = null
    
    if(!tokenCookie)
        return next();

   
    const token = tokenCookie;
    const user = getUser(token)

    if(!user) return next();
    req.user = user;
    return next();
}

//This function checks if the user is logged in and has the authorized role and if not it will redirct to logging page
function restrictTo(role = []) {
    return function(req, res, next) {
        if (!req.user) {
            console.log("No user on request.");
            return res.redirect("/login");
        }
        if (!role.includes(req.user.role)) {
            console.log("Role mismatch. Required:", role, "User role:", req.user.role);
            return res.redirect("/login");
        }
        return next();
    };
}

module.exports = { checkAuthentication,restrictTo }
