const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb'); // use GridFSBucket instead of gridfs-stream
require('dotenv').config();
const { Readable } = require('stream');

// MongoDB URI
const mongoURI = process.env.MONGODB_URL;

// Create Mongo Connection
const conn = mongoose.createConnection(mongoURI, {dbName: 'test',useNewUrlParser: true,useUnifiedTopology: true });
let bucket;     // Init bucket
conn.once('open', () => {       // Setup database connection
  bucket = new GridFSBucket(conn.db, {
    bucketName: 'images',
  });
  console.log("DB connected for images");
});

// Check if a file with id exists
const checkFile = async (id) => {
  const _id = new mongoose.Types.ObjectId(id);
  const file = await conn.db.collection('images.files').findOne({ _id: _id });
  if (!file) {
    return false;
  }
  return file;
}

// Upload a new image
const uploadImage = async (req, res) => {
  try {

    const file = req.file; // multer already parsed it (use .single('image') in multer middleware)
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const writeStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype, // optional, but good to store
      metadata: { fieldName: file.fieldname } // optional metadata
    });

    const readableStream = Readable.from(file.buffer); // Important: Convert buffer to stream
    readableStream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    return res.status(200).json({ success: true, fileId: writeStream.id });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an image by ID
const deleteImage = async (req, res) => {
  const fileId = req.params.id;
  const file = await checkFile(fileId);
  if(!file){
    return res.status(404).json({ success: false, message: 'File not found' });
  }
  bucket.delete(new mongoose.Types.ObjectId(fileId), (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(200).json({ success: true, message: 'File deleted successfully' });
  });
};

// Test GFS access
const test = async (req, res) => {
  try {
    const testFilename = `test_access_${Date.now()}.txt`;
    const testContent = 'This is a test to check GridFS write access.';

    // Write Test
    const writeStream = bucket.openUploadStream(testFilename);
    const readableStream = Readable.from(testContent);
    readableStream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Find Uploaded File
    const uploadedFile = await bucket.find({ filename: testFilename }).toArray();
    if (!uploadedFile || uploadedFile.length === 0) {
      console.error("Error: Test file not found after upload.");
      return res.status(500).send({ hasGridFSAccess: false });
    }
    console.log("Write access to GridFS appears to be OK.");

    // Read Test
    const readStream = bucket.openDownloadStream(uploadedFile[0]._id);
    let readData = '';
    await new Promise((resolve, reject) => {
      readStream.on('data', (chunk) => {
        readData += chunk.toString();
      });
      readStream.on('end', resolve);
      readStream.on('error', reject);
    });

    if (readData === testContent) {
      console.log("Read access to GridFS appears to be OK.");
    } else {
      console.error("Error: Read data does not match written data.");
      return res.status(500).send({ hasGridFSAccess: false });
    }

    // Cleanup
    await bucket.delete(uploadedFile[0]._id);
    console.log("Test file cleaned up.");
    return res.status(200).send({ hasGridFSAccess: true });

  } catch (error) {
    console.error("Error checking GridFS access:", error);
    return res.status(500).send({ hasGridFSAccess: false });
  }
};

const getImageById = async (req, res) => {
  const fileId = req.params.id;
  try {
    const _id = new mongoose.Types.ObjectId(fileId);

    const file = await checkFile(fileId);
    if (!file) {
      return res.status(404).send('File metadata not found');
    }

    res.set('Content-Type', file.contentType);
    

    const downloadStream = bucket.openDownloadStream(_id);

    downloadStream.on('error', (error) => {
      console.error(error);
      res.status(500).send('Error downloading image');
    });

    downloadStream.pipe(res); // <<=== directly pipe the stream to response
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Invalid ID' });
  }
};


module.exports = { uploadImage, deleteImage, test,getImageById };
