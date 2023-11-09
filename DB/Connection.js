const mongoose = require('mongoose');

const ConnectToDb = async() =>
{
   await mongoose.connect('mongodb://localhost:27017/Class')
   .then(() => console.log("Connected to DB!"));
}

module.exports = ConnectToDb;