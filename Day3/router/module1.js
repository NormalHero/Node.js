module.exports = (app, fs) => {

    // http://127.0.0.1:3000
    app.get('/', (req, res) => {
        console.log('module1.js 실행');
        res.render('index.ejs', {
            length: 10
        });
    });

    // http://127.0.0.1:3000/about
    app.get('/about', (req, res) => {
        res.render('about.html');
    });

    // http://127.0.0.1:3000/list
    app.get('/list', (req, res) => {
        // __dirname : 현재 디렉토리
        fs.readFile(__dirname + "/../data/member.json", "utf-8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log(data);
                res.writeHead(200, {'content-type':'text/json;charset=utf-8'});
                res.end(data);
            }
        });
    });

    // http://127.0.0.1:3000/getMember/banana
    app.get('/getMember/:userid', (req, res) => {
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                const member = JSON.parse(data);
                res.json(member[req.params.userid])
            }
        });
    });

    // http://127.0.0.1:3000/joinMember/avocado
    app.post('/joinMember/:userid', (req, res) => {
        const result = {};
        const userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]){
            result["code"] = 100;   // 100 : 실패
            result["msg"] = "매개변수가 전달되지 않음";
            res.json(result);
            return false;
        }

        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                const member = JSON.parse(data);
                if(member[userid]){
                    result["code"] = 101;   // 101 : 중복된 아이디
                    result["msg"] = "중복된 아이디";
                    res.json(result);
                    return false;
                }
                console.log(req.body);
                member[userid] = req.body;
                // member[avocado]
                fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf8', (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        result["code"] = 200;
                        result["msg"] = "성공";
                        res.json(result);
                    }
                });
            }
        });
    });

    // http://127.0.0.1:3000/updateMember/avocado
    app.put('/updateMember/:userid', (req, res) => {
        const result = {};
        const userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]){
            result["code"] = 100;
            result["msg"] = "매개변수가 전달되지 않음";
            res.json(result);
            return false;
        }
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                const member = JSON.parse(data);
                member[userid] = req.body;
                fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf8', (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        result["code"] = 200;
                        result["msg"] = "성공";
                        res.json(result);
                    }
                });
            }
        });
    });

    // http://127.0.0.1:3000/deleteMember/avocado
    app.delete('/deleteMember/:userid', (req, res) => {
        const result = {};
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                const member = JSON.parse(data);
                if(!member[req.params.userid]){
                    result["code"] = 102;
                    result["msg"] = "사용자를 찾을 수 없음";
                    res.json(result);
                    return false;
                }
                delete member[req.params.userid];
                fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf8', (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        result["code"] = 200;
                        result["msg"] = "성공";
                        res.json(result);
                    }
                });
            }
        });
    });
}
