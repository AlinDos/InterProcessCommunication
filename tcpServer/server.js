var api = {};
global.api = api;
// Connect an asynchronous network wrapper
api.net = require('net');

// Numbers to process
var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
// Our result
var results = [];

// Create server listening 2000 port
var server = api.net.createServer((socket) => {
  
  // Print address client connected on
  console.log('Connected: ' + socket.localAddress);
  
  // Send our task formatted to JSON to client 
  socket.write(JSON.stringify(task));
  
  // Listen to data from client
  socket.on('data', (data) => {
    // Turn JSON text into JS-object
    results = JSON.parse(data);
    // Print our results
    console.log('Data received (by server): ' + results);
  });
  
  // Listen to FIN packet from client
  socket.on('end', () => {
    console.log('Connection ended');
  });
  
}).listen(2000);
