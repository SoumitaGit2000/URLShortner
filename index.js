const express = require("express")
const app = express()
require('dotenv').config();  
const path = require("path")
const cookieParser = require("cookie-parser")
const { checkAuthentication , restrictTo } = require("./middleware/auth_middleware")

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkAuthentication)

//connections
const {connectmongoose} = require("./connection/index_connection")
connectmongoose(process.env.MONGO_URL).then(()=> console.log("Mongodb is connected")).catch((err)=>console.error("Mongodb connection failed",err))

//ejs
app.set("view engine","ejs")
app.set("views", path.resolve("./views"));

//middleware
app.use(express.static('public'))

const route = require("./routes/index_routes")
const stroute = require("./routes/staticroute")
const userRoute = require("./routes/auth_routes")
//app.use("/url",restructToLoggedInUserOnly,route) // inline middleware , if user want to access this url page they have to looged in 
app.use("/url",restrictTo(["NORMAL","ADMIN"]),route)
app.use("/",stroute)
//app.use("/user",checkauth,userRoute)
app.use("/user",userRoute)

const PORT = process.env.PORT || 1600
app.listen(PORT,()=> console.log(`Server is running on ${PORT}`))
