// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, Node.js!');
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Node.js Server!');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
