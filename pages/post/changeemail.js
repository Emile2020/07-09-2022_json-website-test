//start the module.exports function
module.exports = (app, fs, json, nodemailer, cryptojs, transporter) => {
    //create a post request
    app.post('/changeemail', (req, res) => {
        //check if token is valid
        if (req.body.token === 'token') {
            //get json data
            var json_data = require('../../database.json')
            if (json_data.user[req.body.mail]) {
                var hash = cryptojs.DES.decrypt(json_data.user[req.body.mail].password, 'sleepyamr is sleepy').toString(cryptojs.enc.Utf8);
                //send success
                var mailOptions = {
                    from: 'emidblol@gmail.com',
                    to: req.body.mail,
                    subject: 'Email change!',
                    html : '<h1>Email change?</h1><p>Someone requested a email change for your account! If this was not you, please ignore this email! <br><br> Your new email is: ' + req.body.newmail + ' <br><br> Signed by <br><br> Emile </p>'
                };
                //replace old email with new email
                json_data.user[req.body.newmail] = json_data.user[req.body.mail];
                delete json_data.user[req.body.mail];
                //write to database
                fs.writeFile('./database.json', JSON.stringify(json_data), 'utf8', function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                });
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                }
                );
                res.json({ success: true })
            } else {
                res.json({ error: 'user does not exist' })
            }
        } else {
            res.json({ error: 'invalid token' })
        }
    });
}
