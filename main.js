const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 3000;

app.use(bodyParser.json());
let onlineUsers = 0;

// Serve static files (if you have any)
app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

// Track user origin
app.post('/api/track', (req, res) => {
    // console.log(`User from: ${req.body.origin}`);
    res.json({ message: 'Origin tracked. Happy track!!!' });
});

// Create an HTTP server
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    onlineUsers++;
    // console.log(`User connected. Online users: ${onlineUsers}`);

    // Notify all clients about the updated online user count
    broadcastOnlineCount();

    ws.on('close', () => {
        onlineUsers--;
        // console.log(`User disconnected. Online users: ${onlineUsers}`);
        broadcastOnlineCount();
    });
});

// Function to broadcast online user count to all clients
function broadcastOnlineCount() {
    const data = JSON.stringify({ online_users: onlineUsers });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}
