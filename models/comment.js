'use strict';

const db = require('../config/db');

const uuid = require('uuid');
const moment = require('moment');

db.query(`create table if not exists comments(
  id TEXT,
  createdAt TEXT,
  text TEXT,
  postId TEXT
)`);

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('select * from comments', (err, comments) => {
      if(err) return reject(err);
      return resolve(comments);
    });
  });
};

exports.getPostComments = (postId) => {
  return new Promise((resolve, reject) => {
    db.query('select * from comments where postId = ?', postId, (err, comments) => {
      if(err) return reject(err);
      return resolve(comments);
    });
  });
};

exports.addComment = (postId, commentBody) => {
  commentBody.postId = postId;
  commentBody.createdAt = moment().toISOString();
  commentBody.id = uuid();
  return new Promise((resolve, reject) => {
    db.query('insert into comments set ?', commentBody, err => {
      if(err) return reject(err);
      return resolve();
    });
  });
};
