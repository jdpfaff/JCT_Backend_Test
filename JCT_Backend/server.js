// Just another day in paradise
const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// The routes that will be used
app.use('/api/users', require('./routes/api/words'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/appointments', require('./routes/api/appointments'));
app.use('/api/recordings', require('./routes/api/recordings'));

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log("Server started on port", port)});
