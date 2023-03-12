const router = require("express").Router();

const Album = require("../modules/album");

router.post("/save", async (req, res, next) => {
  try {
    const createdAlbum = await Album.create({
            name:req.body.name,
            imageURL: req.body.imageURL
        });
    res.status(200).send({ success: true, album: createdAlbum });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/getOne/:id", async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).send({ error: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/getAll", async (req, res, next) => {
  try {
    const albums = await Album.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, albums });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    const { name, imageURL } = req.body;
    const album = await Album.findByIdAndUpdate(req.params.id, { name, imageURL });
    res.status(200).send({ success: true, album });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const album = await Album.deleteOne({ _id: req.params.id });
    if (!album.deletedCount) {
      return res.status(404).send({ success: false, error: "Album not found" });
    }
    res.status(200).send({ success: true, message: "Album deleted successfully" });
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
