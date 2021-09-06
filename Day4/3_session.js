const express = require('express');
// npm i express-session
const expressSession = require('express-session');
const bodyparser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended: false}));
app.use(expressSession({
    secret: '!@#$%^&*()',
    resave: false,
    saveUninitialized: true
}))

app.get('/login', (req, res) => {
    fs.readFile('login.html', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data);
        }
    });
});

app.post('/login', (req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`userid=${userid}, userpw=${userpw}`);

    if(userid == 'admin' && userpw == '1234'){
        req.session.member = {
            id: userid,
            userpw: userpw,
            isauth: true
        };
        res.redirect('/main');
    }else{
        res.redirect('/login');
    }
});

app.get('/main', (req, res) => {
    console.log(req.session.member);
    if(req.session.member){
        fs.readFile('main.html', 'utf8', (err, data) => {
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data);
        });
    }else{
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy( () => {
        console.log('세션이 삭제되었습니다');
    });
    res.redirect('/login');
});


app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중 ... `);
});