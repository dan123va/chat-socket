$(function () {
  var socket = io.connect('https://chat-liberti.herokuapp.com', { 'forceNew': true })

  const $messageForm = $('#message-form')
  const $messageBox = $('#message')
  const $chat = $('#chat')

  const $nickForm = $('#nickForm');
  const $nickError = $('#nickError');
  const $nickname = $('#nickname');

  const $users = $('#usernames');
  
  function displayMsg(data) {
    $chat.append(`<p class="msg"><b>${data.nick}</b>: ${data.msg}</p>`);
  }

  socket.on('load old msgs', msgs => {
    for (let i = msgs.length - 1; i >= 0; i--) {
      displayMsg(msgs[i]);
    }
  });

  $messageForm.submit(e => {
    e.preventDefault()
    var umessage = {
      text: $messageBox.val(),
      nickname: $nickname.val()
    }
    socket.emit('send message', umessage, data => {
      $chat.append(`<p class="error">${data}</p>`)
    })
    $messageBox.val("")
  })

  socket.on('new message', (data) => {
    var html = data.msg.map((message, index) => {
      if (message.text) {
        return (`
      <div class="message">
          <p>${message.nickname} : ${message.text}<p>
      </div>
      `)
      }
    }).join(' ')

    var div_msgs = document.getElementById('chat')
    div_msgs.innerHTML = html
    div_msgs.scrollTop = div_msgs.scrollHeight

  })

  $nickForm.submit(e => {
    e.preventDefault();
    socket.emit('new user', $nickname.val(), data => {
      if (data) {
        $('#nickWrap').hide()
        $('#contentWrap').show()
      } else {
        $nickError.html(`
            <div class="alert alert-danger">
              That username already Exists.
            </div>
          `);
      }
    });
    $nickname.val('')
  });
  
  
  
  socket.on('usernames', data => {
    let html = '';
    for (i = 0; i < data.length; i++) {
      html += `<button type="submit" id='haa' value='${data[i]}'><i class="fas fa-user"></i>${data[i]}</button><br>`
    }
    $users.html(html);
  })

  socket.on('whisper', data => {
    var html = (`
      <div class="message">
          <p>${data.nick} : ${data.msg}<p>
      </div>
      `)

    var div_msgs = document.getElementById('chat')
    div_msgs.innerHTML = html
    div_msgs.scrollTop = div_msgs.scrollHeight
  })
})