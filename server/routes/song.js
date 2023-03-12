const router  =require("express").Router();
const song = require("../modules/song");


router.post("/save", async (req, res, next) => {
    try {
      const createdSong = await Song.create({
              name:req.body.name,
              imageURL: req.body.imageURL,
              SongURL:req.body.SongURL,
              album:req.body.album,
              artist:req.body.artist,
              language:req.body.language,
              category:req.body.category
          });
      res.status(200).send({ success: true, Song: createdSong });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });


  router.get("/getOne/:id", async (req, res, next) => {
    try {
      const song= await Song.findById(req.params.id);
      if (!song) {
        return res.status(404).send({ error: "song not found" });
      }
      res.status(200).json(song);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  router.get("/getAll/:id", async (req, res, next) => {
    try {
      const song= await Song.find().sort(req.params.id);
      if (!song) {
        return res.status(404).send({ error: "song not found" });
      }
      res.status(200).json(song);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });


  router.put("/update/:id", async (req, res, next) => {
    try {      
      const song = await Song.findByIdAndUpdate(req.params.id, { 
        name:req.body.name,
        imageURL: req.body.imageURL,
        SongURL:req.body.SongURL,
        album:req.body.album,
        artist:req.body.artist,
        language:req.body.language,
        category:req.body.category
       });
      res.status(200).send({ success: true,song });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  router.delete("/delete/:id", async (req, res, next) => {
  try {
    const album = await Song.deleteOne({ _id: req.params.id });
    if (!song.deletedCount) {
      return res.status(404).send({ success: false, error: "Song not found" });
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

module.exports = router