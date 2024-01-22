# AI-Speech-ChatBot
🤖 AI voice chat interface in the browser. This app will listen to the user's voice and reply with a synthetic voice.

### Main Parts of this AI-Speech-ChatBot
1. Utilize Web Speech API's `SpeechRecognition` interface to listen to the user's voice
2. Send user's voice message to natural-language-processing API as a string
3. API.AI will return an AI response using the `SpeechSynthesis` interface to generate a synthetic voice


### Steps for Project setup
- Create file structure:  
    ```.
    ├-- index.js  
    ├── public  
    │   ├── css  
    │   │   └── style.css  
    │   └── js  
    │       └── script.js  
    └── views  
        └── index.html
- Run `npm init -f`
    - `-f` accepts the fault settings. `package.json` file is generated with basic app info
- Add to `package.json` dependencies  
"dependencies": {
&nbsp;&nbsp;&nbsp;&nbsp;"apiai": "^4.0.2",
&nbsp;&nbsp;&nbsp;&nbsp;"dotenv": "^4.0.0",
&nbsp;&nbsp;&nbsp;&nbsp;"ejs": "^2.5.6",
&nbsp;&nbsp;&nbsp;&nbsp;"express": "^4.15.2",
&nbsp;&nbsp;&nbsp;&nbsp;"@google-cloud/dialogflow": "6.3.0",
&nbsp;&nbsp;&nbsp;&nbsp;"socket.io": "^4.7.4",
&nbsp;&nbsp;&nbsp;&nbsp;"socketio": "^1.0.0"
  }
- Run `npm install` to install project dependencies


### Setting up your DialogFlow Agent
- Navigate to DialogFlow documentation https://cloud.google.com/dialogflow/docs
- Follow the DialogFlow ES Path
- Follow the docs like so to create your own DialogFlow ES Agent:  
[DialogFlow basics](https://cloud.google.com/dialogflow/es/docs/basics) --> [Setup and Cleanup](https://cloud.google.com/dialogflow/es/docs/quick/setup) --> [Agent](https://cloud.google.com/dialogflow/es/docs/quick/build-agent)
- You can customize you Agent's intents as you wish (a good start is to apply the default follow up intents)


### Creating your Service Account
- In the case of Dialogflow, when you integrate it with other services or use it programmatically, a service account is required to authenticate and authorize requests. 
- Create a Service Account via the Google Cloud console. Connect it to a google project (that you will now make for this chatbot project), and grant it the role `Dialogflow API Admin` so that it can query for dialog intent
- Once your Service Account is created:
    - add a new JSON key
    - download the JSON key file
    - run this command to set your Service Account credentials as environment variables  
    `export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/keyfile.json"`


### Stack Overflow posts that helped me :) 
- [Setup service account to authorize to Dialogflow](https://stackoverflow.com/questions/48875502/setup-service-account-to-authorize-to-dialogflow)