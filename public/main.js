'use strict';

$(document).ready(init);

function init() {
  renderPosts();
  $('.newPostForm').submit(createPost);
  $('.displayArea').on('click', '.upvote', upvote);
  $('.displayArea').on('click', '.downvote', downvote);
  $('.displayArea').on('click', '.test', modalTest);
}

function modalTest() {
  console.log('modalTest');
  $('.modal').modal();
}

function upvote() {
  let id = $(this).parent().parent().data('id');
  let $score = $(this).parent().parent().find('.score');
  $.ajax({
    url: `/posts/${id}/upvote`,
    method: 'PUT',
    success: () => {
      let score = parseInt($score.text());
      $score.text(score + 1);
    }
  });
}

function downvote() {
  let id = $(this).parent().parent().data('id');
  let $score = $(this).parent().parent().find('.score');
  $.ajax({
    url: `/posts/${id}/downvote`,
    method: 'PUT',
    success: () => {
      let score = parseInt($score.text());
      $score.text(score - 1);
    }
  });
}

function createPost(event) {
  event.preventDefault();

  let text = $('.postContent').val();
  $('.postContent').val('');
  $.post('/posts', {text: text})
  .done(post => {
    renderPosts();
  })
  .fail(err => {
    console.log('err:', err);
  })
}

function renderPosts() {
  $.get('/posts')
  .done(posts => {
    let $postCards = posts.map(post => {
      let $card = $('.template').clone()
      $card.removeClass('template');
      $card.find('.scoreArea').attr('data-id', post.id);
      $card.find('.score').text(post.score);
      $card.find('.well').text(post.text);
      $card.find('.createdAt').text(moment(post.createdAt).fromNow());
      return $card;
    });
    $postCards.reverse();
    $('.displayArea').empty().append($postCards);
  })
  .fail(err => {
    console.log(err);
  });
}
