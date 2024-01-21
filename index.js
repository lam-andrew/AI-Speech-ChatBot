require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;

const express = require('express');
const app = express();

const path = require('path');

app.get('/public/css/style.css', function(req, res) {
  res.header("Content-Type", "text/css");
  res.sendFile(__dirname + '/public/css/style.css');
});

// app.get('/public/js/script.js', function(req, res) {
//   res.header("Content-Type", "application/javascript");
//   res.sendFile(path.join(__dirname, 'public', 'js', 'script.js'));
// });

app.get('/public/js/script.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');

  const fs = require('fs'); 
  const jsContent = fs.readFileSync('public/js/script.js', 'utf8');
  res.send(jsContent);
});

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const apiai = require('apiai')(APIAI_TOKEN);

// Web UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai

    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      console.log('Bot reply: ' + aiText);
      socket.emit('bot reply', aiText);
    });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});