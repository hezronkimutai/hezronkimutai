const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.md': 'text/markdown',
};

const server = http.createServer(async (req, res) => {
    try {
        // Get the file path from the URL
        const filePath = req.url === '/' 
            ? path.join(__dirname, 'index.html')
            : path.join(__dirname, req.url);

        // Get the file extension
        const ext = path.extname(filePath);

        // Try to read the file
        const content = await fs.readFile(filePath);

        // Set the content type
        res.setHeader('Content-Type', MIME_TYPES[ext] || 'text/plain');
        res.writeHead(200);
        res.end(content);
    } catch (err) {
        // If file not found or other error
        res.writeHead(500);
        res.end(`Error: ${err.message}`);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop');
});