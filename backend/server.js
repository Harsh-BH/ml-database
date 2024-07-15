const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/datasetDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const datasetSchema = new mongoose.Schema({
  name: String,
  data: Array,
});

const Dataset = mongoose.model("Dataset", datasetSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  // Here, you can clean the data and save it to MongoDB
  // For simplicity, we just save the file name and path
  res.json({
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
