const express = require('express');
const server = express();

const postsRouter = require('./Posts/posts-router');
const commentsRouter = require('./Comments/comments-router');

server.use(express.json());

server.use(`/api/posts/`, postsRouter, commentsRouter);



server.get('/', (req,res) => {
  res.send(`
    <h2>Lambda api Project 2</h2>
    <p>Welcome to api project 2</p>
  `);
});

module.exports = server;