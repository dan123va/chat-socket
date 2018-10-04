const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server),
      mongoose = require('mongoose'),
      path = require('path')
      
mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true })
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

app.set('port', process.env.PORT || 3000)

require('./sockets')(io)

app.use(express.static(path.join(__dirname, 'public')))

server.listen(app.get('port'), ()=>{
    console.log('server on port '+ app.get('port'));
})
