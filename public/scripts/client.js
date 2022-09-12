/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const createTweetElement = function(tweetObj) {
    const { name, avatars, handle } = tweetObj.user;
    const tweet = tweetObj.content.text;
    const datePosted = timeago.format(tweetObj.created_at);

    return $(`
    <div class="container">
      <header>
        <div id="user">
          <img src=${avatars}></img>
          <div>${name}</div>
        </div>  
        <div id="user-handle">${handle}</div>
      </header>
      <article>
        <p>${tweet}</p>
      </article>
      <footer>
        <div>${datePosted}</div>
        <div>
          <i class="fa-solid fa-flag like-button"></i>
          <i class="fa-solid fa-retweet like-button"></i>
          <i class="fa-solid fa-heart like-button"></i>
        </div>
      </footer>
      </div>
    `);
  };

  const renderTweets = function(tweets) {
    for (const entry in tweets) {
      const $tweet = createTweetElement(tweets[entry]);
      $('#tweet-container').append($tweet);
    }
  };
  
  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    $.post('/tweets', $(this).serialize());
  });

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (tweetsData) {
      renderTweets(tweetsData);
    })
  };

  loadTweets();

});