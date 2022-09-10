//start the module.exports function
module.exports = (app, fs, json, nodemailer, cryptojs, transporter) => {
    //create a post request
    app.post('/changename', (req, res) => {
        //check if token is valid
        if (req.body.token === token) {
            //get json data
            var json_data = require('../../database.json')
            if (json_data.user[req.body.mail]) {
                var hash = cryptojs.DES.decrypt(json_data.user[req.body.mail].password, 'sleepyamr is sleepy').toString(cryptojs.enc.Utf8);
                if (hash === req.body.password) {
                    json_data.user[req.body.mail].name = req.body.name
                    fs.writeFileSync('./database.json', JSON.stringify(json_data), (err) => {
                        if (err) throw err;
                        console.log('The file has been saved!');
                    });
                    //wait for file to be saved
                    setTimeout(() => {
                        //send response
                        res.send(json_data)
                    }, 1000);
                } else {
                    res.json({ error: 'invalid password' })
                }
            } else {
                res.json({ error: 'user does not exist' })
            }
        } else {
            res.json({ error: 'invalid token' })
        }
    });
}