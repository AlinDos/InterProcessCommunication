var api = {};
global.api = api;
// Connect an asynchronous network wrapper
api.net = require('net');

// Create socket
var socket = new api.net.Socket();

// Connect our socket to 2000 port on local host
socket.connect( {
  port: 2000, 
  host: '127.0.0.1',
}, function() {
  // Listen to data from server
  socket.on('data', (data) => {
    
    // Turn JSON text into JS-object
    task = JSON.parse(data);
    
    // Print our task
    console.log('Data received (by client): ' + task);
    
    // Do some calculations
    results = task.map((num) => {return num*2});
    
    // Send our results formatted to JSON to server
    socket.write(JSON.stringify(results));
    
    // Close socket
    socket.end();
  });
});
