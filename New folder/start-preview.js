const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/' || req.url === '/simple-working-preview.html') {
        fs.readFile(path.join(__dirname, 'simple-working-preview.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading preview');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log('🚀 CloudHop Preview Server Running!');
    console.log(`📄 Open your browser and go to: http://localhost:${PORT}`);
    console.log(`🌐 Or click: http://localhost:${PORT}/simple-working-preview.html`);
    console.log('⏹️  Press Ctrl+C to stop the server');
});
