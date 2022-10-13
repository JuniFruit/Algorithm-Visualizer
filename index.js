const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "./alg-visualizer1.0")));

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./alg-visualizer1.0", "index.html"));
  });



app.listen(port, () => {
  console.log ('Success!')
})