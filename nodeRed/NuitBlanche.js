[{"id":"6e2fe8bf.ab6018","type":"rpi-ws2801","z":"3674215b.99c906","numleds":"25","port":"/dev/spidev1.0","name":"","x":1061.9999694824219,"y":760.0000305175781,"wires":[]},{"id":"d35de02.467682","type":"inject","z":"3674215b.99c906","name":"","topic":"fill","payload":"[255, 0 ,0]","payloadType":"json","repeat":"","crontab":"","once":false,"x":131,"y":69,"wires":[[]]},{"id":"fadc375a.7a6d48","type":"inject","z":"3674215b.99c906","name":"","topic":"fill","payload":"[0, 0 ,0]","payloadType":"json","repeat":"","crontab":"","once":false,"x":136,"y":276,"wires":[[]]},{"id":"46e3bb2f.1e31a4","type":"inject","z":"3674215b.99c906","name":"","topic":"fill","payload":"[0,255,0]","payloadType":"json","repeat":"","crontab":"","once":false,"x":114,"y":139,"wires":[[]]},{"id":"1e952c4f.c1acb4","type":"inject","z":"3674215b.99c906","name":"","topic":"fill","payload":"[0, 0 ,255]","payloadType":"json","repeat":"","crontab":"","once":false,"x":129,"y":212,"wires":[[]]},{"id":"a309701e.47c3","type":"function","z":"3674215b.99c906","name":"","func":"var msg1 = {\"payload\": [255,255,0], \"topic\":\"fill\"}\nreturn msg1;","outputs":1,"noerr":0,"x":131,"y":411,"wires":[["15d47d2b.769f13"]]},{"id":"15d47d2b.769f13","type":"debug","z":"3674215b.99c906","name":"","active":true,"console":"false","complete":"true","x":358,"y":412,"wires":[]},{"id":"917671b2.f58d","type":"inject","z":"3674215b.99c906","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":146,"y":574.0000228881836,"wires":[["a309701e.47c3"]]},{"id":"e2fc8330.ce9d2","type":"exec","z":"3674215b.99c906","command":"sudo /home/pi/PiSheild/RPiCExamples/spi-read1","addpay":true,"append":"","useSpawn":"","timer":"","name":"","x":454.8333435058594,"y":889.1666870117188,"wires":[["6b8adb85.8aa5a4"],[],[]]},{"id":"f32fb74c.909d08","type":"debug","z":"3674215b.99c906","name":"","active":true,"console":"false","complete":"true","x":1032.8333435058594,"y":613.3334045410156,"wires":[]},{"id":"14ae4c1e.1b0344","type":"debug","z":"3674215b.99c906","name":"","active":true,"console":"false","complete":"false","x":1134.8333435058594,"y":853.3333740234375,"wires":[]},{"id":"2541f611.9778ba","type":"debug","z":"3674215b.99c906","name":"","active":true,"console":"false","complete":"false","x":959.8333435058594,"y":981.3333892822266,"wires":[]},{"id":"6b8adb85.8aa5a4","type":"function","z":"3674215b.99c906","name":"SensorReadingsToLight","func":"var MaxValue = 600;\nvar minValue =300;\n\nmsg.theNumber = (parseInt(msg.payload) -minValue) *(255)/ (MaxValue - minValue)\nif(msg.theNumber > 255){\n    msg.theNumber = 255;\n}else if (msg.theNumber < 0){\n    msg.theNumber = 0;\n}\nvar msg1 = {\"payload\": [msg.theNumber,0,0], \"topic\":\"fill\"}\nreturn msg1;","outputs":1,"noerr":0,"x":797.8333129882812,"y":791.3333892822266,"wires":[["6e2fe8bf.ab6018"]]},{"id":"38c8108b.ce889","type":"function","z":"3674215b.99c906","name":"LightShow","func":"//doSomeAsyncWork(msg, function(result) {\n //   node.send({payload:result});\n//});\n//return;\n\nnode.send({\"payload\": [255,0,0], \"topic\":\"fill\"});\n//sleep.sleep(1);\nnode.send({\"payload\": [255,255,0], \"topic\":\"fill\"});\nsleep(1)\nvar msg1 = {\"payload\": [0,255,0], \"topic\":\"fill\"}\nreturn msg1;","outputs":1,"noerr":0,"x":729.6666259765625,"y":458.3333435058594,"wires":[[]]},{"id":"e04d26cb.d7c1a8","type":"inject","z":"3674215b.99c906","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":419.8333435058594,"y":500.0000178019206,"wires":[["38c8108b.ce889"]]},{"id":"acf161ff.34a83","type":"inject","z":"3674215b.99c906","name":"","topic":"fill","payload":"[255, 0 ,0]","payloadType":"json","repeat":"","crontab":"","once":false,"x":533.6666259765625,"y":85.66666412353516,"wires":[["c23383f1.812a4"]]},{"id":"c23383f1.812a4","type":"delay","z":"3674215b.99c906","name":"","pauseType":"delay","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":756.8333435058594,"y":82.00000762939453,"wires":[[]]},{"id":"8c506511.a80b28","type":"inject","z":"3674215b.99c906","name":"","topic":"fill","payload":"[0,255,0]","payloadType":"json","repeat":"","crontab":"","once":false,"x":983.6666259765625,"y":65.66666412353516,"wires":[[]]},{"id":"1ae91f19.e37881","type":"switch","z":"3674215b.99c906","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":""}],"checkall":"true","outputs":1,"x":110.83332824707031,"y":884.3333307902019,"wires":[[]]},{"id":"e538b373.258c3","type":"inject","z":"3674215b.99c906","name":"","topic":"","payload":"","payloadType":"date","repeat":"1","crontab":"","once":false,"x":196.66665649414062,"y":1246,"wires":[[]]},{"id":"6bb834fd.e3601c","type":"debug","z":"3674215b.99c906","name":"","active":true,"console":"false","complete":"false","x":776.6666564941406,"y":1246,"wires":[]},{"id":"dd2ffa61.ccbf28","type":"switch","z":"3674215b.99c906","name":"timestampGate","property":"timestampGate","propertyType":"flow","rules":[{"t":"true"}],"checkall":"true","outputs":1,"x":486.6666564941406,"y":1246,"wires":[["e2fc8330.ce9d2"]]},{"id":"1eb862c5.cb8c1d","type":"change","z":"3674215b.99c906","name":"setGate","rules":[{"t":"set","p":"timestampGate","pt":"flow","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":346.6666564941406,"y":1386,"wires":[[]]},{"id":"54ba061a.dcb5f8","type":"inject","z":"3674215b.99c906","name":"","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":true,"x":176.66665649414062,"y":1346,"wires":[["1eb862c5.cb8c1d","dfceee38.474bc"]]},{"id":"26a7505c.05eba","type":"inject","z":"3674215b.99c906","name":"","topic":"","payload":"false","payloadType":"bool","repeat":"","crontab":"*/1 0-22 * * 3,4,5,6,0","once":false,"x":168.66665649414062,"y":1420,"wires":[["1eb862c5.cb8c1d","ffee7db6.87d71"]]},{"id":"db8c12d3.e689f","type":"inject","z":"3674215b.99c906","name":"","topic":"","payload":"","payloadType":"date","repeat":"1","crontab":"","once":false,"x":138.8333282470703,"y":1062.3334350585938,"wires":[[]]},{"id":"6736ed13.a9bf14","type":"inject","z":"3674215b.99c906","name":"StartChime","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"*/2 0-22 * * 3,4,5,6,0","once":false,"x":129.83334350585938,"y":1615,"wires":[["62792267.94779c","bfcf6cd7.784a8"]]},{"id":"711ba89.1487258","type":"exec","z":"3674215b.99c906","command":"python /home/pi/SymphonieLumineuse/SymphonieLumineuse/chime.py","addpay":true,"append":"","useSpawn":"","timer":"","name":"","x":770.8333435058594,"y":1475.1667048136392,"wires":[["8f6f6049.710d7"],[],[]]},{"id":"8f6f6049.710d7","type":"change","z":"3674215b.99c906","name":"","rules":[{"t":"set","p":"timestampGate","pt":"flow","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":1248.8333740234375,"y":1464.3333740234375,"wires":[[]]},{"id":"dfceee38.474bc","type":"function","z":"3674215b.99c906","name":"FasterInterval","func":"function sendMessage(){\n  node.send({\"payload\": \"send\"});\n}\n\nsetInterval(sendMessage, 100)\n\nreturn msg;","outputs":1,"noerr":0,"x":199.83334350585938,"y":1156.3333740234375,"wires":[["dd2ffa61.ccbf28"]]},{"id":"bb7ced24.81957","type":"inject","z":"3674215b.99c906","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":352.8333435058594,"y":1101.333351135254,"wires":[[]]},{"id":"62792267.94779c","type":"function","z":"3674215b.99c906","name":"GetTheHour","func":"var d = new Date();\nvar n = d.getHours();\nif(n > 12){\n    n = n-12;\n}\nvar msg = {\"payload\": n};\nreturn msg;","outputs":1,"noerr":0,"x":390,"y":1616,"wires":[["4576e9db.6749e8","8d3e91ab.a51"]]},{"id":"4576e9db.6749e8","type":"debug","z":"3674215b.99c906","name":"","active":true,"console":"false","complete":"payload","x":690,"y":1617,"wires":[]},{"id":"8d3e91ab.a51","type":"exec","z":"3674215b.99c906","command":"python /home/pi/SymphonieLumineuse/SymphonieLumineuse/playOnTheHour.py","addpay":true,"append":"","useSpawn":"","timer":"","name":"","x":814,"y":1718,"wires":[["365db3fc.32c9bc"],[],[]]},{"id":"bfcf6cd7.784a8","type":"change","z":"3674215b.99c906","name":"SetGate15Minutes","rules":[{"t":"set","p":"Gate15Minutes","pt":"flow","to":"false","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":342,"y":1714,"wires":[["7c5c8c70.528dc4"]]},{"id":"f6961e1b.ac03e","type":"debug","z":"3674215b.99c906","name":"","active":true,"console":"false","complete":"false","x":590,"y":1391,"wires":[]},{"id":"365db3fc.32c9bc","type":"change","z":"3674215b.99c906","name":"SetGate15Minutes","rules":[{"t":"set","p":"Gate15Minutes","pt":"flow","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":1296,"y":1735,"wires":[[]]},{"id":"b83e36d7.11c0a8","type":"switch","z":"3674215b.99c906","name":"Gate15Minutes","property":"Gate15Minutes","propertyType":"flow","rules":[{"t":"true"}],"checkall":"true","outputs":1,"x":312,"y":1520,"wires":[["f6961e1b.ac03e","711ba89.1487258"]]},{"id":"7c5c8c70.528dc4","type":"debug","z":"3674215b.99c906","name":"","active":true,"console":"false","complete":"false","x":466,"y":1798,"wires":[]},{"id":"ffee7db6.87d71","type":"delay","z":"3674215b.99c906","name":"","pauseType":"delay","timeout":"1","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":111,"y":1518,"wires":[["b83e36d7.11c0a8"]]}]