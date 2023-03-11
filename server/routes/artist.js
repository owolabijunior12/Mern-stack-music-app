const express = require("express");
const router = express.Router();
const Artist = require("../modules/artist");

router.post("/save", async (req, res) => {
  try {
    const newArtist = await Artist.create({
      name: req.body.name,
      imageURL: req.body.imageURL,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
    });
    res.status(200).send({ success: true, artist: newArtist });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Failed to save artist" });
  }
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).send({ error: "Artist not found" });
    }
    res.status(200).json(artist);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve artist" });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const artists = await Artist.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, artists });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve artists" });
  }
});

router.delete("/delete/:id",async (req,res) =>{
    
})

module.exports = router;
