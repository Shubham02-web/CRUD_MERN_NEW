import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb("Errror While set destination in upload multer", "uploads"),
  filename: (req, file, cb) =>
    cb("Error while creating File Name", `${Date.now()}+${file.originalname}`),
});

const upload = multer({ storage });

export default upload;
