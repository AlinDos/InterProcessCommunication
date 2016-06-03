var api = {};
global.api = api;
// Connect an asynchronous network wrapper
api.net = require('net');

// Numbers to process
var task = [7, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
// Our result
var results = [];

// Clients
var clients = [];

// Create server listening 2000 port
var server = api.net.createServer((socket) => {
  
  // Add new connected socket
  clients.push(socket);
  
  // Print number of connected clients
  console.log('Clients: ' + clients.length);
  
  // Clear results
  results = [];
  
  // Divide task into smaller one for every client
  var length = task.length/clients.length;
  clients.forEach((socket, i) => {
    
    // Send divided task formatted to JSON to client 
    socket.write(JSON.stringify(
      { id: i,
        data: task.slice(length*i, length*(i+1))}
    ));
  });
  
  // Listen to data from client
  socket.on('data', (data) => {
    // Turn JSON text into JS-object 
    var result = JSON.parse(data)
    // Add result to general results
    results[result.id] = result.data;
    
    // Print result from client
    console.log('Data received (by server from ' + result.id + '): ' + result.data);
    // Print our results
    if (results.length == clients.length) {
      console.log('Results: ' + results);
    }
  });
  
}).listen(2000);
