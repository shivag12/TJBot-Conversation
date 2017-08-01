var led = require("./LED/blinkLed.js");

console.log("RGB LED : ");
led.RGBLedBlink(100,1,100);

setTimeout(()=>{
    led.GPIOCleanUp(0);
},5000);
