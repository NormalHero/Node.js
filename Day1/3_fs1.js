// 파일을 다루는 모듈
const fs = require('fs');

fs.readFile('text11.txt', 'utf-8', (err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log(`비동기식으로 읽음 : ${data}`);
    }
});

// 동기식으로 파일 읽기
const text = fs.readFileSync('text1.txt', 'utf-8');
console.log(`동기식으로 읽음 : ${text}`);

