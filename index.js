const express = require('express')
const ConnectToDb = require('./DB/Connection.js')
const app = express()
const port = 3000
const Router = require('./Routes/Routers.js')

ConnectToDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the class')
})

app.use('/api', Router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})