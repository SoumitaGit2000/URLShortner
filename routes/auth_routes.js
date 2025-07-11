const express = require("express")

const {handelersingup, handelergetdata,handelergetfrontpage, handledeletebyemail,handelersingupadmin,handlerlogin,handlerAdminLogin,handlerLogout,handlergetadminpage,handleradminLogout} = require("../controller/auth_controller")
const route = express.Router()

route.post("/signup",handelersingup)
route.get("/home",handelergetdata)
route.get("/",handelergetfrontpage)
route.get("/get/delete/:email",handledeletebyemail)
route.post("/login",handlerlogin)
route.post("/admin",handlerAdminLogin)
route.post("/admincreate",handelersingupadmin)
route.get("/logout",handlerLogout)
route.get("/adminlogout",handleradminLogout)

route.get("/admincreate",handlergetadminpage);



module.exports = route