[{"id":"9e7bf69a.c66f68","type":"exec","z":"233b69e5.f81946","command":"sudo /home/pi/SymphonieLumineuse/SymphonieLumineuse/readingSPI/spi-read1","addpay":true,"append":"","useSpawn":"","timer":"","name":"","x":941.833251953125,"y":27.5,"wires":[[],[],[]]},{"id":"52351a1.0bcf7e4","type":"function","z":"233b69e5.f81946","name":"SensorReadingsToLight","func":"var MaxValue = 600;\nvar minValue =300;\n\nmsg.theNumber = (parseInt(msg.payload) -minValue) *(255)/ (MaxValue - minValue)\nif(msg.theNumber > 255){\n    msg.theNumber = 255;\n}else if (msg.theNumber < 0){\n    msg.theNumber = 0;\n}\nvar msg1 = {\"payload\": [msg.theNumber,0,0], \"topic\":\"fill\"}\nreturn msg1;","outputs":1,"noerr":0,"x":1412.8333740234375,"y":89.99996948242188,"wires":[["4fe9c18e.0c7ff"]]},{"id":"32210c5a.72ae64","type":"switch","z":"233b69e5.f81946","name":"timestampGate","property":"timestampGate","propertyType":"flow","rules":[{"t":"true"}],"checkall":"true","outputs":1,"x":587.6666259765625,"y":70.6666488647461,"wires":[["e0b3b1dc.ba97d","8797207.983b2e"]]},{"id":"b40920e8.59d1a","type":"change","z":"233b69e5.f81946","name":"setGate","rules":[{"t":"set","p":"timestampGate","pt":"flow","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":255.66665649414062,"y":146.99991607666016,"wires":[[]]},{"id":"466ada74.bc84d4","type":"inject","z":"233b69e5.f81946","name":"","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":true,"x":93.66665649414062,"y":113.66665649414062,"wires":[["b40920e8.59d1a"]]},{"id":"e5d0cc6c.aaabb","type":"inject","z":"233b69e5.f81946","name":"","topic":"","payload":"false","payloadType":"bool","repeat":"","crontab":"*/15 0-23 * * *","once":false,"x":92,"y":197.66665649414062,"wires":[["b40920e8.59d1a","2a2d633.ff4c89c"]]},{"id":"524eb332.490dac","type":"inject","z":"233b69e5.f81946","name":"StartChime","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"0 0-23 * * *","once":false,"x":253.83328247070312,"y":403.66667461395264,"wires":[["41d4e9ba.a18238","be8c2d27.f8cf3"]]},{"id":"dbf338e0.033888","type":"exec","z":"233b69e5.f81946","command":"python ~/SymphonieLumineuse/SymphonieLumineuse/SymphonieLumineuse/lightshow.py","addpay":true,"append":"","useSpawn":"","timer":"","name":"","x":954.8332824707031,"y":263.8333794275918,"wires":[["d6173462.0817b8"],["7f2c853c.1a37ec"],["83163fd8.073b7"]]},{"id":"d6173462.0817b8","type":"change","z":"233b69e5.f81946","name":"","rules":[{"t":"set","p":"timestampGate","pt":"flow","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":1608.8333129882812,"y":363.9999542236328,"wires":[[]]},{"id":"dd945f5.1cd2ba","type":"function","z":"233b69e5.f81946","name":"FasterInterval","func":"function sendMessage(){\n  node.send({\"payload\": \"send\"});\n}\n\nsetInterval(sendMessage, 1000)\n\nreturn msg;","outputs":1,"noerr":0,"x":166.83334350585938,"y":20,"wires":[[]]},{"id":"41d4e9ba.a18238","type":"function","z":"233b69e5.f81946","name":"GetTheHour","func":"var d = new Date();\nvar n = d.getHours();\nif(n > 12){\n    n = n-12;\n}\nif(n < 1){\n    n = 1;\n}\nvar msg = {\"payload\": n};\nreturn msg;","outputs":1,"noerr":0,"x":513.9999389648438,"y":404.66667461395264,"wires":[["4a5419db.4c0968","9374952b.370738"]]},{"id":"4a5419db.4c0968","type":"debug","z":"233b69e5.f81946","name":"","active":true,"console":"false","complete":"payload","x":813.9999389648438,"y":405.66667461395264,"wires":[]},{"id":"9374952b.370738","type":"exec","z":"233b69e5.f81946","command":"python /home/pi/SymphonieLumineuse/SymphonieLumineuse/SymphonieLumineuse/playOnTheHour.py","addpay":true,"append":"","useSpawn":"","timer":"","name":"","x":1017.9999389648438,"y":506.66667461395264,"wires":[["7e4c6973.583818","f0c105fb.febe38"],["354d7bab.be4894"],["d8cf9e97.ec277"]]},{"id":"be8c2d27.f8cf3","type":"change","z":"233b69e5.f81946","name":"SetGate15Minutes","rules":[{"t":"set","p":"Gate15Minutes","pt":"flow","to":"false","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":465.99993896484375,"y":502.66667461395264,"wires":[["c9dceb45.5426a8"]]},{"id":"95ecfd31.e6309","type":"debug","z":"233b69e5.f81946","name":"","active":true,"console":"false","complete":"false","x":713.9999389648438,"y":179.66667461395264,"wires":[]},{"id":"7e4c6973.583818","type":"change","z":"233b69e5.f81946","name":"SetGate15Minutes","rules":[{"t":"set","p":"Gate15Minutes","pt":"flow","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":1578,"y":496.6666259765625,"wires":[[]]},{"id":"20e48fb3.15379","type":"switch","z":"233b69e5.f81946","name":"Gate15Minutes","property":"Gate15Minutes","propertyType":"flow","rules":[{"t":"true"}],"checkall":"true","outputs":1,"x":435.99993896484375,"y":308.66667461395264,"wires":[["95ecfd31.e6309","dbf338e0.033888"]]},{"id":"c9dceb45.5426a8","type":"debug","z":"233b69e5.f81946","name":"","active":true,"console":"false","complete":"false","x":589.9999389648438,"y":586.6666746139526,"wires":[]},{"id":"2a2d633.ff4c89c","type":"delay","z":"233b69e5.f81946","name":"","pauseType":"delay","timeout":"1","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":234.99993896484375,"y":306.66667461395264,"wires":[["20e48fb3.15379"]]},{"id":"8797207.983b2e","type":"debug","z":"233b69e5.f81946","name":"","active":false,"console":"false","complete":"false","x":1661.7292404174805,"y":186.31946563720703,"wires":[]},{"id":"4fe9c18e.0c7ff","type":"rpi-ws2801","z":"233b69e5.f81946","numleds":"25","port":"/dev/spidev1.0","name":"","x":1757,"y":114,"wires":[]},{"id":"6b96f3c0.416f0c","type":"function","z":"233b69e5.f81946","name":"","func":"\nreturn msg;","outputs":1,"noerr":0,"x":82,"y":514,"wires":[[]]},{"id":"56894e64.98883","type":"mcp3008","z":"233b69e5.f81946","name":"RPiSheild","device":"/dev/spidev0.0","mode":"0x80","interval":"20","x":329.5,"y":54,"wires":[["32210c5a.72ae64"]]},{"id":"bb6317a.80b9fe8","type":"debug","z":"233b69e5.f81946","name":"","active":true,"console":"false","complete":"false","x":1609.9999694824219,"y":265.00000762939453,"wires":[]},{"id":"5f7636a.0e78ec8","type":"inject","z":"233b69e5.f81946","name":"","topic":"","payload":"start","payloadType":"str","repeat":"","crontab":"","once":true,"x":94,"y":59,"wires":[["56894e64.98883"]]},{"id":"e0b3b1dc.ba97d","type":"smooth","z":"233b69e5.f81946","name":"","action":"mean","count":"10","round":"","x":1115,"y":89,"wires":[["52351a1.0bcf7e4"]]},{"id":"f0c105fb.febe38","type":"change","z":"233b69e5.f81946","name":"","rules":[{"t":"set","p":"timestampGate","pt":"flow","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":1600.9999771118164,"y":574.9999771118164,"wires":[[]]},{"id":"354d7bab.be4894","type":"debug","z":"233b69e5.f81946","name":"","active":true,"console":"false","complete":"false","x":1510.9901396436608,"y":690.2357406616211,"wires":[]},{"id":"d8cf9e97.ec277","type":"debug","z":"233b69e5.f81946","name":"","active":true,"console":"false","complete":"false","x":1460.9949003858483,"y":763.2462387084961,"wires":[]},{"id":"7f2c853c.1a37ec","type":"debug","z":"233b69e5.f81946","name":"","active":true,"console":"false","complete":"false","x":1375.2685317993164,"y":382.5407485961914,"wires":[]},{"id":"83163fd8.073b7","type":"debug","z":"233b69e5.f81946","name":"","active":true,"console":"false","complete":"false","x":1386.2685546875,"y":438.5407409667969,"wires":[]}]
