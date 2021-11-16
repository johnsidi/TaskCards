const express = require('express');
const cors = require('cors');
const router = require('./router');
const connection = require('./models/index');
require('dotenv').config();

const app = express();
//for the server/backend
const localPort = 3000;

// //for the requests from the TaskCards - from the browser
// const corsConfig = {
//   // REMOVE-START
//   origin: 'http://localhost:3001',
//   credentials: true,
//   // REMOVE-END
// };

// app.use(cors(corsConfig));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

async function connectDBandListen() {
  try {
    await connection;
    app.listen(process.env.PORT || localPort, () => {
      console.log('Server is running'); // eslint-disable-line no-console
    });
  } catch (error) {
    console.log('error', error); // eslint-disable-line no-console
  }
}

connectDBandListen();
