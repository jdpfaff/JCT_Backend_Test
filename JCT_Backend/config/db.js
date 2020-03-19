const mongoose = require('mongoose');
const db = require('config').mongoURI;

const connectDB = async () => {
  try{
    await mongoose.connect(db, {
      useNewUrlParser: true ,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log("MongoDB is connected");
  }catch{
    console.error(err.message);
    //
    process.exit(1);
  }
}

module.exports = connectDB;
