var pythonShell = require('python-shell');

var RGBLedBlink = (R,G,B)=>{
    
    var options = {
        scriptPath : "./python",
        args : [R,G,B]
    }
    pythonShell.run('close.py',options,function(err,results){

    });

}

var GPIOCleanUp = (C)=> {

    var options = {
        scriptPath : './python',
        args : [1,1,1,C]
    }
    pythonShell.run('close.py',options,function(err,results){

    });
}

module.exports = {
    RGBLedBlink,
    GPIOCleanUp
}


