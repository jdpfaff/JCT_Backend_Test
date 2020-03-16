const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const words = require('./routes/api/words');

const app = express();

app.use(cors());
app.use(express.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('error'));

app.use('/api/words', words);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log("Server started on port", port);
});
