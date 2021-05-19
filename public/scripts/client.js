/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const createTweetElement = (tweet) => {
  return $(`
  <article>
  <header>
    <div class="user">
      <img src="${tweet.user.avatars}"> 
      <span>"${tweet.user.name}"</span>
    </div>
    <span class="tag">"${tweet.user.handle}"</span>
  </header>
    <h5 class="text">"${tweet.content.text}"</h5>
  <footer>
    <span class="time" datetime="${tweet.created_at}"></span>
    <div class="interactive">
      <i class="fas fa-flag flag"></i>
      <i class="fas fa-retweet share"></i>
      <i class="fas fa-heart love"></i>
    </div>
  </footer>
</article>
  `);
};

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData)

console.log($tweet);

$('#tweets-container').append($tweet);
})
