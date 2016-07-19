'use strict';

const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');

router.get('/', (req, res) => {
  Comment.getAll()
    .then(comments => {
      res.send(comments);
    })
    .catch(err => {
      res.status(400).send(err);
  });
});

router.get('/:postId', (req, res) => {
  Comment.getPostComments(req.params.postId)
    .then(comments => {
      res.send(comments);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post('/:postId', (req, res) => {
  Comment.addComment(req.params.postId, req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
  });
});



module.exports = router;
