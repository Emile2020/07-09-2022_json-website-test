const { read } = require('fs');

//start the module.exports function
module.exports = (app, fs, json, nodemailer, cryptojs, transporter, hash_token, token) => {
    //create a post request
    app.post('/usercheck', (req, res) => {
        //check if token is valid
        if (req.body.token === token) {
            //get json data
            var json_data = require('../../database.json')
            var hash = cryptojs.DES.decrypt(json_data.user[req.body.mail].password, hash_token).toString(cryptojs.enc.Utf8);
            if (json_data.user[req.body.mail].password = req.body.password) {
                //send success
                var mailOptions = {
                    from: 'emidblol@gmail.com',
                    to: req.body.mail,
                    subject: 'New login detected!',
                    text: 'Someone logged in to your account! If this was not you, please change your password!'
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
                res.json({ success: true })
            }
        } else {
            res.json({ error: 'invalid token' })
        }
    });
}