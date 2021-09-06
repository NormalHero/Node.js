const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));

const header = fs.readFileSync('./header.ejs', 'utf8');
const body = fs.readFileSync('./body.ejs', 'utf8');

router.route('/about').post((req, res) => {
    const html = ejs.render(header, {title:'매개변수로 전달된 제목', content:ejs.render(body, {message:'매개변수로 전달된 텍스트 메세지'})});
    res.end(html);
});

app.use('/', router);

app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
})

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중 ...`);
});
