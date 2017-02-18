
#include <stdio.h>
#include <wiringPi.h>
#include <mcp3004.h>

#define BASE 100 //mcp3004/8
#define SPI_CH 0

int main(int argc, char *argv[])
{
   int dev;
   if (wiringPiSetup() == -1) {
      printf("wiringPi init failed\n");
      return -1;
   }

   mcp3004Setup(BASE,SPI_CH);

      int i;
      i = 0;

          int sval = analogRead(BASE + i);
          printf("%3i", sval);
   return 0;
}
