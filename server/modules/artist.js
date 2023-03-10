const mongoose  = require("mongoose");
const artistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL :{
            type: String,
            required: true,
        },
        twitter:{
            type: String,
            required: true,
        },
        instagram:{
            type: String,
            required: true,
        },
        facebook:{
            type: String,
            required: true,
        },    
    },
    {timstramps : true}
);

module.exports =  mongoose.model("artist", artistSchema);