const express = require('express');
const app = express();
const port = 3000;

app.use((req, res) => {
    console.log('첫번째 미들웨어 실행');

    console.dir(req.header);
    const userAgent = req.header('User-Agent');
    console.log(userAgent);

    // http://127.0.0.1:3000/?userid=apple
    const userid = req.query.userid;
    console.log(userid);

    res.writeHead(200, {'content-type':'text/html;charset=utf8'});
    res.write('<h2>익스프레스 서버에서 응답한 메세지입니다.</h2>');
    res.write(`<p>user-agent : ${userAgent}`);
    res.write(`<p>userid : ${userid}`);
    res.end();
})

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중 ...`);
});
