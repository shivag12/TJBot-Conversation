var config = require("./config.json");
var TJBot = require('tjbot');
var http = require("http");
var led = require("./LED/blinkLed.js");

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
        gender : "female",
        name : "watson"
    },
    log : {
        level : "verbose"
    }
}

// Initializing the TJBot instance
var tj = new TJBot(hardware,configuration,credentials);


//Listening (Speak to Text Watson Service)
tj.listen(function(msg){

    if(msg.startsWith("Watson")){
        led.RGBLedBlink(100,1,100);
        var rawdata = "";
        var msg_stt = msg.toLowerCase().replace("Watson","");
        console.log(msg_stt);

        conversationmessage(msg_stt);

        // http.get(config.CloudantNosql.url,function(res){
        //     res.on("data",function(chunk){
        //         rawdata += chunk;
        //     })
        //     res.on("end",function(){
        //         var jsonrawdata = JSON.parse(rawdata);
        //         conversationmessage(msg_stt,jsonrawdata);
        //     })
        // })            
    }
})

//Getting the location state of the chemical from the cloudant_DB
function chemical_location(rawdata,chemical_name){
   var chemical_loc = "";   
   var tempDate = "2017-05-26 15:47:03.754Z";

   if(chemical_name !== null){  

        for(var i=0; i< rawdata.rows.length; i++){
            //chemical_loc = rawdata.rows[i].value[1];            
            if(Date.parse(rawdata.rows[i].value[0]) > Date.parse(tempDate)){
                chemical_loc = rawdata.rows[i].value[1];
                tempDate = rawdata.rows[i].value[0];               
            }
        }        
   }
    return chemical_loc;
}

//Parsing the conversation response to get the entity.
function parsing_conv_respone(convrespose){
    var entity_chemical_name = "";
    if(convrespose.entities.length !== 0){
        for(var i=0;i<convrespose.entities.length;i++){
            entity_chemical_name = convrespose.entities[i].value;
            //console.log(convrespose.entities[i].value);
        }        
    } else {
        entity_chemical_name = null;
        //console.log("Entities are empty");
    }    
    return entity_chemical_name;
}

function cloudantGetRequest(responseentity,callback){
    
    var urlParsing = config.CloudantNosql.url;
    urlParsing = urlParsing.concat("\""+responseentity+"\"");
    //console.log(urlParsing);    
    var rawdata = "";
    var jsonrawdata = "";

    http.get(urlParsing,function(resdata){
        resdata.on("data",function(chunk){
            rawdata += chunk;
        })        
        resdata.on("end",function(){                 
                jsonrawdata = JSON.parse(rawdata);
                callback(jsonrawdata);                 
            })
        })
      
}

//Conversation service and Text to Speech.
function conversationmessage(message_stt){

      //Configuring the Context variable of Watson Conversation
        var turn = {
            input : {
                text : message_stt
            },
            workspace_id : config.watson_conversation.workspace_id,
            context : {
                location : "#location#"
            }
        }
        
        //Starting the Watson Conversation
        tj._conversation.message(turn,function(err,response){
            if(err){
                console.log(err);
            } else {                
                context = response.context; 
                console.log(response);
                var response_parsing = response.output.text[0];
                var response_entity = parsing_conv_respone(response);
                console.log(response_entity);

                cloudantGetRequest(response_entity,function(rawdata){
                    var current_chemical_loc = chemical_location(rawdata,response_entity); 
                    console.log(current_chemical_loc);
                    response_parsing = response_parsing.replace("#location#", current_chemical_loc);
                    console.log(response_parsing);
                    tj.speak(response_parsing);
                })

                
            }
        }) 
        
        process.on("SIGINT",()=>{
            process.nextTick(function() {
                process.exit(0);
            });   
            led.GPIOCleanUp(0);
        })

}