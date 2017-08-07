var pythonShell = require('python-shell');

var RGBLedBlink = (R,G,B)=>{
    
    var options = {
        scriptPath : `${__dirname}/python`,
        args : [R,G,B,1]
    }
    pythonShell.run('RGB.py',options,function(err,results){

    });

}

var GPIOCleanUp = (C)=> {

    var options = {
        scriptPath : `${__dirname}/python`,
        args : [1,1,1,C]
    }
    pythonShell.run('RGB.py',options,function(err,results){

    });
}

module.exports = {
    RGBLedBlink,
    GPIOCleanUp
}


