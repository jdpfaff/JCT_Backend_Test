const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth.js');
const Grid = require('gridfs-stream');

const Recording = require('../../models/Recording');
const User = require('../../models/User');
const Appointment = require('../../models/Appointment');
const conn = mongoose.connection;

// Uploading the MP3
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  router.post('/',  [
      check('file', 'file is required').not().isEmpty(),
      check('appointment', 'appointment is required').not().isEmpty()
    ], async(req, res) => {
    const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    try{
      const appointment = await Appointment.findById(req.appointment.id);
      let {
        file
        } = req.file;
      let writeStream = gfs.createWriteStream({
        filename: appointment.title + '-' + appointment.name,
        mode: 'w',
        content_type: 'mp3'
      });

      writestream.on('close', function (file)
      {
        recording = new RecordingSchema({
          user: appointment.user,
          date: appointment.date,
          composer: appointment.composer,
          title: appointment.title,
          time: appointment.time,
          id: file._id,
          length: file.length,
          filename: file.filename,
          type: file.content_type
        });

        recording.insert();
        res.json(recording);
      });

    writeStream.write(file.data);
    writeStream.end();
    }
    catch(err){
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
});

// Change the recording information
/*
router.put('/:id', auth, async(req,res) =>  {
  try{
  const recording = await Recording.findById(req.params.id);
  if(!appointment)
  {
    return res.status(404).json({ msg: "recording not found"})
  }

  if(appointment.user.toString() != req.user.id) {
    return res.status(401).json({ msg: 'User not autherized'});
  }
  
  catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

});

// Obtaining the list of archieved MP3's
// This just contains the list of them, so no need to do anything else yet.

router.get('/', async (req, res) => {
  try{
    const recordings = await Recording.find({private: false}).sort({start: -1});
    res.json(recordings);
  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Obtaining a single MP3
router.get('/:id', async (req, res) => {
  try{

  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
*/
module.exports = router;
