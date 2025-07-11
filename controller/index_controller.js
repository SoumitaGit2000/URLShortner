const shortid = require("shortid")
const url = require("../models/index_models") // calling schema 
const fs = require('fs')
const user = require("../models/auth_models")

//Creating short id
async function handlecreateurl(req, res){
    console.log("Create short url called")
    console.log("Current user is", req.user); 

        const body = req.body // getting actual url
        if(!body.url) // if user give null
            return res.status(400).json({"Error":"URL not found"})
        const short_id = shortid() // use to create shortid
        await url.create({
            shortid : short_id, // storing short id
            redirecturl:body.url, // storing original url
            visitHistory:[],// passing an array, which stores the click time
            createdBy: req.user?._id,
        })

        fs.appendFile("url_logs.txt",`Time: ${Date.now}, Redirect url: ${body.url}, Shorturl: ${shortid}`,(data,err)=>{
            if(err)
                return console.log("Data is not appended in file")
            else
                return console.log("Data is appended")
        })

        //return res.json({id : short_id});
        /*return res.render("home",{
            id: short_id
        }).redirect('/')*/
        return res.redirect("/home")
}

async function handlegetallurl(req,res)
{
    console.log("Get url called")
    const geturl  = await url.find({createdBy: req.user._id }) // return all data present inside the database, {} means match everything.
    return res.json({geturl})
}

// async function handlegeturl(req,res)
// {
//     console.log("Get url called")
//     const surl  = req.params.shortid // return all data present inside the database, {} means match everything.
//     const entry =  await url.findOneAndUpdate(
//         {
//             shortid: surl,
//         },
//         {
//             $push: {
//                 visitHistory: {
//                     timestamp : Date.now()
//                 }
//             },
//         },
//         { new: true }
//     );
//         return res.redirect(entry.redirecturl)
// }

async function handlegeturl(req,res) {
  const shortid = req.params.shortid;
  const entry = await url.findOne({ shortid });
  if (!entry) return res.status(404).send('Short URL not found');
  entry.visitHistory.push({ timestamp: Date.now() });
  await entry.save();
  res.redirect(entry.redirecturl);
};



async function handlegeturlbyid(req,res)
{
    console.log("Get url by id called")
    const get_id = await url.findById(req.params.id)
    return res.json({get_id})
}

async function handledeletebyid(req,res)
{
    console.log("Delete details by id")
    await url.findByIdAndDelete(req.params.id)
    return res.status(200).json({"Status":"Successfull"})
}

async function handledeletebyshortid(req, res) {
    console.log("Delete details by Shortid");
    const surl = req.params.shortid;
    const result = await url.findOneAndDelete({
        shortid: surl,
        createdBy: req.user._id
    })
    if (!result)
    {
        console.log("Delete does not happen")
    }
    //await url.findOneAndDelete({ shortid: surl });
    return res.redirect("/home"); // Show updated list after deletion
}

module.exports = {
    handlecreateurl,
    handlegetallurl,
    handlegeturlbyid,
    handlegeturl,
    handledeletebyshortid,
    handledeletebyid
}
