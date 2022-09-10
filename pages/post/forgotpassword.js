//start the module.exports function
module.exports = (app, fs, json, nodemailer, cryptojs, transporter, token, hash_token) => {
    //create a post request
    app.post('/forgotpassword', (req, res) => {
        //check if token is valid
        if (req.body.token === token) {
            //get json data
            var json_data = require('../../database.json')
            if (json_data.user[req.body.mail]) {
                var hash = cryptojs.DES.decrypt(json_data.user[req.body.mail].password, hash_token).toString(cryptojs.enc.Utf8);
                //send success
                var mailOptions = {
                    from: 'emidblol@gmail.com',
                    to: req.body.mail,
                    subject: 'Forgot password!',
                    html : '<h1>Forgot password?</h1><p>Someone requested a password reset for your account! If this was not you, please ignore this email! <br><br> Your password is: ' + hash + ' <br><br> Signed by <br><br> Emile </p>'
                };
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
