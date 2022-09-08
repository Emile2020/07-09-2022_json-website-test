const express = require('express');
const app = express();
const fs = require(`fs`)
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const json = require("JSON")
const nodemailer = require('nodemailer');
const cryptojs = require('crypto-js');
const CryptoJS = cryptojs;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emidblol@gmail.com',
    pass: 'wfiyeofumjcnqwtx'
  }
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//read get all files from this folder
const files = fs.readdirSync(__dirname + "/pages/post")

//filter out this file
const filesfiltered = files.filter(file => file !== `index.js`)

//require all files
filesfiltered.forEach(file => require(`./pages/post/${file}`)(app,fs,json,nodemailer,cryptojs,CryptoJS,transporter))

//start server
app.listen(3000, () => {
  console.log('server started');
});
