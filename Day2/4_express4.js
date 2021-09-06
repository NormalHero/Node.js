const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res) => {
    // http://127.0.0.1:3000/?userid=apple&userpw=1111 (X)
    // http://127.0.0.1:3000 (O)
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`userid:${userid}, userpw:${userpw}`);

    res.writeHead(200, {'content-type':'text/html;charset=utf-8'});
    res.write('<h2>익스프레스 서버에서 응답한 메세지입니다.</h2>');
    res.write(`<p>아이디 : ${userid}`);
    res.write(`<p>비밀번호 : ${userpw}`);
    res.end();
});

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중 ...`);
});
