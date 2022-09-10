//get app and fs from file that required this file
module.exports = (app, fs, json, hash_token, token) => {
        app.post('/', (req, res) => {
            
        //set the 'allow-control-allow-origin' header for replit
        res.header("Access-Control-Allow-Origin", "*");
        //fix 'Blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.' error
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //check if token is valid
            if (req.body.token === token) {
                var json_data = require('../../database.json')
                json_data.count++
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
                res.json({ error: 'invalid token' })
            }
        });
};