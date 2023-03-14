const router = require("express").Router();
const user = require("../modules/user");
const admin = require("../configuration/firebase.configuration");
// const userSchema = require("../modules/user");
router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).json({ message: "Authorization header not found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(505).json({ message: "un authorized" });
    } else { 
      // return res.status(200).json({ decodeValue });
      // checking user existance
      const userExists = await user.findOne({"user_id":decodeValue.user_id});
      if(!userExists){
        // return res.send("user not found"); 
        newUserData(decodeValue ,req , res)
      }else{
        updateNewData( decodeValue , req,res)
      }
    }
  } catch (error) {
    return res.status(505).json({ message: "Invalid token" });
  }
}); 

const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verfied: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

const updateNewData = async(decodeValue, req ,res)=>{
  const filter = {user_id: decodeValue.user_id};
  const option ={
    upsert : true,
    new: true,
  };

    try {
        const result = await user.findOneAndUpdate(
          filter,
          {auth_time : decodeValue.auth_time },
          option
        )
        res.status(200).send({user:result });
    } catch (error) {
      res.status(400).send({success :false, msg :error})
    }
}
router.get("/getUser", async(req,res)=>{
  const option  ={
    sort:{
      createdAt: 1, 
    },
  }
  const cursor = await user.find(option);
  if (cursor.length > 0) {
    return res.status(200).send({ success: true, data: cursor });
  } else {
    return res.status(401).send({ success: false, msg: "not found" });
  }
})


module.exports = router;



// async function someFunction(option) {
//   const cursor = await user.find(option);
//   if (cursor.length > 0) {
//     return res.status(200).send({ success: true, data: cursor });
//   } else {
//     return res.status(401).send({ success: false, msg: "not found" });
//   }
// }
