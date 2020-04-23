const express = require('express');
const router = express.Router();

const Word = require('../../models/Word');

// Retrieves the list of what has been passed

router.get('/', (req, res) => {
    Word.find()
      .sort({ date : -1})
      .then(words => res.json(words));
});


// Adds to the list

router.post('/', (req, res) => {
    const newWord = new Word({
      name: req.body.name
    });
    newWord.save().then(word => res.json(word));
});

// Deletes from the list using the ID

router.delete('/:id', (req, res) => {
    Word.findById(req.params.id)
     .then(word => word.remove().then(() => res.json({success: true})))
     .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
