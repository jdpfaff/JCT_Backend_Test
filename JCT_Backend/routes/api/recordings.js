const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Recording = require('../../models/Recording');
const Schedule = require('../../models/Schedule');

// Uploading the MP3

router.post('/', async (req, res) => {
  try{

  }
  catch(err){

  }
});

// Change the recording information
router.put('/:id', auth async(req,res) =>  {}

});

// Obtaining the list of archieved MP3's

router.get('/', async (req, res) => {
  try{

  }
  catch(err){

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

module.exports = router;
