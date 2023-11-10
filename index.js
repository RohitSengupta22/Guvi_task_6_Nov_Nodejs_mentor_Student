const express = require('express')
const ConnectToDb = require('./DB/Connection.js')
const app = express()
require('dotenv').config();
const Router = require('./Routes/Routers.js')
const port = process.env.PORT || 3000;
ConnectToDb();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the class')
})

app.use('/api', Router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})