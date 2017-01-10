# Simple example of reading the MCP3008 analog input channels and printing
# them all out.
# Author: Tony DiCola
# License: Public Domain
import time

# Import SPI library (for hardware SPI) and MCP3008 library.
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008
import RPi.GPIO as GPIOLow, time, os, sys


# Software SPI configuration:
CLK  = 21 #40
MISO =  19 #35
MOSI = 20 #38
CS   = 16 #36
mcp = Adafruit_MCP3008.MCP3008(clk=CLK, cs=CS, miso=MISO, mosi=MOSI)

#CLK  = 11
#MISO = 9
#MOSI = 10
#CS   = 8 

# Hardware SPI configuration:
#SPI_PORT   = 0
#SPI_DEVICE = 1
#mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))

class AndyPiPixelLights:

 # import RPi.GPIOLow as GPIOLow, time, os
 NUMBER_OF_PIXELS=25 # set number of pixels in your strip
 DEBUG = 1
 GPIOLow.setmode(GPIOLow.BCM)

 def slowspiwrite(self, clockpin, datapin, byteout):
	GPIOLow.setup(clockpin, GPIOLow.OUT)
	GPIOLow.setup(datapin, GPIOLow.OUT)
	for i in range(8):
		if (byteout & 0x80):
			GPIOLow.output(datapin, True)
		else:
			GPIOLow.output(clockpin, False)
		byteout <<= 1
		GPIOLow.output(clockpin, True)
		GPIOLow.output(clockpin, False)


 SPICLK = 23 # The SPI clock pin on the raspberry pi, pin 23
 SPIDO = 19 # The SPI data line (MOSI) on the raspberry pi, pin 19
 ledpixels = [0] * NUMBER_OF_PIXELS

 def writestrip(self, pixels):
	spidev = file("/dev/spidev0.0", "w")
	for i in range(len(pixels)):
		spidev.write(chr((pixels[i]>>16) & 0xFF))
		spidev.write(chr((pixels[i]>>8) & 0xFF))
		spidev.write(chr(pixels[i] & 0xFF))
	spidev.close()
	time.sleep(0.002)

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

 def rainbowCycle(self, pixels, wait):
	for j in range(256): # one cycle of all 256 colors in the wheel
    	   for i in range(len(pixels)):
 # tricky math! we use each pixel as a fraction of the full 96-color wheel
 # (thats the i / strip.numPixels() part)
 # Then add in j which makes the colors go around per pixel
 # the % 96 is to make the wheel cycle around
      		self.setpixelcolor(pixels, i, self.Wheel( ((i * 256 / len(pixels)) + j) % 256) )
	   self.writestrip(pixels)
	   time.sleep(wait)
 def rainbowRoad(self, pixels, theColorJ):
        for i in range(len(pixels)):
           self.setpixelcolor(pixels, i, self.Wheel(theColorJ))
        self.writestrip(pixels)


 
 def cls(self, pixels):
          for i in range(len(pixels)):
                self.setpixelcolor(pixels, i, self.Color(0,0,0))
                self.writestrip(pixels)

print('Reading MCP3008 values, press Ctrl-C to quit...')
## Print nice channel column headers.
print('| {0:>4} | {1:>4} | {2:>4} | {3:>4} | {4:>4} | {5:>4} | {6:>4} | {7:>4} |'.format(*range(8)))
print('-' * 57)
# Main program loop.
while True:
    # Read all the ADC channel values in a list.
    values = [0]*8
    for i in range(8):
        # The read_adc function will get the value of the specified channel (0-7).
        values[i] = mcp.read_adc(i)
    # Print the ADC values.
    print('| {0:>4} | {1:>4} | {2:>4} | {3:>4} | {4:>4} | {5:>4} | {6:>4} | {7:>4} |'.format(*values))
    # Pause for half a second.
    LEDS = AndyPiPixelLights()	
#    LEDS.colorwipe(LEDS.ledpixels, LEDS.Color(255, 0, 0), 0.00)
    theValue = values[0]
    if theValue < 200:
       theValue = 200
    if theValue >600:
       theValue = 600

    theColorWheel = int( (theValue-200.0)*(255./400.))
    print theColorWheel 
    LEDS.rainbowRoad(LEDS.ledpixels, theColorWheel)
    #LEDS.cls(LEDS.ledpixels)
    time.sleep(0.5)
