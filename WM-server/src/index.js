const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'james',
  password : 'raiders83',
  database : 'workshop_management'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use("/uploaded_images", express.static("uploaded_images"))
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

