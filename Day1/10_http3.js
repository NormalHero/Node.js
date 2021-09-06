const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('cat.png', (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'content-type':'image/png'});
            res.end(data);
        }
    });
}).listen(3000, () => {
    console.log('3000번 포트로 이미지 서버 실행중 ...')
});

http.createServer((req, res) => {
    fs.readFile('sound.mp3', (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'content-type':'audio/mp3'});
            res.end(data);
        }
    });
}).listen(4000, () => {
    console.log('4000번 포트로 mp3 서버 실행중 ...')
});