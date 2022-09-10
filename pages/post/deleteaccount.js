//start the module.exports function
module.exports = (app, fs, json, nodemailer, cryptojs, transporter, token, hash_token) => {
    //create a post request
    app.post('/deleteaccount', (req, res) => {
        //check if token is valid
        if (req.body.token === token) {
            //check if password is correct
            var json_data = require('../../database.json')
            var hash = cryptojs.DES.decrypt(json_data.user[req.body.mail].password, hash_token).toString(cryptojs.enc.Utf8);
            if (hash === req.body.password) {
            //get json data
            var json_data = require('../../database.json')
            //check if user exists
            if (json_data.user[req.body.mail] != undefined) {
                //save old data to ./logdeletions.json
                var log_data = require('../../logdeletions.json')
                log_data.user[req.body.mail] = json_data.user[req.body.mail]
                fs.writeFileSync('./logdeletions.json', JSON.stringify(log_data), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                //wait for file to be saved
                setTimeout(() => {
                //delete user
                delete json_data.user[req.body.mail]
                //save json data
                fs.writeFileSync('./database.json', JSON.stringify(json_data), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                }
                );
                //wait for file to be saved
                setTimeout(() => {
                    //send response
                    res.json({ success: true })
                }, 1000);
                //send email
                var mailOptions = {
                    from: 'emidblol@gmail.com',
                    to: req.body.mail,
                    subject: 'Account deleted!',
                    html : '<h1>Goodbye ' + req.body.name + '!</h1><p>Someone deleted your account! I wanted to thank you for using my service. If it wasn\' you then please send a mail back! <br><br> Signed by <br><br> Emile </p>'
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                }
                );}, 1000);
            } else {
                res.json({ error: 'user does not exist' })
            }
        } else {
            res.json({ error: 'invalid password' })
        }
        } else {
            res.json({ error: 'invalid token' })
        }
    });
};