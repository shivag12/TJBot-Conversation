#defining the RPi's pins as Input / Output
import RPi.GPIO as GPIO

#importing the library for delaying command.
import time
import sys

#used for GPIO numbering
GPIO.setmode(GPIO.BCM) 

#closing the warnings when you are compiling the code
GPIO.setwarnings(False)

RUNNING = True

#defining the pins
green = 20
red = 21
blue = 22

#defining the pins as output
GPIO.setup(red, GPIO.OUT) 
GPIO.setup(green, GPIO.OUT)
GPIO.setup(blue, GPIO.OUT)

#choosing a frequency for pwm
Freq = 2000

#defining the pins that are going to be used with PWM
RED = GPIO.PWM(red, Freq)  
GREEN = GPIO.PWM(green, Freq)
BLUE = GPIO.PWM(blue, Freq)

RED.start(0)
GREEN.start(100)
BLUE.start(100)

colors = [0,100,100];

for x in range(0,3):
    if(x == 0):
        RED.start(0)
        GREEN.start(100)
        BLUE.start(100)
        time.sleep(3)
    elif(x == 1):
        RED.start(100)
        GREEN.start(0)
        BLUE.start(100)
        time.sleep(3)
    elif(x == 2):
        RED.start(100)
        GREEN.start(100)
        BLUE.start(0)
        time.sleep(3)
        
GPIO.cleanup();

