const express = require('express');
const bodyParser = require('body-parser');
const static = require('serve-static');
const multer = require('multer');
const path = require('path');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const fs = require('fs');


const port = 3000;

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(logger('dev'));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        callback(null, basename + "_" + Date.now() + extension);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 1024 * 1024 * 100
    }
});

router.route('/mail').post(upload.array('photo', 1), (req, res) => {
    try{
        // 파일 읽어오기

        // 메일 작성

        fs.readFile('uploads/' + filename, (err, data) => {
            
            // ....

            const mailOptions = {
                from: " ... ",
                to: " ... ",
                subject: " ...",
                text: " ... ",
                attachments: [{'filename':filename, 'content': data}]
            };
        });

        // 몽고디비에 메일 전송한 내역을 저장
        // 작성자, 작성자이메일, 수신자, 수신자이메일, 제목, 내용, 파일이름 ...
        // 메일 수신자는 저에게로... ryuzy@naver.com

    }catch(e){
        console.log(e);
    }
});



app.use('/', router);

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중 ...`);
})