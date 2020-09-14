const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require("express-session")
const cookieParser = require("cookie-parser")
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const logger = require("../middleware/logger")

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  
}))
server.use(cookieParser())
server.use(logger())


server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
