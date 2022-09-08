//start module.exports function
module.exports = (app, fs, json, nodemailer, cryptojs, transporter) => {
    //create a get request
    app.get('/', (req, res) => {
        //check if token is valid
        res.sendFile(__dirname + '/index.html');
    }
    );
};
//end module.exports function