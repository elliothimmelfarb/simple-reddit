'use strict';

$(document).ready(init);

function init() {
  renderPosts();
  $('.newPostForm').submit(createPost);
  $('.displayArea').on('click', '.upvote', upvote);
}

function upvote() {
  let id = $(this).parent().parent().data('id');

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
      console.log(posts);
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
