const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect("mongodb://192.168.3.30:27017/aircnc", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    
    connectUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectUsers = connectUsers;

    return next();
});

app.use(cors());
app.use(express.json()); // para o express entender os objetos JSON
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333, () => console.log('Server started in port 3333 🔥🚀'));