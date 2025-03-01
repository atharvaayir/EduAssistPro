const multer = require("multer");

const storage = multer.memoryStorage(); // Stores file in memory buffer

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "application/vnd.ms-excel") {
        cb(null, true);
    } else {
        cb(new Error("Only Excel files are allowed!"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
