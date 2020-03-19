const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

router.post('/',
[check('name', "Name is required")
.not()
.isEmpty(),
check('email', "Please include a valid email")
.isEmail(),
check('password', "Please enter a password with 8 or more characters")
.isLength({ min: 8 })
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try{
      // Check if Email has been taken
    let user = await User.findOne(({ email }))

    if (user){
      return res.status(400).json({ eroors: [{ msg: "Email has been taken"}]});
    }

    // Begin user registration
    user = new User({
      name,
      email,
      password,
    });

    // Password encryption

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //json webtoken
    
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign
      (payload,config.get('jwtSecret'),
      // { expires in: 3600 },
      (err, token) => {
        if(err) throw err;
        res.json({ token });
      });

  } catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
