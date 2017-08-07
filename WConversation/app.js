const Yargs = require("yargs");
const Conversationv1 = require("watson-developer-cloud/conversation/v1");

var yargs = Yargs.options("Input_Text",{
    describe:"Input text field ",
    demand : true,
    alias:"i"    
}).options("Location",{
    describe:"Location value",
    demand : true,
    alias : 'l'
}).help().argv;

var conversation = new Conversationv1({
    username : "f8857516-fd05-41c4-bb64-9ba292ec20b1",
    password : "HswsFyj3eKxl",
    version_date : Conversationv1.VERSION_DATE_2017_05_26
});

conversation.message({
    input : {
        text : yargs.i
    },
    workspace_id : "6d075aa3-88f8-412b-a50a-1f14100a69fb",
    context : {
        location : '#location#'
    }
},(err,res)=>{
    if(err){
        console.error(err);
    } else {
        //console.log(res.output.text[0]);
        //parseResponse(res.output.text[0],"Out of Shelf");
        parseResponse(res.output.text[0],yargs.l);
    }
})

var parseResponse = (response,replaceValue) => {
    if(replaceValue === "Out of Shelf") {
        response = response.replace("#location#",replaceValue);
        console.log(response.replace("located in",""));
    } else {
        console.log(response.replace('#location#',replaceValue));
    }
    
}
