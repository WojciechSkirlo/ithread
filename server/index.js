/* eslint-disable */
const express = require('express');
const http = require('http');
const cors = require('cors');
const router = express.Router();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

router.get('/', (_, res) => {
  console.log('GET /');
  res.json({
    message: 'Hello world'
  });
});

router.get('/user', (_, res) => {
  console.log('GET /user');
  res.json({
    firstName: 'Shawn',
    lastName: 'Samson',
    email: 'shawnsamson@gmail.cm'
  });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const HOST_NAME = process.env.HOST_NAME;

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server listening on ${HOST_NAME}:${PORT}`);
});
