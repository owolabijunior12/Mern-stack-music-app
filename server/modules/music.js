const mongoose  = require("mongoose");
const artistSchema = mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
    
        imageURL: {
          type: String,
          required: true,
        },
        songUrl: {
          type: String,
          required: true,
        },
        album: {
          type: String,
        },
        artist: {
          type: String,
          required: true,
        },
        language: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );

module.exports =  mongoose.model("music", artistSchema);