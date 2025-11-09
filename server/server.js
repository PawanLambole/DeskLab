const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const rooms = new Map();

io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  socket.on('join-room', ({ roomId, role }) => {
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, { host: null, viewers: [] });
    }

    const room = rooms.get(roomId);

    if (role === 'host') {
      room.host = socket.id;
      console.log(`🎬 Host joined room: ${roomId}`);

      socket.to(roomId).emit('host-joined');
    } else {
      room.viewers.push(socket.id);
      console.log(`👀 Viewer joined room: ${roomId}`);

      socket.to(roomId).emit('viewer-joined', { viewerId: socket.id });
    }

    console.log(`📊 Room ${roomId} - Host: ${room.host}, Viewers: ${room.viewers.length}`);
  });

  socket.on('signal', ({ roomId, signal, to }) => {
    if (to) {
      io.to(to).emit('signal', { signal, from: socket.id });
    } else {
      socket.to(roomId).emit('signal', { signal, from: socket.id });
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);

    rooms.forEach((room, roomId) => {
      if (room.host === socket.id) {
        io.to(roomId).emit('host-disconnected');
        rooms.delete(roomId);
        console.log(`🗑️  Room ${roomId} deleted (host left)`);
      } else {
        const viewerIndex = room.viewers.indexOf(socket.id);
        if (viewerIndex > -1) {
          room.viewers.splice(viewerIndex, 1);
          io.to(roomId).emit('viewer-disconnected', { viewerId: socket.id });
        }
      }
    });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   ⚡ BoltDesk Signalling Server       ║
║   Running on http://localhost:${PORT}   ║
╚════════════════════════════════════════╝
  `);
});
