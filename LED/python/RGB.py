#defining the RPi's pins as Input / Output
import RPi.GPIO as GPIO

#importing the library for delaying command.
import time
import sys

GPIO.cleanup()

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
Freq = 100

#defining the pins that are going to be used with PWM
RED = GPIO.PWM(red, Freq)  
GREEN = GPIO.PWM(green, Freq)
BLUE = GPIO.PWM(blue, Freq)

RED.start(int(sys.argv[1]))
GREEN.start(int(sys.argv[2]))
BLUE.start(int(sys.argv[3]))

if(int(sys.argv[4]) == 0):
    RED.stop()
    GREEN.stop()
    BLUE.stop()
    GPIO.cleanup()

