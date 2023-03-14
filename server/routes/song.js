const router = require("express").Router();
const Song = require("../modules/song");
const user = require("../modules/user");

router.post("/save", async (req, res, next) => {
  try {
    const createdSong = await Song.create({
      name: req.body.name,
      imageURL: req.body.imageURL,
      songUrl: req.body.songUrl,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      category: req.body.category,
    });
    res.status(200).send({ success: true, song: createdSong }); // Changed 'Song' to 'song'
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/getOne/:id", async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).send({ error: "Song not found" }); // Changed 'song' to 'Song'
    }
    res.status(200).json(song);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/getAll", async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ name: 1 }); // Added sort parameter
    if (!songs || songs.length === 0) { // Changed the condition
      return res.status(404).send({ error: "Songs not found" }); // Changed 'songs' to 'Songs'
    }
    res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      imageURL: req.body.imageURL,
      songUrl: req.body.songUrl,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      category: req.body.category,
    });
    if (!song) {
      return res.status(404).send({ success: false, error: "Song not found" }); // Changed 'song' to 'Song'
    }
    res.status(200).send({ success: true, song });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const song = await Song.deleteOne({ _id: req.params.id });
    if (song.deletedCount === 0) {
      return res.status(404).send({ success: false, error: "Song not found" }); // Changed 'song' to 'Song'
    }
    res.status(200).send({ success: true, message: "Song deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Internal Server Error" });
});

module.exports = router;
