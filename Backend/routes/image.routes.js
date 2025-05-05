// // the code currently active in the demo,
// // sends back the id of the uploaded image, so the front-end can
// // display the uploaded image and a link to open it in a new tab
// const mongoose = require('mongoose');
// const GridFsStorage = require('multer-gridfs-storage');
// const router = require('express').Router();
// const multer = require('multer');
// const crypto = require('crypto');
// const path = require('path');
// require('dotenv').config();

// const mongoURI = process.env.MONGODB_URL;
// const conn = mongoose.createConnection(mongoURI,'', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   useCreateIndex: true,
// });

// let gfs;
// conn.once('open', () => {
//   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: 'images',
//   });
// });

// const storage = new GridFsStorage({
//     url: mongoURI, // make sure mongoURI includes /test
//     options: { useUnifiedTopology: true },
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         // generate random filename
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'images', // 👈 Important: this will create collections images.files and images.chunks
//           };
//           resolve(fileInfo);
//         });
//       });
//     },
//   });
//   ;

// // set up our multer to use the gridfs storage defined above
// const store = multer({
//   storage,
//   // limit the size to 20mb for any files coming in
//   limits: { fileSize: 20000000 },
//   // filer out invalid filetypes
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// function checkFileType(file, cb) {
//   // define a regex that includes the file types we accept
//   const filetypes = /jpeg|jpg|png|gif/;
//   //check the file extention
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // more importantly, check the mimetype
//   const mimetype = filetypes.test(file.mimetype);
//   // if both are good then continue
//   if (mimetype && extname) return cb(null, true);
//   // otherwise, return error message
//   cb('filetype');
// }

// const uploadMiddleware = (req, res, next) => {
//     console.log('middleware start');
//     const upload = store.single('image');
//     console.log('middleware start2');
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).send('File too large');
//     } else if (err) {
//       // check if our filetype error occurred
//       if (err === 'filetype') return res.status(400).send('Image files only');
//       // An unknown error occurred when uploading.
//       console.log(err);
//       return res.sendStatus(500);
//     }
//     // all good, proceed
//     console.log('middleware end');
//     next();
//   });
// };

// router.post('/upload/', uploadMiddleware, async (req, res) => {
//   // get the .file property from req that was added by the upload middleware
//   console.log('controller start');
//   const { file } = req;
//   // and the id of that new image file
//   const { id } = file;
//   // we can set other, smaller file size limits on routes that use the upload middleware
//   // set this and the multer file size limit to whatever fits your project
//   if (file.size > 5000000) {
//     // if the file is too large, delete it and send an error
//     deleteImage(id,res);
//     return res.status(400).send('file may not exceed 5mb');
//   }
//   console.log('uploaded file: ', file);
//   return res.send(file.id);
// });

// const deleteImage = (id, res) => {
//   if (!id || id === 'undefined') return res.status(400).send('no image id');
//   const _id = new mongoose.Types.ObjectId(id);
//   gfs.delete(_id, (err) => {
//     if (err) return res.status(500).send('image deletion error');
//   });
// };

// // this route will be accessed by any img tags on the front end which have
// // src tags like
// // <img src="/api/image/123456789" alt="example"/>
// // <img src={`/api/image/${user.profilePic}`} alt="example"/>
// router.get('/:id', ({ params: { id } }, res) => {
//   // if no id return error
//   if (!id || id === 'undefined') return res.status(400).send('no image id');
//   // if there is an id string, cast it to mongoose's objectId type
//   const _id = new mongoose.Types.ObjectId(id);
//   // search for the image by id
//   gfs.find({ _id }).toArray((err, files) => {
//     if (!files || files.length === 0)
//       return res.status(400).send('no files exist');
//     // if a file exists, send the data
//     gfs.openDownloadStream(_id).pipe(res);
//   });
// });

// module.exports = router;
const path = require('path');
const express = require('express');
const router = express.Router();
const { uploadImage, deleteImage, test, getImageById } = require('../controllers/image.controller');
const multer = require('multer');

const uploadMiddleware = multer({
    storage: multer.memoryStorage(), // Use memory storage here
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
          return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
      },
  }).single('image');

router.post('/upload', uploadMiddleware,uploadImage);
router.delete('/delete/:id',deleteImage);
router.get('/:id', getImageById);
// router.post('/test',upload,test);

module.exports = router;
