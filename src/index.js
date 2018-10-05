const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server),
      mongoose = require('mongoose'),
      path = require('path')
      
mongoose.connect('mongodb://liberti:liberti1@ds223653.mlab.com:23653/chat-database', { useNewUrlParser: true })
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

app.set('port', process.env.PORT || 3000)

require('./sockets')(io)

app.use(express.static(path.join(__dirname, 'public')))

server.listen(app.get('port'), ()=>{
    console.log('server on port '+ app.get('port'));
})
