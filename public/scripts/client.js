$(document).ready(function () {

  $('#tweet-messenger').submit(function( event ) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    }).then((data) => {
      location.reload()
    })
  });
  
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets"
    }).then((otherTweets) => {
      renderTweets(otherTweets);
      
      timeago.render(document.querySelectorAll('.time'));
    })
  }

  loadTweets()
  

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      console.log(newTweet);
      $('#tweets-container').prepend(newTweet);
    }
  };

  const createTweetElement = (tweet) => {
    let $tweet = $(`
    <article>
      <header>
        <div class="user">
          <img src="${tweet.user.avatars}"> 
          <span>"${tweet.user.name}"</span>
        </div>
        <span class="tag">${tweet.user.handle}</span>
      </header>
        <h5 class="text">${tweet.content.text}</h5>
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
    return $tweet;
  };
})
