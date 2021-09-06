// process 객체는 노드에서 항상 사용할 수 있는 객체
// exit는 process 객체 안에 포함
process.on('exit', () => {
    console.log('exit 이벤트 발생!');
});

setTimeout(() => {
    console.log('프로그램을 종료합니다.');
    process.exit
}, 3000);