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
    pass: process.env.password
  }
});
const hash_token = process.env.hash_token
const token = process.env.token
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//read get all files from this folder
const files = fs.readdirSync(__dirname + "/pages/post")

//filter out this file
const filesfiltered = files.filter(file => file !== `index.js`)

//require all files
filesfiltered.forEach(file => require(`./pages/post/${file}`)(app,fs,json,nodemailer,cryptojs,CryptoJS,transporter,hash_token,token))

//require all files in pages/get
const filesget = fs.readdirSync(__dirname + "/pages/get")
filesget.forEach(file => require(`./pages/get/${file}`)(app,fs,json,nodemailer,cryptojs,CryptoJS,transporter))
//start server
app.listen(3000, () => {
  console.log('server started');
});
//check if its someones birthday
function checkbirthday() {
    var json_data = require('./database.json')
    var date = new Date()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    var today = `${day}.${month}.${year}`
    for (var i in json_data.user) {
        if (json_data.user[i].birthday === today) {
            var mailOptions = {
                from: 'emidblol@gmail.com',
                to: i,
                subject: 'Happy birthday!',
                text: 'Happy birthday! I hope you have a great day!'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            }
            );
        }
    }
}
