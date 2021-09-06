const express = require('express');
const bodyparser = require('body-parser');
// npm i mysql
const mysql = require('mysql');
const logger = require('morgan');
const config = require('./config.json');

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyparser.urlencoded({extended:false}));
app.use(logger('dev'));

const pool = mysql.createPool(config);

// http://127.0.0.1:3000/regist
router.route('/regist').post((req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const hp = req.body.hp;
    const email = req.body.email;
    const hobby = req.body.hobby;
    const ssn1 = req.body.ssn1;
    const ssn2 = req.body.ssn2;
    const zipcode = req.body.zipcode;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const address3 = req.body.address3;

    console.log(`userid:${userid}, userpw:${userpw}, name:${name}, hp:${hp}, email:${email}, hobby:${hobby}, ssn1:${ssn1}, ssn2:${ssn2}, zipcode:${zipcode}, address1:${address1}, address2:${address2}, address3:${address3} `);

    if(pool){
        joinMember(userid, userpw, name, hp, email, hobby, ssn1, ssn2, zipcode, address1, address2, address3, (err, result) => {
            if(err){
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.end();
            }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 성공</h2>');
                res.end();
            }
        })
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결실패</h2>');
        res.end();
    }
});

// http://127.0.0.1:3000/login
router.route('/login').post((req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid:${userid}, userpw:${userpw}`);
    if(pool){
        loginMember(userid, userpw, (err, result) => {
            if(err){
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.end();
            }else{
                // mem_idx, mem_userid, mem_name, mem_hp
                console.dir(result);
                const idx = result[0].mem_idx;
                const id = result[0].mem_userid;
                const name = result[0].mem_name;
                const hp = result[0].mem_hp;

                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 성공</h2>');
                res.write(`<p>번호 : ${idx}</p>`);
                res.write(`<p>아이디 : ${id}</p>`);
                res.write(`<p>이름 : ${name}</p>`);
                res.write(`<p>휴대폰 : ${hp}</p>`);
                res.end();
                
            }
        })
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결실패</h2>');
        res.end();
    }
});


// 과제 : update, delete 관련 REST API 만들기!!



const joinMember = function(userid, userpw, name, hp, email, hobby, ssn1, ssn2, zipcode, address1, address2, address3, callback){
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
            return;
        }else{
            console.log('데이터베이스 연결 성공!');
            const sql = conn.query('insert into tb_member (mem_userid, mem_userpw, mem_name, mem_hp, mem_email, mem_hobby, mem_ssn1, mem_ssn2, mem_zipcode, mem_address1, mem_address2, mem_address3) values(?,?,?,?,?,?,?,?,?,?,?,?)', [userid, userpw, name, hp, email, hobby, ssn1, ssn2, zipcode, address1, address2, address3], (err, result) => {
                conn.release();
                if(err){
                    callback(err, null);
                    return;
                }else{
                    console.log('가입완료!');
                    callback(null, result);
                }
            })
        }
    })
}

const loginMember = function(userid, userpw, callback){
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
            return;
        }else{
            const sql = conn.query('select mem_idx, mem_userid, mem_name, mem_hp from tb_member where mem_userid=? and mem_userpw=?',[userid, userpw], (err, result) => {
                conn.release();
                if(err){
                    callback(err, null);
                    return;
                }else{
                    if(result.length > 0){
                        console.log("일치하는 사용자를 찾음");
                        callback(null, result);
                    }else{
                        console.log("일치하는 사용자가 없음");
                        callback(null, null);
                    }
                    return;
                }
            });
        }
    });
}

app.use('/', router);

app.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행중 ...`);
})
