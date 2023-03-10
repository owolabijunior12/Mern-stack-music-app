const router  =require("express").Router();

const artist =   require("../modules/artist");




router.get("/getAll", async (req,res) =>{
    return res.json("hello it your boy Iboytech he got you artist......")
})

module.exports = router