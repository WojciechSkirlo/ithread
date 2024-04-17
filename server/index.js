const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const authRouter = require('./src/routes/Auth.routes');
const userRouter = require('./src/routes/User.routes');

const connectDB = require('./src/config/database');
connectDB();

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

router.use('/auth', authRouter);
router.use('/user', userRouter);

const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 4000;
const HOST_NAME = process.env.HOST_NAME;

const registerChatHandlers = require('./src/handlers/chat');

const onConnection = (socket) => {
  registerChatHandlers(io, socket);
};

io.on('connection', onConnection);
io.on('disconnect', () => {
  console.log('disconnect');
});

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server listening on http://${HOST_NAME}:${PORT}`);
});
