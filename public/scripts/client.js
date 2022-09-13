/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
        <p>${escape(tweet)}</p>
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

  //replace default POST behaviour with AJAX request
  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const input = $(this[0]).val();
    const error = $('#error-banner');
    errorMessage = error.children().children()[1];
    //blank field
    if (!input) {
      errorMessage.innerHTML = "NO TWEET! ADD TWEET NOW!";
      $(error[0]).slideDown({duration: 500});
      return;
    }
    //message past max length
    if (input.length > 140) {
      errorMessage.innerHTML = "TOO LONG! SAY LESS!";
      $(error[0]).slideDown({duration: 500});
      return;
    }

    //slide back up before submitting valid tweet
    $(error[0]).slideUp({duration: 500});    

    $.post('/tweets', $(this).serialize())
    //add latest tweet after posting
    .then(function() {
      $.ajax('/tweets', { method: 'GET'})
      .then(function (tweetsData) {
        const $newTweet = createTweetElement(tweetsData[tweetsData.length-1]);
        //clear form and reset counter
        $('#tweet-text').val('');
        $('#char-counter').val(140);
        $('#tweet-container').prepend($newTweet);
      });
    });
  });

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (tweetsData) {
      renderTweets(tweetsData.reverse());
    })
  };
  loadTweets();

});