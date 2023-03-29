const express = require("express");
const router = express.Router();
const Music = require("../modules/music");

router.post("/save", async (req, res) => {
  try {
    const newMusic = await Music.create({
      name: req.body.name,
      imageURL: req.body.imageURL,
      songUrl: req.body.songUrl,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      category: req.body.category,
    });
    res.status(200).send({ success: true, music: newMusic });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Failed to save music" });
  }
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    if (!music) {
      return res.status(404).send({ error: "Music not found" });
    }
    res.status(200).json(music);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve music" });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const music = await Music.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, music });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve music" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      imageURL: req.body.imageURL,
      songUrl: req.body.songUrl,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      category: req.body.category,
    });
    res.status(200).send({ success: true, music });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update music" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Music.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).send({ success: false, error: "Music not found" });
    }
    res.status(200).send({ success: true, message: "Music deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: "Failed to delete music" });
  }
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Internal Server Error" });
});
module.exports = router;
