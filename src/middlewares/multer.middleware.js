import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

<<<<<<< HEAD
export const upload = multer({ storage: storage });
=======
export const upload = multer({ storage: storage });
>>>>>>> 5ea640286e303ebc5dd97ea6ccd6653595630842
