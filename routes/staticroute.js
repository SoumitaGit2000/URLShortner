const express = require("express")
const URL = require("../models/index_models")
const user = require("../models/auth_models");
const { checkAuthentication,restrictTo} = require("../middleware/auth_middleware")

const router = express.Router();

router.get("/home",  checkAuthentication, restrictTo(["NORMAL","ADMIN"]),async (req, res) => {
    console.log("in static route")
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get('/signup',async (req,res)=>{
    //const user = await User.find({})
    const getdata = await user.find({})
    return res.render("signup",{
        user:getdata
    })
})

router.get('/login',async (req,res)=>{
    return res.render("login")
})

router.get('/admin', async (req, res) => {
    return res.render("adminlogin")
});

router.get('/userlogs', async (req, res) => {
    const getdata = await user.find(); // ✅ fetch all users from DB
    return res.render("userlogs", {
      user: getdata
    });
});

router.get('/admincreate',async (req,res)=>{
    //const user = await User.find({})
    const getdata = await user.find({})
    return res.render("userlogs",{
        user:getdata
    })
})

router.get('/', async (req, res) => {
    return res.render("frontpage")
});



module.exports = router