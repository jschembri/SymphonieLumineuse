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
   if os.path.isfile(file):
      pygame.init()
      pygame.mixer.init()
      pygame.mixer.music.load(file)
      pygame.mixer.music.play()
      while pygame.mixer.music.get_busy():
         pygame.time.Clock().tick(10)

if  __name__ =='__main__':
      try:  
        foo()
      except KeyboardInterrupt:
        sys.exit(0)
