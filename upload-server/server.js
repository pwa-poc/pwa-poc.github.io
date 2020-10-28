var express = require('express');
var multer = require('multer');
var cors = require('cors');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

var upload = multer({ storage: storage });

var port = 3000;
var corsOptions = {
    //origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var app = express();
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.post('/upload', upload.array('uploads', 4), function (req, res, next) {
    // req.files is array of `uploads` files
    // req.body will contain the text fields, if there were any
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});