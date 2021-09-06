const fs = require('fs');
const data = 'Hello Node.js !!';

fs.writeFile('text3.txt', data, 'utf-8', (err) => {
    if(err){
        console.log('에러발생!');
    }else{
        console.log('비동기식으로 파일저장!');
    }
})

fs.writeFileSync('text2.txt', data, 'utf-8');
console.log('동기식으로 파일저장!');

