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

router.put("/update/:id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      imageURL: req.body.imageURL,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
    });
    res.status(200).send({ success: true, artist: artist });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update artist" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const artist = await Artist.deleteOne({ _id: req.params.id });
    if (!artist.deletedCount) {
      return res.status(404).send({ success: false, error: "Artist not found" });
    }
    res.status(200).send({ success: true, message: "Artist deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: "Failed to delete artist" });
  }
});

module.exports = router;
