#!/usr/bin/env python
#
# Title:      WS2801 SPI control class for Raspberry Pi
# Author:     AndyPi (http://andypi.co.uk/)
# Based on:   Adafruit https://raw.githubusercontent.com/adafruit/Adafruit-Raspberry-Pi-Python-Code/master/Adafruit_LEDpixels/Adafruit_LEDpixels.py
#
# Hardware: WS2801 pixels, CLOCK=RPi23; Data=RPi19, GND=RpiGND, +5v=Rpi+5v

import RPi.GPIO as GPIO, time, os, sys
import pygame, threading
import time
from random import randint

def foo():
   file = '/home/pi/Downloads/japan.wav'
   pygame.init()
   pygame.mixer.init()
   pygame.mixer.music.load(file)
   pygame.mixer.music.play()
   while pygame.mixer.music.get_busy():
      pygame.time.Clock().tick(10)


class AndyPiPixelLights:

 # import RPi.GPIO as GPIO, time, os
 NUMBER_OF_PIXELS=25 # set number of pixels in your strip
 DEBUG = 1
 GPIO.setmode(GPIO.BCM)

 def slowspiwrite(self, clockpin, datapin, byteout):
	GPIO.setup(clockpin, GPIO.OUT)
	GPIO.setup(datapin, GPIO.OUT)
	for i in range(8):
		if (byteout & 0x80):
			GPIO.output(datapin, True)
		else:
			GPIO.output(clockpin, False)
		byteout <<= 1
		GPIO.output(clockpin, True)
		GPIO.output(clockpin, False)

#CLK  = 21 #40
#MISO =  19 #35
#MOSI = 20 #38
#CS   = 16 #36

 SPICLK = 40 # The SPI clock pin on the raspberry pi, pin 23
 SPIDO = 38 # The SPI data line (MOSI) on the raspberry pi, pin 19
 ledpixels = [0] * NUMBER_OF_PIXELS

 def writestrip(self, pixels):
	spidev = file("/dev/spidev1.0", "w")
	for i in range(len(pixels)):
		spidev.write(chr((pixels[i]>>16) & 0xFF))
		spidev.write(chr((pixels[i]>>8) & 0xFF))
		spidev.write(chr(pixels[i] & 0xFF))
	spidev.close()

 def Color(self, r, g, b):
	return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF)

 def setpixelcolor(self, pixels, n, r, g, b):
        if (n >= len(pixels)):
                return
        pixels[n] = self.Color(r,g,b)

 def setpixelcolor(self, pixels, n, c):
        if (n >= len(pixels)):
                return
        pixels[n] = c

 def colorwipe(self, pixels, c, delay):
        for i in range(len(pixels)):
                self.setpixelcolor(pixels, i, c)
                self.writestrip(pixels)
                time.sleep(delay)


 def Wheel(self, WheelPos):
        if (WheelPos < 85):
                return self.Color(WheelPos * 3, 255 - WheelPos * 3, 0)
        elif (WheelPos < 170):
                WheelPos -= 85;
                return self.Color(255 - WheelPos * 3, 0, WheelPos * 3)
        else:
                WheelPos -= 170;
                return self.Color(0, WheelPos * 3, 255 - WheelPos * 3)


 def rainbowRoad(self, pixels, wait, theR, theG, theB):
	for j in range(256): # one cycle of all 256 colors in the wheel
    	   for i in range(len(pixels)):
                self.setpixelcolor(pixels, i, self.Color(j*theR,j*theG,j*theB) )
	   self.writestrip(pixels)
           print j
	   time.sleep(wait)
	for j in range(255,-1,-1): # one cycle of all 256 colors in the wheel
    	   for i in range(len(pixels)):
                self.setpixelcolor(pixels, i, self.Color(j*theR,j*theG,j*theB ))
	   self.writestrip(pixels)
           print j
	   time.sleep(wait)
 
 def cls(self, pixels):
          for i in range(len(pixels)):
                self.setpixelcolor(pixels, i, self.Color(0,0,0))
                self.writestrip(pixels)


 def main(self):
   theR = randint(0,1)
   theG = randint(0,1)
   theB = randint(0,1)
   if theR + theG + theB == 0:
      theR = 1
   theHour = int( sys.argv[1] )
   for m in range(theHour):
      try:  
        thr = threading.Thread(target=foo, args=(), kwargs={})
        thr.start()
        time.sleep(0.5)
        self.rainbowRoad(self.ledpixels, 0.002, theR, theG, theB)
        self.cls(self.ledpixels)
   
      except KeyboardInterrupt:
        self.cls(self.ledpixels)
        sys.exit(0)



if  __name__ =='__main__':
        LEDs=AndyPiPixelLights()
        LEDs.main()
