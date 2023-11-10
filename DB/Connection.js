const mongoose = require('mongoose');

const ConnectToDb = async() =>
{
   await mongoose.connect('mongodb+srv://chintsrsg:Bealive%405794@rohitblogapp.uiiqgld.mongodb.net/Class')
   .then(() => console.log("Connected to DB!"));
}

module.exports = ConnectToDb;