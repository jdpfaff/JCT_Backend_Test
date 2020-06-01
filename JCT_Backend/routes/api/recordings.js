const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth.js');

const Recording = require('../../models/Recording');
const User = require('../../models/User');
const Appointment = require('../../models/Appointment');

require('./upload')(router);
//require('./download.js')(router);

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

*/

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

module.exports = router;
