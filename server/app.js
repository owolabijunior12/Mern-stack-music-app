const express = require("express");
const app=express();
require("dotenv").config()
const cors = require("cors");
const {default : mongoose} = require ("mongoose")

const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);
app.use(cors({origin: true}))



app.get("/",(req, res)=>{   
        return res.json("hello it your boy Iboytech......", refreshToken)           
})

//user auth routes
const userRoutes =require("./routes/auth");
const router = require("./routes/auth");
const { refreshToken } = require("firebase-admin/app");
app.use("/api/user/",userRoutes)

const artistRoutes =require("./routes/artist");
app.use("/api/artist/",artistRoutes);

const albumRoutes = require("./routes/album")
app.use("/api/album/",albumRoutes);

const songsRoutes = require("./routes/song"); 
app.use("/api/song/",songsRoutes);


mongoose.connect(process.env.DB_STRINGS,{useNewurlParser : true});

//  const doc = { name: 'John Doe', age: 30, email: 'johndoe@example.com' };


mongoose.connection
.once("open", ()=>console.log("connected to MongoDB DataBase is connected........"))
.on("error",(err)=>{console.log(`Not  connecting to mongoDB ${err}`)})
app.listen(4000,()=>{
    console.log("Server started and listen to port 4000");
})

 module.exports = router

