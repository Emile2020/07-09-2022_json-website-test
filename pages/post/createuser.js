//start the module.exports function
module.exports = (app, fs, json, nodemailer, cryptojs, CryptoJS, transporter) => {
    //create a post request
    app.post('/createuser', (req, res) => {
        //check if token is valid
        if (req.body.token === 'token') {
            //get json data
            var json_data = require('../../database.json')
            //check if user exists
            if (json_data.user[req.body.mail] != undefined) {
                res.json({ error: 'user already exists' })
            } else {
                //create user
                json_data.user[req.body.mail] = {
                    password: cryptojs.DES.encrypt(req.body.password, 'sleepyamr is sleepy').toString(),
                    name: req.body.name,
                }
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
                    subject: 'New account created!',
                    html : '<h1>Welcome ' + req.body.name + '!</h1><p>Someone created an account with your email! I wanted to thank you for signing up to my service. If it wasn\' you then please send a mail back! <br><br> Signed by <br><br> Emile </p>'
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
            }
        } else {
            res.json({ error: 'invalid token' })
        }
    });
};
