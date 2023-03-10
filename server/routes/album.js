const router  =require("express").Router();

router.get("/getAll", async (req,res) =>{
    return res.json("hello it your boy Iboytech he got you album......")
})

module.exports = router