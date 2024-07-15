import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.file.filename);
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      if (data && data[req.body.param1] && data[req.body.param2]) {
        results.push(data);
      }
    })
    .on("end", () => {
      const dataset = new Dataset({ name: req.file.filename, data: results });
      dataset.save().then(() => {
        res.json({
          fileName: req.file.filename,
          filePath: `/uploads/${req.file.filename}`,
        });
      });
    });
});

app.get("/datasets", async (req, res) => {
  const datasets = await Dataset.find();
  res.json(datasets);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
