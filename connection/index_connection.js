const mon = require("mongoose")
mon.set("strictQuery","true")

async function connectmongoose(url)
{
    return mon.connect(url)
}

module.exports = {
    connectmongoose
}
