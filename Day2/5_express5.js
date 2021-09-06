const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));

// http://127.0.0.1:3000/member/login
router.route('/member/login').post((req, res) => {
    console.log('/member/login 호출!');
});

http://127.0.0.1:3000/member/regist
router.route('/member/regist').post((req, res) => {
    console.log('/member/regist 호출!');
});

http://127.0.0.1:3000/member/about
router.route('/member/about').get((req, res) => {
    console.log('/member/about 호출!');
})

app.use('/', router);

app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
})

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중 ...`);
});
