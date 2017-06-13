var config = require("./config.json");
var TJBot = require('tjbot');

//Watson API credentials
var credentials = {
    speech_to_text : {
        username : config.speech_to_text.username,
        password : config.speech_to_text.password
    },
    conversation : {
        username : config.watson_conversation.username,
        password : config.watson_conversation.password
    },
    text_to_speech : {
        username : config.text_to_speech.username,
        password : config.text_to_speech.password
    }
}

//Specifying the hardware used
var hardware = ["microphone","speaker"];

// Setting up the default configuration 
var configuration = {
    robot : {
        gender : "male",
        name : "watson"
    },
    log : {
        level : "verbose"
    }
}

var tj = new TJBot(hardware,configuration,credentials);

tj.listen(function(msg){
    if(msg.startswith("watson")){

        var msg_stt = msg.toLowerCase().replace("watson","");
        console.log(msg_stt);

        var turn = {
            input : {
                text : msg_stt
            },
            workspace_id : config.watson_conversation.workspace_id,
            context : {
                location : "#location#"
            }
        }

        tj._conversation.message(turn,function(err,response){
            if(err){
                console.log(err);
            } else {
                console.log(response);
            }
        })        
    }
})