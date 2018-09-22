const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')

app.set('port', process.env.PORT || 3000)

require('./sockets')(io)

app.use(express.static(path.join(__dirname, 'public')))

server.listen(app.get('port'), ()=>{
    console.log('server on port '+ app.get('port'));
})
