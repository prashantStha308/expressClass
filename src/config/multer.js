import multer from "multer";

const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/storage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname );
    }
})

const upload = multer({ storage: profileStorage });
export default upload;