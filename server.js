const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const AuthRouter = require('./routes/authentication-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/', AuthRouter)
server.use(cors());

module.exports = server;