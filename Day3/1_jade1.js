const express = require('express');
const fs = require('fs');
// npm i jade
const jade = require('jade');

const app = express();
const port = 3000;

const router = express.Router();

router.route('/about').post((req, res) => {
    fs.readFile('./jade1.jade', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            const jd = jade.compile(data);
            res.writeHead(200, {'content-type':'text/html'});
            res.end(jd());
        }
    });
});

app.use('/', router);

app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중 ...`);
});



