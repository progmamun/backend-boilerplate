import multer from "multer";
import path from "path";
import fs from "fs";

// make sure upload directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const removeExtension = (filename: string) => {
  return filename.split(".").slice(0, -1).join(".");
};

// Use local disk storage instead of Cloudinary
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName =
      Math.random().toString(36).substring(2) +
      "-" +
      Date.now() +
      "-" +
      file.fieldname +
      "-" +
      removeExtension(file.originalname) +
      path.extname(file.originalname); // keep extension

    cb(null, uniqueName);
  },
});

export const multerUpload = multer({ storage });
