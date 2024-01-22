// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();

require('dotenv').config()
const projectId = process.env.PROJECT_ID;
const sessionId = '12345';
// const sessionId = process.env.SESSION_ID;
const queries = [
  'Hi there, How are you?',
  'What is the weather like today?',
  'B'
];
const languageCode = 'en';

async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

async function executeQueries(projectId, sessionId, queries, languageCode) {
  // Keeping the context across queries let's us simulate an ongoing conversation with the bot
  let context;
  let intentResponse;
  for (const query of queries) {
    try {
      console.log(`Sending Query: ${query}`);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );
      console.log('Detected intent');
      console.log(
        `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
      );
      // Use the context from this response for next queries
      context = intentResponse.queryResult.outputContexts;
    } catch (error) {
      console.log(error);
    }
  }
}

executeQueries(projectId, sessionId, queries, languageCode);


// require('dotenv').config()
// const APIAI_TOKEN = process.env.APIAI_TOKEN;
// const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;

// const express = require('express');
// const app = express();

// const path = require('path');

// app.get('/public/css/style.css', function(req, res) {
//   res.header("Content-Type", "text/css");
//   res.sendFile(__dirname + '/public/css/style.css');
// });

// // app.get('/public/js/script.js', function(req, res) {
// //   res.header("Content-Type", "application/javascript");
// //   res.sendFile(path.join(__dirname, 'public', 'js', 'script.js'));
// // });

// app.get('/public/js/script.js', (req, res) => {
//   res.setHeader('Content-Type', 'application/javascript');

//   const fs = require('fs'); 
//   const jsContent = fs.readFileSync('public/js/script.js', 'utf8');
//   res.send(jsContent);
// });

// app.use(express.static(__dirname + '/views')); // html
// app.use(express.static(__dirname + '/public')); // js, css, images

// const server = app.listen(process.env.PORT || 8000, () => {
//   console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
// });

// const io = require('socket.io')(server);
// io.on('connection', function(socket){
//   console.log('a user connected');
// });

// const apiai = require('apiai')(APIAI_TOKEN);

// // Web UI
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// io.on('connection', function(socket) {
//   socket.on('chat message', (text) => {
//     console.log('Message: ' + text);

//     // Get a reply from API.ai

//     let apiaiReq = apiai.textRequest(text, {
//       sessionId: APIAI_SESSION_ID
//     });

//     apiaiReq.on('response', (response) => {
//       let aiText = response.result.fulfillment.speech;
//       console.log('Bot reply: ' + aiText);
//       socket.emit('bot reply', aiText);
//     });

//     apiaiReq.on('error', (error) => {
//       console.log(error);
//     });

//     apiaiReq.end();

//   });
// });