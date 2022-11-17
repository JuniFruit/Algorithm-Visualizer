const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const port = process.env.PORT || 3001; 
const cors = require('cors');
app.use(cors());


app.use(express.static(path.resolve(__dirname, "./client")));

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client", "index.html"));
  });

app.listen(port, () => {
    console.log('Server is listening to ' + port );
})