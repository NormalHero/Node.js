// npm i nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ryuzy1011@gmail.com',
        pass: '1111'
    },
    host: 'smtp.mail.com',
    port: '465'
});

const mailOption = {
    from: '류정원<ryuzy1011@gmail.com>',
    to: '류정원<ryuzy@naver.com',
    subject: 'node.js로 보내는 메일',
    html: "<h2>안녕하세요. node.js로 보내는 메일입니다.<h2><p style='font-size: 15px; color: deeppink;'>정말 잘~~~~ 가나요?</p>"
};

transporter.sendMail(mailOption, (err, info) => {
    if(err){
        console.log(err);
    }else{
        console.log(info);
    }
    transporter.close()
});
