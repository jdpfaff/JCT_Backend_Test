const mongoose = require('mongoose');
const multer = require('multer');
const config = require('config');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const Recording = require('../../models/Recording');
const Appointment = require('../../models/Appointment');

const conn = mongoose.connection;

// Uploading the MP3 File
module.exports = router => {

  let gfs;

  conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  });

  const storage = new GridFsStorage({
    url: config.get('mongoURI'),
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const upload = multer({ storage });
  router.post('/', upload.single('file'), async(req, res) => {
    try{
      const appointment = await Appointment.findById(req.body.appointment);
      const file = req.file;
      recording = new Recording({
        user: appointment.user,
        date: appointment.start,
        composer: appointment.composer,
        title: appointment.title,
        time: appointment.time,
        id: file._id,
        length: file.size,
        filename: file.filename,
        type: file.contentType
      });

      await recording.save();
      res.json(recording);

    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
  });

  router.get('/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        console.log(!file);
        return res.status(404).json({
          err: 'No file exists'
        });
      }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
  });
}
