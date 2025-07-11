const user = require("../models/auth_models") // calling db and creating object
const { v4: uuidv4 } = require('uuid');
const {setUser} = require("../service/auth");
const { render } = require("ejs");

async function handelersingup(req, res){
    console.log("Sign up called")
    const { name , email, password } = req.body;
    await user.create({
        name,
        email,
        password
    })
    return res.redirect("/signup")
}

async function handlergetadminpage(req, res){
    res.render("adminsignup")
}

async function handelersingupadmin(req, res){
    console.log("admin create")
    const { name , email, password, role} = req.body;
    await user.create({
        name,
        email,
        password,
        role
    })
    return res.redirect("/userlogs")
}

async function handelergetdata(req,res){
    console.log("Get url by id called")
    const getdata = await user.find({})
    return res.render("login")
}

async function handledeletebyemail(req,res)
{   
    console.log("Delete details by email")
   const mail = decodeURIComponent(req.params.email);
    await user.findOneAndDelete({email: mail})
    //return res.status(200).json({"Status":"Successfull"})
    return res.redirect("/userlogs")
}

// async function handlerlogin(req,res)
// {   
//     console.log("LogIn called")
//     const {email, password} =  req.body;
//     const find = await user.findOne({email, password})
//     if(!find){
//         return res.render("login",{
//             error: "Invalid Cradential"
//         })
//     }
//     //const sessionID = uuidv4() ;// crypto.randomUUID();
//     const token = setUser(find)
//     //setUser(sessionID, find)
//     //res.cookie("uid",sessionID,{ httpOnly: true })
//    res.cookie("token",token, { httpOnly: true })
//     console.log("LogIn called2...")
//     return res.redirect("/")
//     // return res.json({token})
// }


async function handlerlogin(req, res) {
  console.log("LogIn called");
  const { email, password } = req.body;
  const find = await user.findOne({ email, password });

  if (!find) {
    // Pass error message to login view
    return res.render("login", {
      error: "Invalid Credentials"
    });
  }

  const token = setUser(find);
  res.cookie("token", token, { httpOnly: true });
  console.log("LogIn called2...");
  return res.redirect("/home");
}



// async function handlerlogin(req, res) {
//   console.log("LogIn called")

//   try {
//     const getdata = await user.find({});

//     if (!getdata || getdata.length === 0) {
//       // If no user exists, send a flag to the view
//       return res.render("login", { alert: "No users found!" });
//     }

//     // Render login page without alert
//     return res.render("login", { alert: null });

//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// }


async function handlerAdminLogin(req, res) {
    console.log("Admin Login called");
    const { email, password } = req.body;
    const find = await user.findOne({ email, password });

    // if (!find || email !== "soumitabanerjee2000@gmail.com" || password !== "12345") {
    //     return res.render("adminLogin", {
    //         error: "Invalid Credentials"
    //     });
    // }

    if(!find || find.role!=="ADMIN"){
        return res.render("adminLogin",{
            error:"Invalid Credentials"
        })
    }

    return res.redirect("/userlogs");
}

async function handlerLogout(req, res){
    res.clearCookie('cookie'); // Clear the auth cookie
    return res.render("login") // Redirect to login page
};

async function handelergetfrontpage(req,res){
    res.render("frontpage")
}

async function handleradminLogout(req, res){
    res.clearCookie('cookie'); // Clear the auth cookie
    return res.render("adminlogin")
}

module.exports = { handelersingup,handelergetfrontpage,handelersingupadmin, handelergetdata, handledeletebyemail, handlerlogin,handlerAdminLogin,handlerLogout,handlergetadminpage,handleradminLogout}