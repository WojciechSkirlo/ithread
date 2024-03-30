const express = require('express');
const http = require('http');
const cors = require('cors');

const router = express.Router();
const authRouter = require('./src/routes/Auth.routes');
const userRouter = require('./src/routes/User.routes');

const app = express();
const connectDB = require('./src/config/database');

connectDB().catch(console.dir);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

router.use('/auth', authRouter);
router.use('/user', userRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const HOST_NAME = process.env.HOST_NAME;

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server listening on http://${HOST_NAME}:${PORT}`);
});
