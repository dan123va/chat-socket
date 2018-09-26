const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')
const path = require('path')

mongoose.connect('mongodb://localhost/chat')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

app.set('port', process.env.PORT || 3000)

require('./sockets')(io)

app.use(express.static(path.join(__dirname, 'public')))

server.listen(app.get('port'), ()=>{
    console.log('server on port '+ app.get('port'));
})
