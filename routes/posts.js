'use strict';

// routes/posts.js  -  post router

const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.get('/', (req, res) => {
  Post.getAll()
    .then(posts => {
      res.send(posts);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post('/', (req, res) => {
  Post.create(req.body)
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// TODO: refactor to single route for voting
router.put('/:id/upvote', (req, res) => {
    Post.upvote(req.params.id)
      .then(() => {
        res.send();
      })
      .catch(err => {
        res.send(err);
      })
})

router.put('/:id/downvote', (req, res) => {
    Post.downvote(req.params.id)
      .then(() => {
        res.send();
      })
      .catch(err => {
        res.send(err);
      })
})



module.exports = router;
