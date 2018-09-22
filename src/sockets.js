module.exports = function (io) {

    var messages = [{
        id: 1,
        text: '',
        nickname: ''
    }]
    let users = {};

    io.on('connection', (socket) => {
        socket.on('new user', (data, cb) => {
            if (data in users) {
                cb(false);
            } else {
                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNicknames();
            }
        });
        //console.log('El cliente con IP: ' + socket.handshake.address + ' se ha conectado.');
        socket.on('send message', (data) => {
            data.nickname = socket.nickname
            messages.push(data)
            console.log(data);
            io.sockets.emit('new message', {
                msg: messages
            })
        })

        socket.on('disconnect', data => {
            if (!socket.nickname) return;
            delete users[socket.nickname];
            updateNicknames();
        });

        function updateNicknames() {
            io.sockets.emit('usernames', Object.keys(users));
        }
    })
}