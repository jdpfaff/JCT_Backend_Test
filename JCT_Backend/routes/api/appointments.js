const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth.js');

const Schedule = require('../../models/Schedule');
const User = require('../../models/User');

router.post('/',
[auth,
  [
    check('title', 'title is required').not().isEmpty(),
    check('pin', 'a PIN of 6 digits is required').isLength({min: 6, max: 6}),
    check('start', 'please add in a valid date and time').isAfter(),
    check('members', 'please add in a number of performers').isInt({gt: 1, lt: 9}),
    check('time', 'please add in the length you want to record').isInt({gt: 120, lt: 600})
  ]
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var start = new Date(req.body.start);
    var time = req.body.time;
    var end = new Date(start.getTime() + (time * 1000));
    var startBuffer = new Date();
    startBuffer.setTime(start.getTime() - (15*60000));
    var endBuffer = new Date();
    endBuffer.setTime(end.getTime() + (15*60000));

    try {
      let schedule = await Schedule.findOne({
        $or: [
          {start: {$gte: startBuffer, $lte: endBuffer}},
          {end: {$gte: startBuffer, $lte: endBuffer}}
        ]
        }
    )
      if(schedule)
      {
        return res.status(400).json({ errors: [{ msg: "Date has already been claimed"}]});
      }

      const user = await User.findById(req.user.id).select('-password');
      schedule = new Schedule({
        email: user.email,
        composer: user.name,
        time: time,
        start: start,
        members: req.body.members,
        end: end,
        title: req.body.title,
        pin: req.body.pin,
      });

      schedule.save();
      res.json(schedule);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});


module.exports = router;
