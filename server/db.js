const mongoose = require('mongoose');

const connectDB = async () => {
   try {
      await mongoose.connect('mongodb://localhost:27017/todoapp');
      console.log('Database is connected');
   } catch (err) {
      console.error(err.message);
      process.exit(1);
   }
};

module.exports = connectDB;
