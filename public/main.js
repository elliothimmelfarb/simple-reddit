'use strict';

$(document).ready(init);

function init() {
  $('.newPostForm').submit(createPost);
}

function createPost(event) {
  event.preventDefault();

  let text = $('.text').val();

  $.post('/posts', {text: text})
    .done(post => {
      let $post = postElement(post);
      $('ul').append($post);
    })
    .fail(err => {
      console.log('err:', err);
    })
}

function postElement(post) {
  let $li = $('<li>').data('id', post.id);
  let time = moment(post.createdAt).format('LLL');
  $li.text(`${time} - ${post.text}`);
  return $li;
}
