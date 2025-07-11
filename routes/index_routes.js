const express = require("express")

const {handlecreateurl, handlegeturlbyid, handlegetallurl, handledeletebyid,handlegeturl,handledeletebyshortid} = require("../controller/index_controller")
const { checkAuthentication, restrictTo} = require("../middleware/auth_middleware");


const route = express.Router()
route.post("/",checkAuthentication, restrictTo(["NORMAL","ADMIN"]), handlecreateurl);
//route.post("/",handlecreateurl)
route.get('/geturl',handlegetallurl)
route.get("/:id",handlegeturlbyid)
route.delete("/delete/:id",handledeletebyid)
route.get("/shortid/:shortid",handlegeturl)
route.get("/delete/:shortid",handledeletebyshortid)


module.exports = route
