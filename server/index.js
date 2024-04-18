const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
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

io.engine.use((req, _, next) => {
  const isHandshake = req._query.sid === undefined;

  if (!isHandshake) return next();

  const header = req.headers['authorization'];

  if (!header) {
    return next(new Error('Authentication error'));
  }

  const token = header.split(' ')[1];

  console.log('token', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error('invalid token'));
    }
    req.user = decoded.data;
    next();
  });
});

const onConnection = (socket) => {
  registerChatHandlers(io, socket);
};

io.on('connection', onConnection);
io.on('disconnect', () => console.log('disconnect'));

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
