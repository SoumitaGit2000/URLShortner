const mongoose = require("mongoose")

const urlshort = new mongoose.Schema({
    shortid:{
        type:String,
        require:true,
        unique:true
    },
    redirecturl:{
        type:String,
        require:true
    },
    visitHistory:[{ timestamp : {type: Number}}],//click time
    createdBy: {
        //type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "user",  // Adjust based on your user model name
        required: true
    }
},
{timestamps: true}//create time
)

const url = mongoose.model("url",urlshort)

module.exports = url;