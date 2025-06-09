import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // or any other directory where you want to save files
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname)); // optional: rename with timestamp
  }
});

const upload = multer({ storage });

export default upload;
