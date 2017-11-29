var config = require("./config.json");
var TJBot = require('tjbot');

//Watson API credentials
var credentials = {
    speech_to_text: {
        username: "No UserName",
        password: "No Password"
    },
    conversation: {
        username: config.watson_conversation.username,
        password: config.watson_conversation.password
    },
    text_to_speech: {
        username: config.text_to_speech.username,
        password: config.text_to_speech.password
    }
}

//Specifying the hardware used
var hardware = ["microphone", "speaker"];

// Setting up the default configuration 
var configuration = {
    robot: {
        gender: "female",
        name: "watson"
    },
    log: {
        level: "verbose"
    },
    listen: {
        microphoneDeviceId: 'plughw:CARD=Device,DEV=0'
    }
}

// Initializing the TJBot instance
var tj = new TJBot(hardware, configuration, credentials);

//Listening (Speak to Text Watson Service)
tj.listen(function (data) {
    if (data.results.length === 0) {
        console.log('Error : Audio data is being streamed too fast..!!');
    } else {
        var msg = data.results[0].alternatives[0].transcript;

        if (msg.startsWith("Watson") || msg.startsWith(" Watson") || msg.startsWith(" watson")) {
            var msg_stt = msg.toLowerCase().replace("Watson", "");
            console.log(msg_stt);
            conversationmessage(msg_stt);
        }
    }
})

//Conversation service and Text to Speech.
function conversationmessage(message_stt) {

    //Configuring the Context variable of Watson Conversation
    var turn = {
        input: {
            text: message_stt
        },
        workspace_id: config.watson_conversation.workspace_id,
        context: {
            location: "#location#"
        }
    }

    //Starting the Watson Conversation
    tj._conversation.message(turn, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            context = response.context;
            console.log(response);

            tj.speak(response_parsing);
        }
    })    
}

process.on("SIGINT", () => {
    process.nextTick(function () {
        process.exit(0);
    });
})
