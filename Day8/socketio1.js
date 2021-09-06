const express = require('express');
const static = require('serve-static');
const path = require('path');
const logger = require('morgan');
// npm i socket.io
const socketio = require('socket.io');
// npm i cors
const cors = require('cors');


const app = express()

app.use(logger('dev'));
app.use(cors());    // 클라이언트에서 ajax로 요청

app.use('/public', static(path.join(__dirname, 'public')))

const server = app.listen(3000, () => {
    console.log('3000포트로 서버 실행중 ...');
});

const io = socketio(server);

io.sockets.on('connection', (socket) => {
    console.dir(`connection : ${socket.request.connection._peername}`);
    socket.remoteAddress = socket.request.connection._peername.address; // 사용자 ip
    socket.remotePort = socket.request.connection._peername.port;   // 사용자 port
    console.log(`socket.remoteAddress : ${socket.remoteAddress}`);
    console.log(`socket.remotePort : ${socket.remotePort}`);
    
    socket.on('message', function(message){
        console.log('message 이벤트를 받았습니다.');
        console.dir(message);

        // 모든 접속된 사용자에게 message를 그대로 보냄
        io.sockets.emit('message', message);
    });
});

