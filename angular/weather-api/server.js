const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require('path')
app.use(express.static( __dirname + '/public/dist/public'));
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

app.listen(8000, () => console.log("listening on port 8000"));