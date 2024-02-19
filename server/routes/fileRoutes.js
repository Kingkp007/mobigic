const express = require('express');
const upload = require("../middlewares/fileUpload");

const {uploadFileCtrl,showAllDocument, deleteFile} = require("../controllers/fileController")

// router object
const router = express.Router();

// POST | UPLOAD FILES
router.post("/upload", upload.single("file"), uploadFileCtrl)

// GET | GET ALL FILES 
router.get("/getAll", showAllDocument);

// DELETE | ONE FILE
router.delete("/delete", deleteFile);


module.exports = router;