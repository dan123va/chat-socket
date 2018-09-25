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
        socket.on('send message', (data, cb) => {
            data.nickname = socket.nickname
            var dat = data.text
            var msg = dat.trim();
            if (msg.substr(0, 3) === '/w ') {
                msg = msg.substr(3);
                var index = msg.indexOf(' ');
                if (index !== -1) {
                    var name = msg.substring(0, index);
                    var msg = msg.substring(index + 1);
                    if (name in users) {
                        users[name].emit('whisper', {
                            msg: msg,
                            nick: data.nickname
                        });
                    } else {
                        cb('Error! Enter a valid User');
                    }
                } else {
                    cb('Error! Please enter your message');
                }
            } else {
                messages.push(data)
                io.sockets.emit('new message', {
                    msg: messages
                })
            }
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