# AI-Speech-ChatBot
🤖 AI voice chat interface in the browser. This app will listen to the user's voice and reply with a synthetic voice.

### Main Parts of this AI-Speech-ChatBot
1. Utilize Web Speech API's `SpeechRecognition` interface to listen to the user's voice
2. Send user's voice message to natural-language-processing API as a string
3. API.AI will return an AI response using the `SpeechSynthesis` interface to generate a synthetic voice

### Steps for Project setup
- Created file structure:  

- Ran `npm init -f`
    - `-f` accepts the fault settings. `package.json` file is generated with basic app info
- Run `npm install express socket.io apiai --save`
    - w/ the `--save` flag, package.json will automatically be updated with installed dependencies